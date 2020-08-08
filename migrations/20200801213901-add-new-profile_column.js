'use strict';

const { sequelize } = require("../models");
// OLD FILE NAME
// 20200801213901-updated_profile_column.js
module.exports = {
  up: async(queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('profiles', 'city_state', Sequelize.STRING),
      await queryInterface.addColumn('profiles', 'gender', Sequelize.STRING),
      await queryInterface.addColumn('profiles', 'dob', Sequelize.STRING),
      await queryInterface.addColumn('profiles', 'pincode', Sequelize.STRING)
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
    
  },

  down: async(queryInterface, Sequelize) => {
    
    try {
      await queryInterface.removeColumn('profiles', 'city_state'),
      await queryInterface.removeColumn('profiles', 'gender'),
      await queryInterface.removeColumn('profiles', 'dob'),
      await queryInterface.removeColumn('profiles', 'pincode')
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
