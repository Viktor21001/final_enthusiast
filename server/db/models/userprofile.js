const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        //! as: 'User',
      });
    }
  }
  UserProfile.init(
    {
      userId: DataTypes.INTEGER,
      avatar: DataTypes.TEXT,
      interests: DataTypes.TEXT,
      activity: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserProfile',
    }
  );
  return UserProfile;
};
