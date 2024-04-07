// const socketIO = require('socket.io');
// const { Message } = require('../db/models/message');

// // Эта функция настраивает сокеты для сервера
// module.exports = (server) => {
//   const io = socketIO(server, {
//     cors: {
//       origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
//       credentials: true,
//     },
//   });

//   io.on('connection', (socket) => {
//     // Получение id пользователя из сессии
//     const { id } = socket.request.session;
//     console.log(`Пользователь ${id} подключен через сокет ${socket.id}`);

//     socket.on('message', async (data) => {
//       const { text, receiverId } = data;
//       try {
//         // Сохранение сообщения в базе данных
//         const message = await Message.create({
//           text,
//           senderId: id,
//           receiverId,
//         });
//         console.log(`Сообщение сохранено: ${message}`);

//         // Отправка сообщения получателю
//         io.to(receiverId).emit('new message', message);
//       } catch (error) {
//         console.error(`Ошибка при сохранении сообщения: ${error}`);
//       }
//     });

//     socket.on('disconnect', () => {
//       console.log(`Пользователь отключен ${socket.id}`);
//     });
//   });
// };
