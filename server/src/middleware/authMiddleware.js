const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { token } = req.session;
  const data = jwt.verify(token, 'dream');
  next();
};
