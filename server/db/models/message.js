const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      // Определение ассоциаций
      this.belongsTo(models.User, { foreignKey: 'senderId' });
      this.belongsTo(models.User, { foreignKey: 'receiverId' });
    }
  }

  // Инициализация модели
  Message.init(
    {
      text: DataTypes.STRING,
      senderId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Message',
    }
  );

  return Message;
};
