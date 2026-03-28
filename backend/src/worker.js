// import { Worker } from "bullmq";
// import IORedis from "ioredis";
// import moderateImage from "./services/moderateImage";
// import moderateVideo from "./services/moderateVideo";
// import moderatePdf from "./services/moderatePdf";

// const connection = new IORedis({ maxRetriesPerRequest: 3 });

// const worker = new Worker(
//   "media-moderation",
//   async (job) => {
//     const { filePath, fileType } = job.data;

//     console.log("Processing:", filePath);

//     let result = "safe";

//     if (fileType.startsWith("image")) {
//       result = await moderateImage(filePath, fileType);
//     } else if (fileType.startsWith("video")) {
//       result = await moderateVideo(filePath, fileType);
//     } else {
//       result = await moderatePdf(filePath, fileType);
//     }

//     if (result === "unsafe") {
//       console.log("Delete file", filePath);
//     } else {
//       console.log("Approved file", filePath);
//     }
//   },
//   { connection },
// );

// export default worker;
