'use strict';

const express = require('express');
const jsonToken = require('jsonwebtoken');
const createError = require('http-errors');
const constants = require('../lib/constants');

const User = require('../models/user');

const authMiddleware = require('../lib/authentication');

const router = module.exports = express.Router();

router.post('/users', function(req, res, next) {
  new User(req.body).save().then(function(user) {
    res.json({ id: user._id, username: user.username, email: user.email });
  }).catch(next);
});

router.get('/users/:id', authMiddleware, function(req, res, next) {
  User.findById(req.params.id)
  .then(user => res.json(user))
  .catch(next);
});

router.post('/login', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return next(createError(403, 'Expected username and password.'));
  }

  User.findOne({ username: req.body.username }).then(function(user) {
    if (!user) {
      return next(createError(403, 'Invalid username or password.'));
    }
    return user;
  }).then(function(user) {
    user.checkPass(req.body.password, function(err, correct) {
      if (err) throw err;
      if (correct) {
        let token = jsonToken.sign(user, constants.TOKEN_KEY, {
          expiresIn: constants.TOKEN_EXPIRY_TIME
        });

        res.json({
          token: token,
          expiresIn: Date.now() + (constants.TOKEN_EXPIRY_TIME * 1000)
        });
      }
    });
  }).catch(next);
});
