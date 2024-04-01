const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User } = require('../../db/models');

userRouter.post('/registration', async (req, res) => {
  const { login, email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { login },
          { email },
        ],
      },
    });
    if (user) {
      res.json({ msgErr: 'Пользователь с указанным именем или почтой уже существует' });
    } else {
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({ login, email, password: hashPassword });
      req.session.login = newUser.login;
      req.session.userId = newUser.id;
      req.session.save(() => {
        res.json({ msgDone: 'Пользователь зарегистрирован', login: newUser.login, userId: newUser.id, email: newUser.email, createdAt: newUser.createdAt });
      });
    }
  } catch (error) {
    res.json(error);
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login } });
    if (!user) {
      res.json({ logErr: 'Пользователь не найден' });
    } else {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        req.session.login = user.login;
        req.session.userId = user.id;
        req.session.save(() => {
          res.json({ logMsg: 'Пользователь вернулся', login: user.login, userId: user.id, email: user.email, createdAt: user.createdAt });
        });
      } else {
        res.json({ logErr: 'Введен не верный пароль' });
      }
    }
  } catch (error) {
    res.status(500);
  }
});

userRouter.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('cookieName');
    res.json({ log: 'User logout' });
  });
});

module.exports = userRouter;
