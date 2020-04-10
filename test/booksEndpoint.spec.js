const app = require("../app");
const supertest = require("supertest");
const expect = require("chai").expect;
const jsonResponse = require("./jsonResponse");
const { factory, Models } = require("../test_helpers");

let server, request, response;

before((done) => {
  server = app.listen(done);
  request = supertest.agent(server);
});

after((done) => {
  server.close(done);
});

beforeEach(async () => {
  const author = await factory.create("Author", {
    id: 10,
    firstName: "Thomas",
    lastName: "Ochman",
  });
  await factory.createMany("Book", 2, [
    { id: 100, title: "Learn NodeJS with Thomas", AuthorId: author.id },
    {
      id: 900,
      title: "Learn NodeJS with Thomas - The Sequel",
      AuthorId: author.id,
    },
  ]);
});

afterEach(async () => {
  await factory.cleanUp();
});

describe("GET /api/v1/books", () => {
  before(async () => {
    response = await request.get("/api/v1/books");
  });
  it("responds with satus 200", () => {
    expect(response.status).to.equal(200);
  });

  it("responds with list of books", () => {
    // console.table(response.body.books);
    expect(response.body.books).to.be.an("array");
  });
});

describe("GET /api/v1/books/:id", () => {
  it("response with single book", async () => {
    response = await request.get("/api/v1/books/100");
    expect(response.body.book.id).to.equal(100);
  });

  it("response with single book", async () => {
    response = await request.get("/api/v1/books/900");
    expect(response.body.book.title).to.equal(
      "Learn NodeJS with Thomas - The Sequel"
    );
  });
  it("response with single book - Author", async () => {
    response = await request.get("/api/v1/books/900");
    expect(response.body.book.author.fullName).to.equal("Thomas Ochman");
  });
});
