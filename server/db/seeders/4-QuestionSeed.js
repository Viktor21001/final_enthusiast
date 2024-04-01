/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Questions', [
      {
        question: 'Как называется фильм Кристофера Нолана о космических путешествиях и путешествиях во времени?',
        themeId: 6,
        answer: 'Интерстеллар',
        points: 200,
      },
      {
        question: 'Какой фильм получил Оскар за лучший фильм в 2020 году?',
        themeId: 6,
        answer: 'Паразиты',
        points: 400,
      },
      {
        question: 'Какой фильм является самым кассовым в истории кинематографа?',
        themeId: 6,
        answer: 'Аватар',
        points: 600,
      },
      {
        question: 'Кто срежиссировал фильм "Властелин колец: Братство Кольца"?',
        themeId: 6,
        answer: 'Питер Джексон',
        points: 800,
      },
      {
        question: 'Как называется первый фильм в кинематографической вселенной Marvel?',
        themeId: 6,
        answer: 'Железный человек',
        points: 1000,
      },
      {
        question: 'Какое заклинание используется для вызова света из волшебной палочки?',
        themeId: 7,
        answer: 'Люмос',
        points: 200,
      },
      {
        question: 'Какое имя носит лучший домашний эльф Хогвартса',
        themeId: 7,
        answer: 'Добби',
        points: 400,
      },
      {
        question: 'Какое заклинание нужно направить на тех кто создал тайп скрипт',
        themeId: 7,
        answer: 'АВАДА КЕДАВРА',
        points: 600,
      },
      {
        question: 'Главный злодей',
        themeId: 7,
        answer: 'Гриша',
        points: 800,
      },
      {
        question: 'Как называется школьный предмет, который преподавала профессор Трелони?',
        themeId: 7,
        answer: 'Ясновидение',
        points: 1000,
      },
      {
        question: 'Какое аниме является самым продолжительным по количеству эпизодов?',
        themeId: 8,
        answer: 'Ван Пис',
        points: 200,
      },
      {
        question: 'В каком аниме-фильме был использован образ русской избушки на курьих ножках?',
        themeId: 8,
        answer: 'Ходячий замок',
        points: 400,
      },
      {
        question: 'В каком аниме мир находится под угрозой гигантских существ',
        themeId: 8,
        answer: 'Атака титанов',
        isAnswered: false,
        points: 600,
      },
      {
        question: 'Я уже не знаю что придумать, просто аниме напишите',
        themeId: 8,
        answer: 'ван пис',
        isAnswered: false,
        points: 800,
      },
      {
        question: 'Кто был 3 хокаге',
        themeId: 8,
        answer: 'Хирузен Сарутоби',
        isAnswered: false,
        points: 1000,
      },
      {
        question: 'Какая игра является самой продаваемой в истории видеоигр?',
        themeId: 9,
        answer: 'Майнкрафт',
        points: 200,
      },
      {
        question: 'Как называется игра, в которой главный герой путешествует по постапокалиптическому миру',
        themeId: 9,
        answer: 'Fallout',
        points: 400,
      },
      {
        question: 'Имя главного персонажа в игре Ведьмак',
        themeId: 9,
        answer: 'Геральт',
        points: 600,
      },
      {
        question: 'В какой игре главный персонаж должен спасать принцессу Пич из клешенц злого черепахи Боузера?',
        themeId: 9,
        answer: 'Супер марио',
        points: 800,
      },
      {
        question: 'В какой игре вы создаёте и управляете виртуальными персонажами в их повседневной жизни?',
        themeId: 9,
        answer: 'sims',
        isAnswered: false,
        points: 1000,
      },
      {
        question: 'что медведи медведи вешают на уши преподам, когда говорят что вернутся к заданию на выходных',
        themeId: 10,
        answer: 'лапша',
        points: 200,
      },
      {
        question: 'Как называется блюдо, состоящее из кусочков мяса или овощей, обжаренных в тесте?',
        themeId: 10,
        answer: 'жаркое',
        points: 400,
      },
      {
        question: 'Как называется перечная приправа, часто использованная в мексиканской кухне?',
        themeId: 10,
        answer: 'Кумин',
        points: 600,
      },
      {
        question: 'Как называют острые мексиканские тортильи?',
        themeId: 10,
        answer: 'Такос',
        points: 800,
      },
      {
        question: 'Обжаренные ломтики хлеба с яйцом и возможно специями или сыром    ',
        themeId: 10,
        answer: 'тосты',
        points: 1000,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  },
};
