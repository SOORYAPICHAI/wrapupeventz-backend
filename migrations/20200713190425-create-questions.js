'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references:{          
          model:'categories',
          key:'_id'
        }
      },
      question: {
        type: Sequelize.STRING
      },
      _id: {
        type: Sequelize.UUID,
        primaryKey: true
       
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('questions');
  }
};