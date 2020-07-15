'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  profile.init({
    email: {type:DataTypes.STRING},
    mobile: {type:DataTypes.STRING},
    name: {type:DataTypes.STRING},
    _id: {type:DataTypes.UUID, primaryKey:true},
    photo: {type:DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'profile',
    // underscored: true
  });
  profile.associate = function (models) {
    // associations can be defined here
    profile.hasMany(models.answers, {
      onDelete: 'CASCADE',
      foreignKey: '_id'
    });
  };
  return profile;
};