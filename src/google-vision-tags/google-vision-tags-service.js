// Imports the Google Cloud client library
const vision = require("@google-cloud/vision");
// Creates a client
const client = new vision.ImageAnnotatorClient();

const MIN_VISION_TAG_SCORE = process.env.MIN_VISION_TAG_SCORE || 0.7;

const tagImages = async (req, res) => {
  console.log("in tag images", req.body);
  const imageUrls = req.body;

  const result = await Promise.all(
    imageUrls.map((url) => {
      return new Promise((resolve) => {
        (async () => {
          const [result] = await client.labelDetection(url);
          console.log("result", result);
          const annotations = result.labelAnnotations;
          console.log("annotations", annotations);

          const labels = annotations.reduce((acc, label) => {
            const { score, description } = label;
            if (score < MIN_VISION_TAG_SCORE) return acc;

            acc.push({
              score,
              description,
            });

            return acc;
          }, []);
          console.log("Labels:", labels);
          // labels.forEach((label) => console.log(label.description));
          resolve(labels);
        })();
      });
    })
  );

  console.log("result", result);

  res.send({ tags: result });
};

module.exports = {
  tagImages,
};
