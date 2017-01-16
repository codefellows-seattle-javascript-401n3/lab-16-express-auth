const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const User = require('../models/user.js');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if(!auth) return next(createError(401, 'authorization header required'));

  let [method, token] = req.headers.authorization.split(' ');
  if(!token) return next(createError(401, 'token required'));

  if(method.toLowerCase() !== 'bearer') return next(createError(401, 'bearer authentication required'));

  jwt.verify(token, process.env.SECRET || 'DEV', (err, decoded) => {
    if(err) return next(err);

    User.findById(decoded.id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => {
        next(createError(401, err.message));
      });
  });
};
