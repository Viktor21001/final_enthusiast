const multerAvatarRouter = require('express').Router();
const multer = require('multer');
const uploadMid = require('../../file');
const { UserProfile } = require('../../db/models');

multerAvatarRouter.post('/', uploadMid.single('photo'), async (req, res) => {
  console.log(req.body);
  console.log('ЗДЕСЬ ФАЙЛ СЕРВЕР', req.file);
  try {
    if (req.file) {
      console.log(req.file);
      const avatar = req.file.originalname;
      const { userId } = req.session;
      const {
        interests, activity,
      } = req.body;
      //   console.log(Array.isArray(trade));
      //   console.log(JSON.parse(trade));
      const avatarUser = await UserProfile.create({
        userId, avatar, interests, activity,
      });
      res.json(avatarUser);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = multerAvatarRouter;
