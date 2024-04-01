const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //! Добавляем игры
    const games = await queryInterface.bulkInsert(
      'Games',
      [
        { name: 'Общие вопросы' },
        { name: 'Сложные вопросы' },
        { name: 'Кухни мира' },
      ],
    );
  },

  async down(queryInterface, Sequelize) {
    // Отменяем добавления, удаляя все добавленные записи
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Themes', null, {});
    await queryInterface.bulkDelete('Games', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
