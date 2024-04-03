const apiRouter = require('express').Router();

const ideaRouter = require('./idea.router');
const startupRouter = require('./startup.router');
const favoriteRouter = require('./favorites.router');
// const themeRouter = require('./theme.router');
const userRouter = require('./user.router');

module.exports = apiRouter
  .use('/users', userRouter)
  .use('/ideas', ideaRouter)
  .use('/startups', startupRouter)
  .use('/favorites', favoriteRouter);
// .use('/themes', themeRouter);
