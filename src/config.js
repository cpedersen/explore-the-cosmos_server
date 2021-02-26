require("dotenv").config();

const CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_ORIGIN_PROD
    : process.env.CLIENT_ORIGIN_LOCAL;

const DATABASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL_PROD
    : process.env.DATABASE_URL_LOCAL;

const PORT =
  process.env.NODE_ENV === "production"
    ? process.env.PORT_PROD
    : process.env.PORT_LOCAL;

console.log("CLIENT_ORIGIN: ", CLIENT_ORIGIN);
console.log("DATABASE_URL: ", DATABASE_URL);
console.log("PORT: ", PORT);

module.exports = {
  PORT: PORT || 5432,
  NODE_ENV: process.env.NODE_ENV || "production",
  CLIENT_ORIGIN:
    CLIENT_ORIGIN || "https://explore-the-cosmos-client.vercel.app",
  DATABASE_URL:
    DATABASE_URL ||
    "postgres://wjjjcrerskmfmg:f8111be0f0a861c25d4f2e010375eabc641056441dbb96be58467608d5d8ff2c@ec2-35-171-57-132.compute-1.amazonaws.com:5432/dte2fdjjs0vdm",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://dunder_mifflin@localhost/cosmos_quotes_test",
  GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  MIN_VISION_TAG_SCORE: process.env.MIN_VISION_TAG_SCORE || "0.1",
};
