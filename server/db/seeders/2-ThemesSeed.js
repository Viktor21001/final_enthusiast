/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Themes', [
      { title: 'Медведи', gameId: 1 },
      { title: 'Elbrus', gameId: 1 },
      { title: 'JavaScript / CSS / HTML', gameId: 1 },
      { title: 'Математика', gameId: 1 },
      { title: 'SQL', gameId: 1 },
      { title: 'Фильмы', gameId: 2 },
      { title: 'Гарри Поттер', gameId: 2 },
      { title: 'Аниме', gameId: 2 },
      { title: 'Игры', gameId: 2 },
      { title: 'Еда', gameId: 2 },
      { title: 'Грузинская кухня', gameId: 3 },
      { title: 'Итальянская кухня', gameId: 3 },
      { title: 'Японская кухня', gameId: 3 },
      { title: 'Немецкая кухня', gameId: 3 },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Themes', null, {});
  },
};
