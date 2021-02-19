const expect = require("chai").expect;
const supertest = require("supertest");
const app = require("../src/app");
const knex = require("knex");
/*const { TEST_DATABASE_URL, DATABASE_TABLE_TEST } = require("../src/config.js");*/

describe("GET", () => {
  let testQuote = "We are a way for the universe to know itself.";

  it('GET / responds with 200 containing "Somewhere, something incredible is waiting to be known!"', () => {
    return supertest(app)
      .get("/")
      .expect(200, "Somewhere, something incredible is waiting to be known!");
  });
});

describe.only("Database Endpoint", function () {
  let db;
  console.log("TEST_DATABASE_URL", TEST_DATABASE_URL);

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: TEST_DATABASE_URL,
    });

    app.set("db", db);
    app.set("db_table", DATABASE_TABLE_TEST);
  });

  after("disconnect from db", () => db.destroy());

  // before("clean the table", () => db("cosmos_quotes_test").truncate());

  context("Given there are quotes in the database", () => {
    const testQuotes = [
      {
        id: 1,
        author: "Carl Sagan",
        content: "We are a way for the universe to know itself.",
      },
      {
        id: 2,
        author: "Carl Sagan",
        content: "The cosmos is within us. We are made of star-stuff.",
      },
      {
        id: 3,
        author: "Carl Sagan",
        content:
          "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars. We are made of starstuff.",
      },
      {
        id: 4,
        author: "Carl Sagan",
        content:
          "One of the saddest lessons of history is this: If we’ve been bamboozled long enough, we tend to reject any evidence of the bamboozle. We’re no longer interested in finding out the truth. The bamboozle has captured us. It’s simply too painful to acknowledge, even to ourselves, that we’ve been taken. Once you give a charlatan power over you, you almost never get it back.",
      },
    ];

    beforeEach("insert quotes", () => {
      return db.into("cosmos_quotes_test").insert(testQuotes);
    });

    it("GET /api/quote responds with 200 and all of the quotes", () => {
      return supertest(app).get("/api/quote").expect(200, testQuotes);
    });

    after("disconnect from db", () => db.destroy());
    afterEach("cleanup", () => db("cosmos_quotes_test").truncate());
  });
});
