'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IdeaWallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Idea, {
        foreignKey: 'ideaId',
      });
    }
  }
  IdeaWallet.init({
    ideaId: DataTypes.INTEGER,
    wallet: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'IdeaWallet',
  });
  return IdeaWallet;
};