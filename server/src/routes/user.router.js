const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await User.findOne({ where: { login } });
    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        req.session.login = user.login;
        req.session.save(() => {
          res.json({ success: true, message: 'Пароль верный', user });
        });
      } else {
        res.status(400).json({ err: 'Неверный пароль' });
      }
    } else {
      res.status(400).json({ err: 'Такой пользователь не найден!' });
    }
  } catch (error) {
    console.log('Ошибка авторизации!', error);
    res.status(500).json({ err: 'Ошибка при авторизации' });
  }
});

router.post('/registration', async (req, res) => {
  const { login, email, password } = req.body;
  console.log(login, email, password);
  try {
    const user = await User.findOne({ where: { login } });
    if (user) {
      res.status(400).json({ err: `Такой ${email} уже существует!` });
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({ login, password: hash, email, isInvestor: false });
      req.session.login = newUser.login;
      req.session.userId = newUser.id;
      req.session.save(() => {
        res.json({ success: true, message: 'Регистрация прошла успешно', newUser });
      });
    }
  } catch (error) {
    res.send(`Ошибка при регистрации: ${error}`);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('cooks');
    res.sendStatus(200);
  });
});

router.get('/session', (req, res) => {
  const { login, userId } = req.session;
  if (login) {
    res.json({ login, id: userId });
  } else {
    res.json({ id: 0, login: '' });
  }
});

module.exports = router;
