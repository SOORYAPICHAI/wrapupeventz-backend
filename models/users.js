'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    name: DataTypes.STRING,
    _id: {type:DataTypes.UUID, primaryKey:true},
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
    schema:'auth',
    // underscored: true
  });
  
  return users;
};