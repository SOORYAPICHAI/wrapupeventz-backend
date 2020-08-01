'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async(queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('profiles', 'city/state', Sequelize.STRING),
      await queryInterface.addColumn('profiles', 'gender', Sequelize.STRING)
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
    
  },

  down: async(queryInterface, Sequelize) => {
    
    try {
      await queryInterface.removeColumn('profiles', 'city/state'),
      await queryInterface.removeColumn('profiles', 'gender')
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
