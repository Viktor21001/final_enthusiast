//! Установка socket.io npm install cors socket.io

//? Чтобы работать с socket.io нужно слешать не конкретно app,
//? а чтобы сервер слушал конкретно модуль http который есть у node
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const { PORT, SESSION_SECRET } = process.env;
//
const socketIO = require('socket.io')(http, {
  cors: {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  },
});

socketIO.on('connection', (socket) => {
  console.log(`Client connected ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`Client disconnected ${socket.id}`);
  });
});

http.listen(PORT, function () {
  console.log(`Server started on http://localhost:${this.address().port}`);
});
//
//! Сервер готов. Далее создаем Клиент Vite
//? npm install socket.io-client
//! Импортируем в App.tsx socketIO
//? import socketIO from 'socket.io-client';
// Далее нужно установить коннект с сервером
//? const socket = socketIO.connect('http://localhost:3000');
// Client connected Npfy0O-gPzJPHiq_AAAB
// Создаем компонет Chat
//? И делает роут и передаем пропсом наш socket <Route path="/chats" element={<Chat />} />
// так же пропсом передаем в компоненте Chat
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
