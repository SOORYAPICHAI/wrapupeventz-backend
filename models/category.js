'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  category.init({
    _id: {type:DataTypes.UUID,primaryKey:true},
    type: {type:DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'category',
    // underscored: true
  });
  category.associate = function (models) {
    // associations can be defined here
    category.hasMany(models.questions, {
      onDelete: 'CASCADE',
      foreignKey: '_id'
    });
  };
  return category;
};