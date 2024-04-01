const apiRouter = require('express').Router();

const gameRouter = require('./game.router');
const questionRouter = require('./questions.router');
const statisticRouter = require('./statistic.router');
const themeRouter = require('./theme.router');
const userRouter = require('./user.router');

module.exports = apiRouter
  .use('/users', userRouter)
  .use('/games', gameRouter)
  .use('/questions', questionRouter)
  .use('/statistics', statisticRouter)
  .use('/themes', themeRouter);
