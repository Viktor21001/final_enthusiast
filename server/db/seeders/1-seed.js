module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'StartUps',
      [
        {
          userId: 1,
          startUpTitle: 'Эко-Инновации',
          startUpDescription:
            'Разработка и внедрение инновационных технологий для переработки отходов и производства экологически чистой энергии.',
          startUpCategory: 'Экология',
          progress: 75,
          currentAmount: 1500000,
          targetAmount: 2000000,
          photos: 'ecoInovationStartup.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          startUpTitle: 'Будущее Образование',
          startUpDescription:
            'Платформа для обучения с использованием виртуальной и дополненной реальности, направленная на повышение качества и доступности образования.',
          startUpCategory: 'Образование',
          progress: 40,
          currentAmount: 800000,
          targetAmount: 2500000,
          photos: 'futureEduStartup.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          startUpTitle: 'Здоровое Питание',
          startUpDescription:
            'Стартап по производству и доставке здоровых и сбалансированных блюд на дом и в офисы, с использованием исключительно органических продуктов.',
          startUpCategory: 'Здоровье и фитнес',
          progress: 60,
          currentAmount: 1200000,
          targetAmount: 1800000,
          photos: 'healthStartup.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          startUpTitle: 'Мобильность Будущего',
          startUpDescription:
            'Разработка электрических, автономных транспортных средств для урбанизированных территорий, направленных на сокращение выбросов углекислого газа.',
          startUpCategory: 'Транспорт',
          progress: 85,
          currentAmount: 5000000,
          targetAmount: 7000000,
          photos: 'mobileFutureStartup.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          startUpTitle: 'Умный Дом',
          startUpDescription:
            'Разработка систем умного дома, позволяющих автоматизировать повседневные задачи, повысить безопасность и эффективность использования ресурсов в быту.',
          startUpCategory: 'Технологии',
          progress: 50,
          currentAmount: 2000000,
          targetAmount: 4000000,
          photos: 'brainHouseStartup.png',
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
