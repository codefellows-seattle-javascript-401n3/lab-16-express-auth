'use strict';

const User = require('../models/user');
const jsonToken = require('jsonwebtoken');
const createError = require('http-errors');
const constants = require('./constants');

module.exports = function(req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jsonToken.verify(token, constants.TOKEN_KEY, function(err, decoded) {
      if (err) return next(createError(500, 'Failed to authenticate token.'));
      req.decoded = decoded;
      next();
    });
  } else if (req.headers['authorization']) {
    let auth = req.headers.authorization;
    if (!auth) {
      return next(createError(403, 'No authorization provided.'));
    }
    let base64String = auth.split('Basic')[1];

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
  } else {
    return next(createError(403, 'No authorization.'));
  }
};
