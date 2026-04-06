import { Worker } from "bullmq";
import moderateImage from "./services/moderateImage.js";
import moderateVideo from "./services/moderateVideo.js";
import moderatePdf from "./services/moderatePdf.js";

const worker = new Worker(
  "media-moderation",
  async (job) => {
    const { url, fileType } = job.data;

    console.log("Processing:", fileType, url);

    let result = "safe";

    if (fileType.startsWith("image/")) {
      result = await moderateImage(url, fileType);
    } else if (fileType.startsWith("video/")) {
      result = await moderateVideo(url, fileType);
    } else if(fileType === "application/pdf") {
      result = await moderatePdf(url, fileType);
    }

    if (result === "unsafe") {
      console.log("Delete file", url);
    } else {
      console.log("Approved file", url);
    }
  },
  { connection: {port: 6379, host: "localhost"} },
);

export default worker;
