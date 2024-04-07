const express = require('express');

const router = express.Router();
const { Message, User } = require('../../db/models');

// Маршрут для отправки нового сообщения
router.post('/send', async (req, res) => {
  try {
    const { text, receiverId } = req.body;
    const { userId } = req.session; // Идентификатор отправителя из сессии
    console.log('userId', userId);
    // Создание нового сообщения в базе данных
    const message = await Message.create({
      text,
      senderId: userId,
      receiverId,
    });
    console.log(message);

    // Возвращаем созданное сообщение клиенту
    res.json(message);
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    res.status(500).json({ error: 'Ошибка сервера при отправке сообщения' });
  }
});

module.exports = router;
