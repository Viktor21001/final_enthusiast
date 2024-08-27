module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'UserProfiles',
      [
        {
          userId: 1, // Assuming a user with this ID exists
          avatar: 'maleAvatar.png',
          interests: 'Технологии,музыка,искусство',
          activity: 'Инженер',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          avatar: 'dali.png',
          interests: 'Игры, чтение, иностранные языки',
          activity: 'Frontend разработчик',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          avatar: 'andrey.png',
          interests: 'Готовка, путешествия, фотография',
          activity: 'Fullstack Developer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          avatar: 'vika.png',
          interests: 'Фитнесс, йога, медитация',
          activity: 'Психолог',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          avatar: 'max.png',
          interests: 'Дизай, блоггинг, спорт',
          activity: 'Senior Web Developer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserProfiles', null, {});
  },
};
