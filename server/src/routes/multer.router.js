const multerRouter = require('express').Router();
const multer = require('multer');
const uploadMid = require('../../file');
const { Idea } = require('../../db/models');

multerRouter.post('/', uploadMid.single('photo'), async (req, res) => {
  console.log(req.body);
  console.log('ЗДЕСЬ ФАЙЛ СЕРВЕР', req.file);
  try {
    if (req.file) {
      console.log(req.file, '>>>>>>>>>>...REQ FILE');
      const photo = req.file.originalname;
      const { userId } = req.session;
      const { title, description, category } = req.body;
      //   console.log(Array.isArray(trade));
      //   console.log(JSON.parse(trade));
      const ideaSale = await Idea.create({
        userId,
        title,
        description,
        category,
        photo,
      });
      res.json(ideaSale);
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = multerRouter;
