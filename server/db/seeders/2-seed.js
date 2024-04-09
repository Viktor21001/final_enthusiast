module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Ideas',
      [
        {
          userId: 1,
          title: 'Экологичные одноразовые посуда',
          description:
            'Разработка биоразлагаемой одноразовой посуды из натуральных компонентов, которая полностью разлагается за 30 дней.',
          category: 'Экология',
          likes: 150,
          dislikes: 25,
          isStartUp: true,
          photo: 'firstIdea.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          title: 'Приложение для изучения новых слов',
          description:
            'Мобильное приложение, помогающее расширить словарный запас иностранных слов с помощью игровой формы обучения.',
          category: 'Образование',
          likes: 200,
          dislikes: 30,
          isStartUp: false,
          photo: 'languageApp.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          title: 'Сервис обмена книг',
          description:
            'Платформа для обмена и передачи книг между пользователями, позволяющая найти редкие издания и новинки.',
          category: 'Культура',
          likes: 175,
          dislikes: 8,
          isStartUp: false,
          photo: 'reBookService.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          title: 'Самоочищающаяся одежда',
          description:
            'Разработка тканей с нанопокрытием, способными самостоятельно очищаться от загрязнений и бактерий под воздействием солнечного света.',
          category: 'Технологии',
          likes: 250,
          dislikes: 45,
          isStartUp: true,
          photo: 'cleanClothes.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          title: 'Умный городской рюкзак',
          description:
            'Рюкзак с встроенным GPS-трекером, солнечной панелью для зарядки гаджетов и антиворовской системой.',
          category: 'Путешествия',
          likes: 300,
          dislikes: 12,
          isStartUp: true,
          photo: 'backPack.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ideas', null, {});
  },
};
