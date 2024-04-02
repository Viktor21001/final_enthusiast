const apiRouter = require('express').Router();

const ideaRouter = require('./idea.router');
// const questionRouter = require('./questions.router');
// const statisticRouter = require('./statistic.router');
// const themeRouter = require('./theme.router');
const userRouter = require('./user.router');

module.exports = apiRouter
  .use('/users', userRouter)
  .use('/ideas', ideaRouter)
  // .use('/questions', questionRouter)
  // .use('/statistics', statisticRouter)
  // .use('/themes', themeRouter);
