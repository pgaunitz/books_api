const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require("sequelize-test-helpers");
const { factory, expect } = require("../../test_helpers");

const Book = require("../../models/book");
const Author = require("../../models/author");

describe("Book", () => {
  const DescribeModel = Book(sequelize, dataTypes);
  const instance = new DescribeModel();

  checkModelName(DescribeModel)("Book");

  describe("associations", () => {
    before(() => {
      DescribeModel.associate({ Author });

      it("defines a belongsTo association with Author", () => {
        expect(DescribeModel.belongsTo).to.have.been.calledWith(Author);
      });
    });

    describe("constreaints", () => {
      it("", async () => {
        try {
          await factory.create("Book", { title: null });
          expect.fail();
        } catch (err) {
          expect(err.errors).to.containSubset([
            { message: "Book.title cannot be null" },
          ]);
        }
      });
    });

  });

  describe('validations', () => {
    it("rejects empty string", async () => {
      try {
        await factory.create('Book', {
          title: ''
        })
        expect.fail()
      } catch (err) {
        expect(err)
        .to.include(
          {
            message: "Validation error: Validation notEmpty on title failed"
          }
        )
        
      }
    })
  })
  

});
