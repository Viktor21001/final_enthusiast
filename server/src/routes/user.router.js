const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, UserProfile } = require('../../db/models');
const uploadMid = require('../../file');

//! Функция для обновления профиля пользователя
const updateProfile = async (userId, profileData) => {
  const {
    fullName,
    gender,
    birthDate,
    interests,
    activity,
    avatar,
    isInvestor,
  } = profileData;

  //! Найти пользователя по ID
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('Пользователь не найден');
  }

  //! Обновить данные пользователя в модели User
  await user.update({
    fullName,
    gender,
    birthDate,
    isInvestor,
  });

  //! Найти или создать профиль пользователя в модели UserProfile
  const [userProfile, created] = await UserProfile.findOrCreate({
    where: { userId },
    defaults: { interests, activity, avatar },
  });

  //! Если профиль уже существует, обновим его данные
  if (!created) {
    await userProfile.update({ interests, activity, avatar });
  }

  //! Возвращаем обновленную информацию о пользователе и его профиле
  return { user, userProfile };
};

//! Роут для обновления профиля пользователя
router.post('/updateProfile', uploadMid.single('avatar'), async (req, res) => {
  const { userId } = req.session;
  const profileData = req.body;
  try {
    let avatar = 'maleAvatar.png';
    if (req.file) {
      avatar = req.file.originalname;
    }
    profileData.avatar = avatar;
    const { user, userProfile } = await updateProfile(userId, profileData);
    res.json({ user: user.toJSON(), userProfile: userProfile.toJSON() });
  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
    res.status(500).json({ error: 'Ошибка при обновлении профиля' });
  }
});

router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await User.findOne({ where: { login } });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.login = user.login;
      req.session.userId = user.id;
      req.session.save((err) => {
        if (err) {
          // Обработка ошибок сохранения сессии
          console.error('Ошибка сохранения сессии:', err);
          return res.status(500).json({ err: 'Ошибка при аутентификации' });
        }
        res.json({ success: true, message: 'Пароль верный', user });
      });
    } else {
      res.status(400).json({ err: 'Неверный логин или пароль' });
    }
  } catch (error) {
    console.error('Ошибка авторизации:', error);
    res.status(500).json({ err: 'Ошибка при авторизации' });
  }
});

router.post('/registration', async (req, res) => {
  const { login, email, password } = req.body;
  try {
    const user = await User.findOne({ where: { login } });
    if (user) {
      res.status(400).json({ err: `Такой ${email} уже существует!` });
    } else {
      if (password.length < 8) {
        return res.status(401).json({
          err: 'Пароль должен содержать не менее 8 символов',
        });
      }
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        login,
        password: hash,
        email,
        isInvestor: false,
      });
      req.session.login = newUser.login;
      req.session.userId = newUser.id;
      req.session.save(() => {
        res.json({
          success: true,
          message: 'Регистрация прошла успешно',
          newUser,
        });
      });
    }
  } catch (error) {
    res.send(`Ошибка при регистрации: ${error}`);
  }
});

router.get('/profile', async (req, res) => {
  const { userId } = req.session;
  try {
    const rawUser = await User.findByPk(userId, {
      include: [
        {
          model: UserProfile,
          attributes: ['interests', 'activity', 'avatar'],
        },
      ],
    });
    const user = rawUser.get({ plain: true });
    console.log(user);
    const { interests, activity, avatar } = user.UserProfile;
    delete user.UserProfile;
    res.json({
      ...user,
      interests,
      activity,
      avatar,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/people', async (req, res) => {
  try {
    const users = await User.findAll({
      raw: true,
      include: [
        {
          model: UserProfile,
          attributes: ['interests', 'activity', 'avatar'],
          include: [
            {
              model: User,
              attributes: ['login'],
            },
          ],
        },
      ],
    });

    const userList = users.map((user) => ({
      id: user.id,
      fullName: user.fullName,
      interests: user['UserProfile.interests'] || 'Интересы не указаны',
      avatar: user['UserProfile.avatar'],
      login: user['UserProfile.User.login'],
      activity: user['UserProfile.activity'],
    }));

    res.json(userList);
  } catch (error) {
    console.error('Ошибка при получении списка пользователей:', error);
    res
      .status(500)
      .json({ error: 'Ошибка сервера при получении списка пользователей' });
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
