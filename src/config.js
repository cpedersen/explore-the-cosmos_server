require("dotenv").config();
const path = require("path");

const CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_ORIGIN_PROD
    : process.env.CLIENT_ORIGIN_LOCAL;

let DATABASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL_LOCAL;

const PORT = process.env.PORT || 8000;

const GOOGLE_APPLICATION_CREDENTIALS = path.resolve(
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);

console.log("****************************************************************");
console.log("CLIENT_ORIGIN: ", CLIENT_ORIGIN);
console.log("NODE_ENV: ", process.env.NODE_ENV);
console.log("DATABASE_URL: ", DATABASE_URL);
console.log("PORT: ", PORT);
console.log(
  "GOOGLE_APPLICATION_CREDENTIALS: ",
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);
console.log("****************************************************************");

module.exports = {
  PORT,
  NODE_ENV: process.env.NODE_ENV || "production",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || CLIENT_ORIGIN,
  DATABASE_URL: process.env.DATABASE_URL || DATABASE_URL,
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  GOOGLE_APPLICATION_CREDENTIALS:
    process.env.GOOGLE_APPLICATION_CREDENTIALS || "./gc-credentials.json",
  MIN_VISION_TAG_SCORE: process.env.MIN_VISION_TAG_SCORE || "0.1",
};
