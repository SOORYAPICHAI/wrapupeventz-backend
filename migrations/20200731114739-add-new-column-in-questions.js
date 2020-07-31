'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('questions', 'field_json', Sequelize.JSON)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('questions', 'field_json')
  }
};
