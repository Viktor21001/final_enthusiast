const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    userId: user.id,
    login: user.login,
  };

  // Вместо 'secret' используйте ваш секретный ключ, желательно длинную случайную строку
  // Храните секретный ключ в переменных окружения, не хардкодьте его в коде!
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h', // срок действия токена, например, 1 час
  });

  return token;
};

module.exports = { generateToken };
