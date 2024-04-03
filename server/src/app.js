require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const apiRouter = require('./routes/api.router');

const app = express();
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

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(cors(corsConfig));
app.use(session(sessionConfig));

app.use('/api/v1', apiRouter);

app.listen(PORT, function () {
  console.log(`Server started on http://localhost:${this.address().port}`);
});
