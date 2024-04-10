const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Assuming all users share the same password for simplicity;
    // in a real application, passwords would likely be individualized and more complex.
    const hashedPassword = await bcrypt.hash('1234', 10);

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          login: 'Vitalik',
          email: 'vitalik@example.com',
          password: hashedPassword, // Reusing the hashed password for all users
          fullName: 'Vitalik',
          gender: true, // Assuming true for male, adjust as needed
          birthDate: new Date(1990, 0, 1), // Year, Month (0-indexed), Day
          isInvestor: false, // Assuming not an investor, adjust as needed
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: 'Dali',
          email: 'dali@example.com',
          password: hashedPassword,
          fullName: 'Dali',
          gender: false, // Adjust according to your needs
          birthDate: new Date(1992, 5, 15),
          isInvestor: true, // Example
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: 'Andrey',
          email: 'andrey@example.com',
          password: hashedPassword,
          fullName: 'Andrey',
          gender: true,
          birthDate: new Date(1988, 10, 23),
          isInvestor: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: 'Viktorya',
          email: 'viktorya@example.com',
          password: hashedPassword,
          fullName: 'Viktorya',
          gender: false,
          birthDate: new Date(1995, 3, 8),
          isInvestor: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: 'Maxim',
          email: 'maxim@example.com',
          password: hashedPassword,
          fullName: 'Maxim',
          gender: true,
          birthDate: new Date(1985, 7, 30),
          isInvestor: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // You might want to be more specific with your deletion criteria in a real app
    await queryInterface.bulkDelete('Users', null, {});
  },
};
