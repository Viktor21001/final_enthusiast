const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('yourStrong(!)Password', 10);

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          login: 'demoUser',
          email: 'demo@example.com',
          password: hashedPassword, // используйте bcrypt для хеширования пароля
          fullName: 'Demo User',
          gender: true,
          birthDate: new Date(1990, 0, 1), // Пример даты рождения
          isInvestor: false, // или true, в зависимости от бизнес-логики
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: 'viktorUser',
          email: 'viktor@example.com',
          password: hashedPassword,
          fullName: 'Demo User',
          gender: true,
          birthDate: new Date(2000, 0, 1),
          isInvestor: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: 'daliUser',
          email: 'dali@example.com',
          password: hashedPassword,
          fullName: 'Dali User',
          gender: true,
          birthDate: new Date(2002, 0, 1),
          isInvestor: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
