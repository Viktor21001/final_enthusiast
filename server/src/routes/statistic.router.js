const statisticRouter = require('express').Router();

const { Statistic, Game, User } = require('../../db/models');

statisticRouter.get('/all', async (req, res) => {
  try {
    const games = await Statistic.findAll({
      raw: true,
      include: [
        { model: Game },
        { model: User },
      ],
      order: [['score', 'DESC']],
    });
    console.log(games);
    res.json(games);
  } catch (error) {
    console.log(error);
  }
});

statisticRouter.get('/', async (req, res) => {
  try {
    const games = await Statistic.findAll({
      raw: true,
      where: { userId: req.session.userId },
      include: [{
        model: Game,
      }],
      order: [['createdAt', 'DESC']],
    });
    console.log(games);
    res.json(games);
  } catch (error) {
    console.log(error);
  }
});

statisticRouter.post('/new/:id', async (req, res) => {
  const { score } = req.body;
  try {
    const game = await Statistic.create({
      userId: req.session.userId,
      gameId: req.params.id,
      score,
    });
    res.json(game);
  } catch (error) {
    console.log(error);
  }
});

statisticRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Statistic.destroy({ where: { id } });
    res.json({ msg: 'deleted' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = statisticRouter;
