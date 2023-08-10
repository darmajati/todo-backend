'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'pin', {
      type: DataTypes.STRING(4),
      allowNull: false,
      validate: {
        len: [4, 4],
        isNumeric: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'pin', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
