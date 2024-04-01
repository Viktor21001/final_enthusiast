const questionRouter = require('express').Router();

const { Question } = require('../../db/models');

questionRouter.get('/', async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (error) {
    console.log(error);
  }
});

questionRouter.get('/:id', async (req, res) => {
  try {
    const question = await Question.findOne({
      where: { id: req.params.id },
    });
    res.json(question);
  } catch (error) {
    console.log(error);
  }
});

questionRouter.patch('/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { isAnswered } = req.body;
    const updatedQuestions = await Question.update(
      {
        isAnswered,
        where: { id },
      },
    );
    res.json(updatedQuestions);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

questionRouter.post('/new', async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.json(question);
  } catch (error) {
    console.log(error);
  }
});

questionRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Question.destroy({ where: { id } });
    res.json({ msg: 'deleted' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = questionRouter;
