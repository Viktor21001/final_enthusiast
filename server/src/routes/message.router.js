const express = require('express');

const router = express.Router();
const { Message } = require('../../db/models');

// Маршрут для отправки нового сообщения
router.post('/', async (req, res) => {
  try {
    const { text, receiverId } = req.body;
    // Идентификатор отправителя из сессии
    const { userId } = req.session;
    console.log('userId', userId);
    // Создание нового сообщения в базе данных
    const message = await Message.create({
      text,
      senderId: userId,
      receiverId,
    });

    // Возвращаем созданное сообщение клиенту
    res.json(message);
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    res.status(500).json({ error: 'Ошибка сервера при отправке сообщения' });
  }
});

module.exports = router;
