module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'UserProfiles',
      [
        {
          userId: 1, // Assuming a user with this ID exists
          avatar: 'maleAvatar.png',
          interests: 'Technology, Music, Art',
          activity: 'Инженер',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          avatar: 'dali.png',
          interests: 'Gaming, Reading, Hiking',
          activity: 'Frontend Developer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          avatar: 'andrey.png',
          interests: 'Cooking, Traveling, Photography',
          activity: 'Fullstack Developer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          avatar: 'vika.png',
          interests: 'Fitness, Yoga, Meditation',
          activity: 'Психолог',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          avatar: 'max.png',
          interests: 'Writing, Blogging, Designing',
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
