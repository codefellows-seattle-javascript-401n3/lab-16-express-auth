'use strict';

const Router = require('express').Router;

// app modules
const User = require('../models/user.js');
const authMiddleware = require('../lib/authentication.js');

const router = module.exports = new Router();

router.post('/users', (req, res) => {

  const user = new User(req.body);

  user.hashPassword(user.password)
    .then(user => user.save())
    .then(user => res.json({username: user.username, email: user.email, _id: user._id}))
    .catch(err => {
      console.error(err);
      res.status(400).send('bad request' + '\n');
    });
});

router.get('/users/:id', authMiddleware, (req, res) => {
  res.json({username: req.user.username, email: req.user.email, _id: req.user._id});
});
