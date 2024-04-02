'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class startUpMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.StartUp, {
        foreignKey: 'startUpId',
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  startUpMember.init({
    startUpId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'startUpMember',
  });
  return startUpMember;
};