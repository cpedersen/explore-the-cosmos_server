require("dotenv").config();

const CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_ORIGIN_PROD
    : process.env.CLIENT_ORIGIN_LOCAL;

const DATABASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL_PROD
    : process.env.DATABASE_URL_LOCAL;

console.log("CLIENT_ORIGIN: ", CLIENT_ORIGIN);
console.log("DATABASE_URL: ", DATABASE_URL);

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_ORIGIN: CLIENT_ORIGIN,
  DATABASE_URL: DATABASE_URL,
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://dunder_mifflin@localhost/cosmos_quotes_test",
  GOOGLE_APPLICATION_CREDENTIALS:
    process.env.GOOGLE_APPLICATION_CREDENTIALS || "http://localhost:8000/api",
};
