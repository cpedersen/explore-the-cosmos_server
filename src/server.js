const knex = require("knex");
const app = require("./app");
const { PORT, DATABASE_URL, TEST_DATABASE_URL } = require("./config");

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
  //connection: `${DATABASE_URL}?sslmode=require`,
  //ssl: { require: true, rejectUnauthorized: false },
  //pgsslmode: no-verify,
  //sslmode: require,
});

// Connect to database
app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at ${DATABASE_URL}:${PORT}`);
});
