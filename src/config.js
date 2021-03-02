require("dotenv").config();
const path = require("path");

const CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_ORIGIN
    : process.env.CLIENT_ORIGIN_LOCAL;

const DATABASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL_LOCAL;
//? `${process.env.DATABASE_URL}?sslmode=require`

const DATABASE_URL =
  "postgres://wjjjcrerskmfmg:f8111be0f0a861c25d4f2e010375eabc641056441dbb96be58467608d5d8ff2c@ec2-35-171-57-132.compute-1.amazonaws.com:5432/dte2fdjjs0vdm";

let GOOGLE_APPLICATION_CREDENTIALS =
  process.env.NODE_ENV === "production"
    ? process.env.GOOGLE_APPLICATION_CREDENTIALS
    : process.env.GOOGLE_APPLICATION_CREDENTIALS_LOCAL;

const PORT = process.env.PORT || 8000;

console.log("****************************************************************");
console.log("CLIENT_ORIGIN: ", CLIENT_ORIGIN);
console.log("NODE_ENV: ", process.env.NODE_ENV);
console.log("DATABASE_URL: ", DATABASE_URL);
console.log("PORT: ", PORT);
console.log("GOOGLE_APPLICATION_CREDENTIALS: ", GOOGLE_APPLICATION_CREDENTIALS);
console.log("****************************************************************");

module.exports = {
  PORT,
  NODE_ENV: process.env.NODE_ENV || "production",
  CLIENT_ORIGIN: CLIENT_ORIGIN,
  DATABASE_URL,
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  GOOGLE_APPLICATION_CREDENTIALS,
  MIN_VISION_TAG_SCORE: process.env.MIN_VISION_TAG_SCORE || "0.1",
};
