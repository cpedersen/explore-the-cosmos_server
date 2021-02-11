require("dotenv").config();
// Imports the Google Cloud client library
const vision = require("@google-cloud/vision");
// Creates a client
const client = new vision.ImageAnnotatorClient();
// A higher minimum tag score should result in more useful tags.
const MIN_VISION_TAG_SCORE = process.env.MIN_VISION_TAG_SCORE || 0.7;

// Use async await try/catch so that the function always returns a
// promise. await will make JavaScript wait until a promise returns
// its result.
const tagImages = async (req, res) => {
  console.log("in tag images", req.body);
  console.log("MIN_VISION_TAG_SCORE", MIN_VISION_TAG_SCORE);
  const imageUrls = req.body;

  const result = await Promise.all(
    // Loop through the url for each image
    imageUrls.map((url) => {
      // Wait until image was found
      return new Promise((resolve) => {
        // For each successful retrieval of an image,
        // apply label detection using async/await to avoid
        // the need to explicitly configure promise chains
        (async () => {
          const [result] = await client.labelDetection(url);
          console.log("result: ", result);
          // TODO - Create list of labels/tags - why isn't this
          // getting printed?
          const annotations = result.labelAnnotations;
          console.log("annotations: ", annotations);

          // Filter the functions, so that the labels are more
          // useful.
          const labels = annotations.reduce((acc, label) => {
            const { score, description } = label;
            // If label score is less then expected, break
            if (score < MIN_VISION_TAG_SCORE) return acc;

            // Otherwise, push the label information to the final
            // list
            acc.push({
              score,
              description,
            });

            return acc;
          }, []);
          console.log("Labels: ", labels);
          resolve(labels);
        })();
      });
    })
  );
  console.log("result: ", result);
  res.send({ tags: result });
};

module.exports = {
  tagImages,
};
