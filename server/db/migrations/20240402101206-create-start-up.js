/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StartUps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      startUpTitle: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      startUpDescription: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      startUpCategory: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      progress: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      currentAmount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      targetAmount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StartUps');
  },
};
