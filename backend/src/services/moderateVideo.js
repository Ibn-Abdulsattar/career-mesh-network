import videoIntelligence from "@google-cloud/video-intelligence";
import ExpressError from "../utils/expressError.js";
import wrapAsync from "../utils/wrapAsync.js";
const videoClient = new videoIntelligence.VideoIntelligenceServiceClient();

const moderateVideo = wrapAsync(async (gcsUri) => {
  const request = {
    inputUri: gcsUri,
    features: ["EXPLICIT_CONTENT_DETECTION"],
  };

  const [operation] = await videoClient.annotateVideo(request);
  const [results] = await operation.promise();

  const explicitConnectionResults = results.explicitAnnotation.frames;

  const unsafe = explicitConnectionResults.some((frame) =>
    ["LIKELY", "VERY_LIKELY"].includes(frame.poronographyLikelihood)
  );

  if(unsafe){
    return new ExpressError("Video content is inappropriate!", 400);
  }

  return {status: "clean"};
});

export default moderateVideo;
