import vision from "@google-cloud/vision";
const visionClient = new vision.ImageAnnotatorClient();
import ExpressError from "../utils/expressError.js";
import wrapAsync from "../utils/wrapAsync.js";
import extractTextFromResult from "../utils/extractTextFromResult.js";

const moderatePdf = wrapAsync(async (gcsUri) => {
  const inputConfig = {
    gcsSource: {
      uri: gcsUri,
    },
    mimeType: "application/pdf",
  };

  const features = [{type:"DOCUMENT_TEXT_DETECTION"}];

const [result] = await visionClient.asyncBatchAnnotateFiles({
    requests: [{inputConfig, features}]
})

const text = extractTextFromResult(result);
const unsafe = ["inappropriate", "confidential", "sensitive"].some((keyword) =>
  text.toLowerCase().includes(keyword)
);
if(unsafe){
    return new ExpressError("PDF content is inappropriate!", 400);
}
return {status: "clean"};

});

export default moderatePdf;
