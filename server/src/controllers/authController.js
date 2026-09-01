const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      const err = new Error('User already exists');
      err.status = 400;
      throw err;
    }

    const user = await User.create({ username, email, password });

    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token: generateToken(user.id),
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    
    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        token: generateToken(user.id),
      });
    } else {
      const err = new Error('Invalid email or password');
      err.status = 401;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login };
