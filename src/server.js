const knex = require("knex");
const app = require("./app");
const { PORT, DATABASE_URL, TEST_DATABASE_URL } = require("./config");

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
  // On Heroku, set the following config var (https://help.heroku.com/966620):
  // PGSSLMODE: no-verify

  // None of the following worked when set in this file,
  // but I'm keeping this here for reference:
  //connection: `${DATABASE_URL}?sslmode=require`,
  //connection: `${DATABASE_URL}?pgsslmode=no-verify`,
  //ssl: { require: true, rejectUnauthorized: false },
  //pgsslmode: no-verify,
  //sslmode: require,
});

// Connect to database
app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at ${DATABASE_URL}:${PORT}`);
});
