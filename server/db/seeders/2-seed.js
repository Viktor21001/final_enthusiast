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
          photo: 'https://img.freepik.com/fotos-premium/triste-oso-peluche-sienta-noche-calle-lluvia-ia-generativa_653286-574.jpg',
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
          photo: 'https://img.freepik.com/premium-photo/cute-bear-wears-hoodie-sad-alone-bear-beautiful-toy-bear-gift-for-valentines-day-14-february_768106-4691.jpg',
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
          photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9hi5cGnqR3E5lbNU7GQyfhLZ0TsxV2SpmDjZhHRbGJFeNj0vjsvDKGEofOpz2fByjH3c&usqp=CAU',
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
