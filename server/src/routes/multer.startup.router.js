// const multerStartupRouter = require('express').Router();
// const multer = require('multer');
// const uploadMid = require('../../file');
// const { StartUp } = require('../../db/models');

// multerStartupRouter.post('/', uploadMid.single('photos'), async (req, res) => {
//   console.log(req.body);
//   console.log('ЗДЕСЬ ФАЙЛ СЕРВЕР', req.file);
//   try {
//     if (req.file) {
//       console.log(req.file);
//       const photos = req.file.originalname;
//       const { userId } = req.session;
//       const {
//         startUpTitle,
//         startUpDescription,
//         startUpCategory,
//         progress,
//         currentAmount,
//         targetAmount,
//       } = req.body;
//       const photosStartup = await StartUp.create({
//         userId,
//         photos,
//         startUpTitle,
//         startUpDescription,
//         startUpCategory,
//         progress,
//         currentAmount,
//         targetAmount,
//       });
//       res.json(photosStartup);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// module.exports = multerStartupRouter;

// multerRouter.post('/', uploadMid.array('photos', 5), async (req, res) => { // Предположим, что maxCount равен 5
//     try {
//       const { userId } = req.session;
//       const { title, description, category } = req.body;
//       const photos = req.files.map(file => file.originalname); // 'req.files' содержит массив файлов

//       const newIdea = await Idea.create({
//         userId, title, description, category, photos: JSON.stringify(photos),
//       });

//       res.json(newIdea);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Ошибка при загрузке изображений');
//     }
//   });

const multerStartupRouter = require('express').Router();
const multer = require('multer');
const uploadMid = require('../../file');
const { StartUp } = require('../../db/models');

multerStartupRouter.post(
  '/',
  uploadMid.array('photos', 5),
  async (req, res) => {
    console.log(req.body);
    console.log('ЗДЕСЬ ФАЙЛЫ СЕРВЕР', req.files); // 'req.files', так как теперь ожидается несколько файлов
    try {
      if (req.files) {
        const photos = req.files.map((file) => file.originalname); // Получаем имена всех файлов
        const {
          userId,
          startUpTitle,
          startUpDescription,
          startUpCategory,
          progress,
          currentAmount,
          targetAmount,
        } = req.body;
        const photosStartup = await StartUp.create({
          userId,
          photos: JSON.stringify(photos), // Сохраняем массив имен файлов в виде строки JSON
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
  }
);

module.exports = multerStartupRouter;
