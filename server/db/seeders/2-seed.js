module.exports = {
  async up(queryInterface, Sequelize) {
    // Добавление записей в таблицу 'Ideas'
    await queryInterface.bulkInsert(
      'Ideas',
      [
        {
          userId: 1,
          title: 'Innovative Idea',
          description: 'This is a description of Innovative Idea.',
          category: 'Healthcare',
          likes: 100,
          dislikes: 10,
          isStartUp: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          title: 'Innovative sdfsdfsdfsdIdea',
          description: 'This is a descdsfddfsfsdription of Innovative Idea.',
          category: 'Healthfddsfsdfsdfcare',
          likes: 100,
          dislikes: 10,
          isStartUp: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          title: 'Innovative sdfsdfsdfsdIdea',
          description: 'This is a descdsfddfsfsdription of Innovative Idea.',
          category: 'Healthfddsfsdfsdfcare',
          likes: 100,
          dislikes: 10,
          isStartUp: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Удаление всех записей из таблицы 'Ideas'
    await queryInterface.bulkDelete('Ideas', null, {});
  },
};
