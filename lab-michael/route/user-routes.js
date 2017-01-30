'use strict';
let User = require('../model/user');
let authMiddlewear = require('../lib/authentication');
let jsonParser = require('body-parser').json();
// let createError = require('http-errors');

module.exports = (router) => {
  router.post('/users', jsonParser, (req, res) => {
    let user = new User(req.body);
    console.log(req.body);
    user.hashPassword(user.password)
      .then(user => user.save())
      .then(user => res.json({_id: user.id, username: user.username, email: user.email}))
      .catch(err => res.send(err.message));

  });

  router.get('/users/:id', authMiddlewear, (req, res) => {
    res.json({_id: req.user._id, username: req.user.username, email: req.user.email});

  });
};