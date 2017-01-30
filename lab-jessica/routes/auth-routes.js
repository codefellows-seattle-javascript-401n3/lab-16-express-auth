'use strict';

const Router = require('express').Router;
const basicAuth = require('../lib/basic-authentication.js');
const User = require('../models/user.js');
const createError = require('http-errors');

const router = module.exports = new Router();

router.post('/signup', (req, res, next) => {
  const user = new User(req.body);

  user.hashPassword(user.password)
    .then(user => user.save())
    .then(user => res.json({username: user.username, email: user.email, _id: user._id}))
    .catch(next);
});

router.get('/login', basicAuth, (req, res, next) => {
  User.findOne({username: req.auth.username})
    .then(user => {
      if(!user) return Promise.reject(createError(401));
      return user.comparePasswords(req.auth.password);
    })
    .then(user => user.generateToken())
    .then(token => res.json(token))
    .catch(next);
});
