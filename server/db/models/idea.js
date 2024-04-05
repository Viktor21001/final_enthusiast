const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Idea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      this.hasOne(models.IdeaMedia, {
        foreignKey: 'ideaId',
      });
    }
  }
  Idea.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
    isStartUp: DataTypes.BOOLEAN,
    photo: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Idea',
  });
  return Idea;
};
