'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  questions.init({
    category_id: {type:DataTypes.UUID},
    question: {type:DataTypes.STRING},
    _id: {type:DataTypes.UUID, primaryKey:true}
  }, {
    sequelize,
    modelName: 'questions',
    // underscored: true
  });
  questions.associate = function (models) {
    // associations can be defined here
    questions.hasMany(models.answers, {
      onDelete: 'CASCADE',
      foreignKey: '_id'
    });
    questions.belongsTo(models.category, {
      onDelete: 'CASCADE',
      foreignKey: '_id'
    });
  };
  return questions;
};