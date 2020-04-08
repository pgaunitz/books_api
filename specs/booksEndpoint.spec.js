const app = require("../app");
const supertest = require("supertest");
const expect = require("chai").expect;
const jsonResponse = require("./jsonResponse");

let server, request, response;

before((done) => {
  server = app.listen(done);
  request = supertest.agent(server);
});

after((done) => {
  server.close(done);
});

describe("GET /api/v1/books", () => {
  before(async () => {
    response = await request.get("/api/v1/books");
  });
  it("responds with satus 200", () => {
    expect(response.status).to.equal(200);
  });

  it("responds with list of books", () => {
    console.table(response.body.books);
    expect(response.body.books).to.be.an("array");
  });

  it("retruns title", () => {
    expect(response.body.books[0].title).to.equal("Learn NodeJS");
  });

  describe("GET /api/v1/books/:id", () => {
    before(async () => {
      response = await request.get("/api/v1/books/2");
    });

    it("response with single book", () => {
      expect(response.body.book.id).to.equal(2);
    });
  });
});
