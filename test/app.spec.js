const expect = require("chai").expect;
const supertest = require("supertest");
const app = require("../src/app");

describe("App", () => {
  it('GET / responds with 200 containing "Somewhere, something incredible is waiting to be known!"', () => {
    return supertest(app)
      .get("/")
      .expect(200, "Somewhere, something incredible is waiting to be known!");
  });
});
