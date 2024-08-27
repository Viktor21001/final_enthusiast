const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    userId: user.id,
    login: user.login,
  };


  const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h', // срок действия токена, например, 1 час
  });

  return token;
};

module.exports = { generateToken };
