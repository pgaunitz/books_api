'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Books',
      'AuthorId',
      {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Authors',
          key: 'id'
        },
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Books',
      'AuthorId'
    )
  }
};
