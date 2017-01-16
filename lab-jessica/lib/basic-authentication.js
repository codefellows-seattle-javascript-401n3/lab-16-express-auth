'use strict';

const createError = require('http-errors');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if(!auth) return next(createError(401, 'authorization header required'));

  const base64String = auth.split('Basic ')[1];
  if(!base64String) return next(createError(401, 'username and password required'));

  const [username, password] = new Buffer(base64String, 'base64').toString().split(':');
  if(!username) return next(createError(401, 'username required'));
  if(!password) return next(createError(401, 'password required'));

  req.auth = {
    username: username,
    password: password
  };

  next();
};
