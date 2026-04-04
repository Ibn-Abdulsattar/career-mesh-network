
function extractTextFromResult(result) {
    const textAnnotations = result.textAnnotations;
    if (textAnnotations && textAnnotations.length > 0) {
        return textAnnotations[0].description;
    }
    return "";
}

export default extractTextFromResult