const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StartUp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      this.hasMany(models.startUpMember, {
        foreignKey: 'startUpId',
      });
      this.hasMany(models.Favorite, { foreignKey: 'startUpId' });
    }
  }
  StartUp.init(
    {
      userId: DataTypes.INTEGER,
      startUpTitle: DataTypes.STRING,
      startUpDescription: DataTypes.TEXT,
      startUpCategory: DataTypes.TEXT,
      progress: DataTypes.STRING,
      currentAmount: DataTypes.INTEGER,
      targetAmount: DataTypes.INTEGER,
      photos: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'StartUp',
    }
  );
  return StartUp;
};
