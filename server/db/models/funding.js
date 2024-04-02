'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funding extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.StartUp, {
        foreignKey: 'startUpId',
      });
    }
  }
  Funding.init({
    startUpId: DataTypes.INTEGER,
    currentAmount: DataTypes.INTEGER,
    targetAmount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Funding',
  });
  return Funding;
};