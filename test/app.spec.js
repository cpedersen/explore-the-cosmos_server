const expect = require("chai").expect;
const supertest = require("supertest");
const app = require("../src/app");

describe("GET", () => {
  let testQuote = "We are a way for the universe to know itself.";

  it('GET / responds with 200 containing "Somewhere, something incredible is waiting to be known!"', () => {
    return supertest(app)
      .get("/")
      .expect(200, "Somewhere, something incredible is waiting to be known!");
  });

  it("GET ", () => {
    return supertest(app)
      .get("/api/quote")
      .expect(
        200,
        ""
      ); /*(res) => {
        console.log(res);
        return true;
        res.should.have.property("author");
      });*/
  });
});
