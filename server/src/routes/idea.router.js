const ideaRouter = require('express').Router();

const { Idea, Vote } = require('../../db/models');

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
  const { userId } = req.session;

  try {
    const idea = await Idea.findByPk(id);
    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    const existingVote = await Vote.findOne({ where: { userId, ideaId: idea.id } });
    if (existingVote) {
      console.log('User already voted for this idea');
      await existingVote.destroy();
      await idea.decrement('likes', { by: 1 });
      return res.status(200).json({ status: 'vote removed' });
    }

    await Vote.create({ userId, ideaId: idea.id, type: 'like' });
    await idea.increment('likes', { by: 1 });

    res.json({ status: 'liked' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

ideaRouter.post('/dislike/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.session;

  try {
    const idea = await Idea.findByPk(id);
    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    const existingVote = await Vote.findOne({ where: { userId, ideaId: idea.id } });
    if (existingVote) {
      console.log('User already voted for this idea');
      await existingVote.destroy();
      await idea.decrement('dislikes', { by: 1 });
      return res.status(200).json({ status: 'vote removed' });
    }

    await Vote.create({ userId, ideaId: idea.id, type: 'dislike' });
    await idea.increment('dislikes', { by: 1 });

    res.json({ status: 'disliked' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = ideaRouter;
