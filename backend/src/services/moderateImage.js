import vision from "@google-cloud/vision";
const visionClient = new vision.ImageAnnotatorClient();
import ExpressError from "../utils/expressError.js";
import wrapAsync from "../utils/wrapAsync.js";

const moderateImage = wrapAsync(async (gcsUri) => {
  const [result] = await visionClient.safeSearchDetection(gcsUri);
  const detection = result.safeSearchAnnotation;

  const unsafe = ["adult", "violence", "racy"].some((category) =>
    ["LIKELY", "VERY_LIKELY"].includes(detection[category]),
  );

  if(unsafe){
    return new ExpressError("Image content is inappropriate!", 400);
  }

  return {status: "clean"};
});

export default moderateImage;
