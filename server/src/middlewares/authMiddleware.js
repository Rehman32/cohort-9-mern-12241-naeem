const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });

      if (!req.user) {
        throw new Error();
      }

      next();
    } catch (error) {
      const err = new Error('Not authorized, token failed');
      err.status = 401;
      next(err);
    }
  } else {
    const err = new Error('Not authorized, no token');
    err.status = 401;
    next(err);
  }
};

module.exports = { protect };
