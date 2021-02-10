require("dotenv").config();
// Imports the Google Cloud client library
const vision = require("@google-cloud/vision");
// Creates a client
const client = new vision.ImageAnnotatorClient();
console.log("env", process.env);
async function quickstart() {
  // Performs label detection on the image file
  const [result] = await client.labelDetection(
    "https://images-assets.nasa.gov/image/KSC-20210204-PH-FMX01_0054/KSC-20210204-PH-FMX01_0054~medium.jpg"
  );
  console.log("result", result);
  const labels = result.labelAnnotations;
  console.log("Labels:", labels);
  labels.forEach((label) => console.log(label.description));
}
quickstart();
