const knex = require("knex");
const app = require("./app");
const { PORT, DATABASE_URL, TEST_DATABASE_URL } = require("./config");

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
});

app.set("db", db);

app.listen(PORT, () => {
  console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  console.log(`Server listening at http://localhost:${PORT}`);
});
