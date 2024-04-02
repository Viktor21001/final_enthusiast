const ideaRouter = require('express').Router();

const { Idea } = require('../../db/models');

ideaRouter.get('/', async (req, res) => {
  try {
    const ideas = await Idea.findAll({
      raw: true,
    });
    console.log(ideas);
    res.json(ideas)
  } catch (error) {
    console.log(error);
  }
});

ideaRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const idea = await Idea.findOne({ where: { id }, raw: true });
    res.json(idea);
  } catch (error) {
    console.log(error);
  }
});

ideaRouter.post('/new', async (req, res) => {
  try {
    const game = await Idea.create({ name: req.body.name });
    res.json(game);
  } catch (error) {
    console.log(error);
  }
});

ideaRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Idea.destroy({ where: { id } });
    res.json({ msg: 'deleted' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = ideaRouter;
