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
      answer: { type: DataTypes.STRING },
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
    answers.hasOne(models.profile, {
      foreignKey: "id",
    });
    answers.hasMany(models.questions, {
      foreignKey: "id", 
    });
  };
  return answers;
};
