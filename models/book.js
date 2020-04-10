"use strict";
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      title: DataTypes.STRING,
    },
    {}
  );

  Book.associate = (models) => {
    Book.belongsTo(models.Author, { foreignKey: "AuthorId", as: "author" });
  };
  return Book;
};
