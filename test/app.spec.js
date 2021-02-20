const expect = require("chai").expect;
const supertest = require("supertest");
const app = require("../src/app");
const knex = require("knex");
const { TEST_DATABASE_URL } = require("../src/config.js");
const { makeQuotesArray } = require("./quotes.fixtures");

// These tests use Chai

describe("GET /", () => {
  it("GET / responds with 200 and correct introductory quote", () => {
    return supertest(app)
      .get("/")
      .expect(200, "Somewhere, something incredible is waiting to be known!");
  });
});

describe("Quotes Database", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: TEST_DATABASE_URL,
    });

    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () => db("cosmos_quotes").truncate());

  context("Given there are quotes in the database", () => {
    const testQuotes = makeQuotesArray();

    beforeEach("insert quotes", () => {
      return db.into("cosmos_quotes").insert(testQuotes);
    });

    it("GET /api/quote responds with 200 for a random quote", () => {
      return supertest(app).get("/api/quote").expect(200);
    });

    it("GET /api/quote responds with 200 and all of the following: author, id, content", () => {
      return supertest(app)
        .get("/api/quote")
        .expect(200)
        .then((response) => {
          expect(response.body).to.have.to.have.all.keys(
            "author",
            "id",
            "content"
          );
        });
    });

    it("GET /api/quote responds with 200 and 'Carl Sagan' as the author", () => {
      return supertest(app)
        .get("/api/quote")
        .expect(200)
        .then((response) => {
          expect(response.body.author).to.equal("Carl Sagan");
        });
    });

    it("GET /api/quote responds with 200 and content that is a string", () => {
      return supertest(app)
        .get("/api/quote")
        .expect(200)
        .then((response) => {
          expect(response.body.content).to.be.a("string");
        });
    });

    after("disconnect from db", () => db.destroy());
    afterEach("cleanup", () => db("cosmos_quotes").truncate());
  });
});
