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

// Экспорт роутера
module.exports = userRouter;
