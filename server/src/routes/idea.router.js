const ideaRouter = require('express').Router();

const { Idea } = require('../../db/models');

ideaRouter.get('/', async (req, res) => {
  try {
    const ideas = await Idea.findAll({
      raw: true,
    });
    console.log(ideas);
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
    const idea = await Idea.create(req.body);
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

ideaRouter.post('/wallet/:id', async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body; // Тут нужно на клинете передать сумму!!!

  try {
    const idea = await Idea.findByPk(id);
    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    if (amount.isNun || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    await idea.increment('wallet', { by: amount });

    res.json({ status: 'done', wallet_balance: idea.wallet });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = ideaRouter;
