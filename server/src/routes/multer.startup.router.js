const multerStartupRouter = require('express').Router();
const multer = require('multer');
const uploadMid = require('../../file');
const { StartUp } = require('../../db/models');

multerStartupRouter.post('/', uploadMid.single('photos'), async (req, res) => {
  console.log(req.body);
  console.log('ЗДЕСЬ ФАЙЛ СЕРВЕР', req.file);
  try {
    if (req.file) {
      console.log(req.file);
      const photos = req.file.originalname;
      const { userId } = req.session;
      const {
        startUpTitle,
        startUpDescription,
        startUpCategory,
        progress,
        currentAmount,
        targetAmount,
      } = req.body;
      const photosStartup = await StartUp.create({
        userId,
        photos,
        startUpTitle,
        startUpDescription,
        startUpCategory,
        progress,
        currentAmount,
        targetAmount,
      });
      res.json(photosStartup);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = multerStartupRouter;
