const themeRouter = require('express').Router();

const { Theme } = require('../../db/models');

themeRouter.get('/:gameId', async (req, res) => {
  console.log(req.params);
  try {
    const themes = await Theme.findAll({
      raw: true,
      where: { gameId: req.params.gameId },
    });

    res.json(themes);
  } catch (error) {
    console.log(error);
  }
});

themeRouter.post('/new', async (req, res) => {
  try {
    const theme = await Theme.create({ name: req.body.name });
    res.json(theme);
  } catch (error) {
    console.log(error);
  }
});

themeRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Theme.destroy({ where: { id } });
    res.json({ msg: 'deleted' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = themeRouter;
