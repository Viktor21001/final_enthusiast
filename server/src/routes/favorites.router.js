const favoritesRouter = require('express').Router();

const { Favorite, StartUp } = require('../../db/models');

favoritesRouter.get('/', async (req, res) => {
  try {
    const startUps = await Favorite.findAll({
      raw: true,
      where: { userId: req.session.userId },
      include: [
        {
          model: StartUp,
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    console.log(startUps);
    res.json(startUps);
  } catch (error) {
    console.log(error);
  }
});

favoritesRouter.post('/new/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.session;
  console.log(req.session, 'это яяяяяяя');
  try {
    const favorite = await Favorite.findOne({
      where: { userId, startUpId: id },
    });
    if (favorite) {
      favorite.destroy();
      res.json({ msg: 'deleted from favorite' });
    } else {
      const newFavorite = await Favorite.create({ userId, startUpId: id });
      res.json(newFavorite);
    }
  } catch (error) {
    console.log(error);
  }
});

// пока не понимаю будет ли удаляться Стартап из избранных из личной страницы
// favoritesRouter.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Favorite.destroy({ where: { id } });
//     res.json({ msg: 'deleted' });
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = favoritesRouter;
