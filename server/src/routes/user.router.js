// Подключение зависимостей и моделей
const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User } = require('../../db/models');

// Регистрация пользователя
userRouter.post('/registration', async (req, res) => {
  // Деструктуризация данных пользователя из тела запроса
  const { login, email, password, isInvestor } = req.body;

  // Попытка найти пользователя по логину или почте
  try {
    const user = await User.findOne({
      where: { [Op.or]: [{ login }, { email }] },
    });

    // Если пользователь найден, отправить ошибку
    if (user) {
      return res.status(409).json({ message: 'Пользователь уже существует' });
    }

    // Хеширование пароля пользователя
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const newUser = await User.create({
      login,
      email,
      password: hashedPassword,
      isInvestor,
    });

    // Отправка ответа об успешной регистрации
    res
      .status(201)
      .json({ message: 'Пользователь зарегистрирован', userId: newUser.id });
  } catch (error) {
    // Обработка и отправка ошибки сервера
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при регистрации' });
  }
});

// Авторизация пользователя
userRouter.post('/login', async (req, res) => {
  const { login, password } = req.body;

  try {
    // Поиск пользователя по логину
    const user = await User.findOne({ where: { login } });

    // Если пользователь не найден
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверный пароль' });
    }

    // Авторизация успешна, здесь можете добавить логику создания токена или сессии
    res.json({ message: 'Авторизация успешна', userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при авторизации' });
  }
});

// Выход пользователя
userRouter.post('/logout', (req, res) => {
  // Здесь предполагается, что вы используете сессии
  // Удаляем сессию пользователя
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при выходе из системы' });
    }

    // Очистка cookie, связанной с сессией
    res.clearCookie('connect.sid'); // Замените 'connect.sid' на имя вашей cookie сессии, если оно отличается

    res.json({ message: 'Вы успешно вышли из системы' });
  });
});

// Экспорт роутера
module.exports = userRouter;
