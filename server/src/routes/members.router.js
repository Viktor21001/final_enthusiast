const memberRouter = require('express').Router();

const {
  StartUp,
  User,
  startUpMember,
  UserProfile,
} = require('../../db/models');

memberRouter.get('/:startUpId', async (req, res) => {
  const { startUpId } = req.params;

  try {
    const members = await startUpMember.findAll({
      where: { startUpId }, //  тут типа участники отфильтрованы по startUpId
      include: {
        model: User,
        attributes: ['login'], // может лучше будет не логин а ФИО
      },
      raw: true,
    });
    console.log(members);
    res.json(members);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

memberRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const member = await startUpMember.findOne({
      where: { userId: id },
      include: [
        {
          model: User,
          include: UserProfile, // Надеюь синтаксис правильный для  UserProfile
        },
      ],
      raw: true,
    });
    res.json(member);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

memberRouter.post('/new/:startUpId', async (req, res) => {
  try {
    const { login, role } = req.body;
    const { startUpId } = req.params;

    const user = await User.findOne({ where: { login } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const member = await startUpMember.create({
      userId: user.id,
      startUpId,
      role,
    });

    res.json(member);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

memberRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await startUpMember.destroy({ where: { id } });
    res.json({ msg: 'deleted' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = memberRouter;
