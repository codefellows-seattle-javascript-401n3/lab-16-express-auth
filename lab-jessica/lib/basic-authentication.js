'use strict';

const createError = require('http-errors');
const User = require('../models/user.js');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;

  if(!auth) throw new Error('authorization headers expected');

  const base64String = auth.split('Basic ')[1];
  const [username, password] = new Buffer(base64String, 'base64').toString().split(':');

  User.findOne({username: username})
    .then(user => {

      if(!user) {
        return Promise.reject(createError(404, 'User not found in database'));
      }

      return user.comparePasswords(password);
    })
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => next(err));
};
