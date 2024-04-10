const startupRouter = require('express').Router();
const uploadMid = require('../../file');
const { StartUp, User } = require('../../db/models');

startupRouter.get('/', async (req, res) => {
  try {
    const startUps = await StartUp.findAll({
      raw: true,
      include: {
        model: User,
        // as: 'User',
        attributes: ['login'],
      },
    });
    res.json(startUps);
  } catch (error) {
    console.log(error);
  }
});

startupRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const startUp = await StartUp.findOne({
      where: { id },
      raw: true,
      include: {
        model: User,
        // as: 'User',
        attributes: ['login'],
      },
    });
    res.json(startUp);
  } catch (error) {
    console.log(error);
  }
});

startupRouter.post('/new', uploadMid.single('photos'), async (req, res) => {
  const { userId } = req.session;
  const startUpData = req.body;
  startUpData.userId = userId;
  try {
    let photos = 'sadMax.jpg';
    if (req.file) {
      photos = req.file.originalname;
    }
    startUpData.photos = photos;
    const startUp = await StartUp.create(startUpData);
    res.json(startUp);
  } catch (error) {
    console.log(error);
  }
});

//! ручка на изменеие стартапа
startupRouter.put(
  '/update/:id',
  uploadMid.single('photos'),
  async (req, res) => {
    const { id } = req.params; // ID стартапа, который нужно обновить
    const startUpData = req.body;

    try {
      // Используйте имя файла по умолчанию, если фото не обновляется
      let photos = 'defaultPhoto.jpg';
      if (req.file) {
        photos = req.file.originalname; // Если фото обновляется, используйте новое имя файла
      }
      startUpData.photos = photos;

      // Ищем стартап по ID и обновляем его данные
      const [updatedRows] = await StartUp.update(startUpData, {
        where: { id },
      });

      // Если updatedRows равно 0, стартап не найден и не был обновлен
      if (updatedRows === 0) {
        return res
          .status(404)
          .json({ message: 'Стартап не найден или данные не были изменены.' });
      }

      // Если стартап успешно обновлен, возвращаем обновленные данные
      const updatedStartUp = await StartUp.findByPk(id);
      res.json(updatedStartUp);
    } catch (error) {
      console.error('Ошибка при обновлении стартапа:', error);
      res.status(500).json({ message: 'Ошибка при обновлении стартапа.' });
    }
  }
);

startupRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await StartUp.destroy({ where: { id } });
    res.json({ msg: 'deleted' });
  } catch (error) {
    console.log(error);
  }
});

startupRouter.patch('/:id', async (req, res) => {
  const startUp = await StartUp.findByPk(req.params.id);
  await startUp.update(req.body);
  res.json(startUp);
});

startupRouter.post('/funding/:id', async (req, res) => {
  const { id } = req.params;
  // Тут нужно на клинете передать сумму!!!
  const { amount } = req.body;
  try {
    const startup = await StartUp.findByPk(id);
    if (!startup) {
      return res.status(404).json({ error: 'Startup not found' });
    }

    if (amount.isNaN || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    await startup.increment('currentAmount', { by: amount });

    res.json({ status: 'done', startup_balance: startup.currentAmount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = startupRouter;
