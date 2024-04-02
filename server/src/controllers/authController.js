// New Express Router
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Router Middleware

// signup route "/auth/signup"
router.post('/signup', async (req, res) => {
  try {
    // grab model from context
    const { User } = req.context.models;
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create new User
    const user = await User.create(req.body);
    // respond, send back user without password
    const response = { username: user.username, role: user.role };
    res.json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// login route "/auth/login"
router.post('/login', async (req, res) => {
  try {
    console.count('login');
    // grab model from context
    const { User } = req.context.models;
    console.count('login');
    // grab username and password
    const { username, password } = req.body;
    // see if user exists
    const user = await User.findOne({ where: { username } });
    if (user) {
      // check if password matches
      const doesItMatch = await bcrypt.compare(password, user.password);
      if (doesItMatch) {
        // remove password from user data
        const userData = { username: user.username, role: user.role };
        // sign token
        const token = jwt.sign(userData, process.env.SECRET);
        // respond
        res.cookie('token', token, { httpOnly: true }).json(userData);
      } else {
        throw 'Passwords do not match';
      }
    } else {
      throw 'User Does Not Exist';
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

// logout "/auth/logout"
router.get('/logout', async (req, res) => {
  res.clearCookie('token').json({ response: 'You are Logged Out' });
});

// Export Router
module.exports = router;
