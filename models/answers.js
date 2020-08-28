"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  answers.init(
    {
      question_id: { type: DataTypes.UUID },
      answer: { type: DataTypes.TEXT },
      _id: { type: DataTypes.UUID, primaryKey: true },
      profile_id: { type: DataTypes.UUID, primaryKey: true },
    },
    {
      sequelize,
      modelName: "answers",
      // underscored: true
    }
  );
 
  answers.associate = function (models) {
    // associations can be defined here
    answers.belongsTo(models.profile, {
      onDelete: 'CASCADE',
      foreignKey: 'profile_id'
    });
    answers.belongsTo(models.questions, {
      onDelete: 'CASCADE',
      foreignKey: "question_id", 
    });
  };
  return answers;
};
