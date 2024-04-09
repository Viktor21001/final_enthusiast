const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Idea, {
        foreignKey: 'userId',
      });
      this.hasOne(models.UserProfile, {
        foreignKey: 'userId',
        //! as: 'Profile',
      });
      this.hasMany(models.Favorite, { foreignKey: 'userId' });
      this.hasMany(models.Message, { foreignKey: 'senderId' });
      this.hasMany(models.Vote, { foreignKey: 'userId' });
      this.hasMany(models.StartUp, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      login: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullName: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      birthDate: DataTypes.DATE,
      isInvestor: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
