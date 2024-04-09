const startupRouter = require('express').Router();
const uploadMid = require('../../file');
const { StartUp, User } = require('../../db/models');

startupRouter.get('/', async (req, res) => {
  try {
    const startUps = await StartUp.findAll({
      raw: true,
      include: {
        model: User,
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
