require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');

const app = express();

const http = require('http').Server(app);

const socketIO = require('socket.io')(http, {
  cors: {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  },
});
const db = require('../db/db');
const { Message } = require('../db/models/message');

const apiRouter = require('./routes/api.router');

const { PORT, SESSION_SECRET } = process.env;

const sessionConfig = {
  name: 'cooks',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'ent',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 1000 * 60 * 60,
    httpOnly: true,
  },
};

const corsConfig = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
};
const sessionMiddleware = session(sessionConfig);
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(sessionMiddleware);

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
socketIO.use(wrap(sessionMiddleware));

app.use('/api/v1', apiRouter);
//!----------------------------
const users = [];

socketIO.on('connection', (socket) => {
  console.log(socket.request.session); // Выведите весь объект сессии для отладки
  const { login } = socket.request.session;
  console.log(`Пользователь ${login} подключен через сокет ${socket.id}`);

  // Обработка отправки сообщения
  socket.on('message', async (data) => {
    const { text, receiverId } = data;

    // Проверяем, сохранен ли id в сессии
    const senderId = socket.request.session.id;
    if (!senderId) {
      return console.error('Пользователь не аутентифицирован');
    }

    // Сохранение сообщения в базе данных
    const message = await Message.create({
      text,
      senderId,
      receiverId,
    });

    // Отправка сообщения получателю
    socketIO.to(receiverId).emit('new message', message.get({ plain: true }));
  });
});
//!----------------------------
http.listen(PORT, function () {
  console.log(`Server started on http://localhost:${this.address().port}`);
});
