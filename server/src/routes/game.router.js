const gameRouter = require('express').Router();

const { Game } = require('../../db/models');

gameRouter.get('/', async (req, res) => {
  try {
    const games = await Game.findAll({
      raw: true,
    });
    console.log(games);
    res.json(games)
  } catch (error) {
    console.log(error);
  }
});

gameRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findOne({ where: { id }, raw: true });
    res.json(game);
  } catch (error) {
    console.log(error);
  }
});

gameRouter.post('/new', async (req, res) => {
  try {
    const game = await Game.create({ name: req.body.name });
    res.json(game);
  } catch (error) {
    console.log(error);
  }
});

gameRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Game.destroy({ where: { id } });
    res.json({ msg: 'deleted' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = gameRouter;
