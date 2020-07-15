'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      question_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references:{          
          model:'questions',
          key:'_id'
        }
      },
      answer: {
        type: Sequelize.STRING
      },
      _id: {
        type: Sequelize.UUID,
        primaryKey: true
        
      },
      profile_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references:{          
          model:'profiles',
          key:'_id'
        }  
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
    await queryInterface.dropTable('answers');
  }
};