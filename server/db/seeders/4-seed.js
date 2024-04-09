module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'UserProfiles',
      [
        {
          userId: 1, // Assuming a user with this ID exists
          avatar: 'viktor.png',
          interests: 'Technology, Music, Art',
          activity: 'Active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          avatar: 'dali.png',
          interests: 'Gaming, Reading, Hiking',
          activity: 'Moderate',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          avatar: 'andrey.png',
          interests: 'Cooking, Traveling, Photography',
          activity: 'Very Active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          avatar: 'vika.png',
          interests: 'Fitness, Yoga, Meditation',
          activity: 'Active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          avatar: 'max.png',
          interests: 'Writing, Blogging, Designing',
          activity: 'Moderate',
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
