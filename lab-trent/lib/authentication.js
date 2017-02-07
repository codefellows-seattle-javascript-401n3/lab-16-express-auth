'use strict';

const User = require('../models/user');
const jsonToken = require('jsonwebtoken');
const createError = require('http-errors');
const constants = require('./constants');

module.exports = function(req, res, next) {
  let header = req.headers['authorization'];
  if (!header) {
    return next(createError(403, 'No authorization provided.'));
  }
  if (header.includes('Bearer')) {
    jsonToken.verify(header.replace('Bearer ', ''), constants.TOKEN_KEY, function(err, decoded) {
      if (err) return next(createError(500, 'Failed to authenticate token.'));
      req.decoded = decoded;
      next();
    });
  } else {
    let base64String = header.split('Basic')[1];

    let details = new Buffer(base64String, 'base64').toString().split(':')[0];
    User.findOne({username: details[0]}).then(function(user) {
      if (user.password == details[1]) {
        next();
      } else {
        return next(createError(403, 'Invalid username or password.'));
      }
    }).catch(function(err) {
      return next(createError(500, err.message));
    });
  }
};
