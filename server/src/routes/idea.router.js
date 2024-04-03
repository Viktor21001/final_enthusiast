const ideaRouter = require('express').Router();

const { Idea } = require('../../db/models');

ideaRouter.get('/', async (req, res) => {
  try {
    const ideas = await Idea.findAll({
      raw: true,
    });
    res.json(ideas);
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
    const { userId } = req.session;
    // console.log(req.session, 'это яяяяяяя');

    const ideaData = req.body;
    ideaData.userId = userId;
    const idea = await Idea.create(ideaData);
    res.json(idea);
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

ideaRouter.post('/like/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const likeIdea = await Idea.findByPk(id);
    if (!likeIdea) {
      return res.status(404).json({ error: 'Idea not found' });
    }
    await likeIdea.increment('likes', { by: 1 });
    res.json({ status: 'liked' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

ideaRouter.post('/dislike/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const dislikeIdea = await Idea.findByPk(id);
    if (!dislikeIdea) {
      return res.status(404).json({ error: 'Idea not found' });
    }
    await dislikeIdea.increment('dislikes', { by: 1 });
    res.json({ status: 'disliked' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = ideaRouter;
