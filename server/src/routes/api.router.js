const apiRouter = require('express').Router();

const ideaRouter = require('./idea.router');
const startupRouter = require('./startup.router');
const favoriteRouter = require('./favorites.router');
const userRouter = require('./user.router');
const memberRouter = require('./members.router');
const multerRouter = require('./multer.router');
const multerAvatarRouter = require('./multer.avatar.router');
const multerSpartupRouter = require('./multer.startup.router');

module.exports = apiRouter
  .use('/users', userRouter)
  .use('/ideas', ideaRouter)
  .use('/startups', startupRouter)
  .use('/favorites', favoriteRouter)
  .use('/members', memberRouter)
  .use('/images', multerRouter)
  .use('/avatar', multerAvatarRouter)
  .use('/photos', multerSpartupRouter);
