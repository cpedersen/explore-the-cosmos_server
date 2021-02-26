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
  DATABASE_URL: DATABASE_URL || process.env.DATABASE_URL,
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://dunder_mifflin@localhost/cosmos_quotes_test",
  GOOGLE_APPLICATION_CREDENTIALS:
    process.env.GOOGLE_APPLICATION_CREDENTIALS || "http://localhost:8000/api",
  MIN_VISION_TAG_SCORE: process.env.MIN_VISION_TAG_SCORE || "0.1",
};
