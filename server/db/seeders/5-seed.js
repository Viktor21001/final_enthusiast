module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'startUpMembers',
      [
        {
          startUpId: 1,
          userId: 1,
          role: 'Founder',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 1,
          userId: 2,
          role: 'Investor',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 1,
          userId: 3,
          role: 'Advisor',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 1,
          userId: 4,
          role: 'Developer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 1,
          userId: 5,
          role: 'Designer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 2,
          userId: 5,
          role: 'Founder',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 2,
          userId: 1,
          role: 'Marketer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 2,
          userId: 2,
          role: 'Product Manager',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 2,
          userId: 3,
          role: 'Sales Lead',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 2,
          userId: 4,
          role: 'Research Analyst',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 3,
          userId: 2,
          role: 'Founder',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 3,
          userId: 3,
          role: 'COO',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 3,
          userId: 4,
          role: 'CFO',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 3,
          userId: 5,
          role: 'CTO',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 3,
          userId: 1,
          role: 'Creative Director',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 4,
          userId: 2,
          role: 'Lead Developer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 4,
          userId: 3,
          role: 'Product Manager',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 4,
          userId: 1,
          role: 'Marketing Specialist',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 4,
          userId: 4,
          role: 'UI/UX Designer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 4,
          userId: 5,
          role: 'Data Scientist',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 5,
          userId: 3,
          role: 'Founder & CEO',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 5,
          userId: 4,
          role: 'Operations Manager',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 5,
          userId: 2,
          role: 'Head of Sales',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 5,
          userId: 1,
          role: 'Technical Lead',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startUpId: 5,
          userId: 5,
          role: 'HR Manager',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StartUpMembers', null, {});
  },
};