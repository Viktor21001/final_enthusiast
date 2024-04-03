module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'StartUps',
      [
        {
          userId: 1,
          startUpTitle: 'Amazing StartUp',
          startUpDescription: 'This is a description of Amazing StartUp.',
          startUpCategory: 'Technology',
          progress: 45,
          currentAmount: 5000,
          targetAmount: 10000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          startUpTitle: 'Elbrus StartUp',
          startUpDescription: 'This is a description of Amazing StartUp.',
          startUpCategory: 'Technoasdasdasdasdalogy',
          progress: 56,
          currentAmount: 7000,
          targetAmount: 10000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          startUpTitle: 'Elbrus --------------------StartUp',
          startUpDescription:
            'This is a description ------------------of Amazing StartUp.',
          startUpCategory: 'Technoasdasdsadasdasdasasdasdasdalogy',
          progress: 56,
          currentAmount: 7000,
          targetAmount: 10000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StartUps', null, {});
  },
};
