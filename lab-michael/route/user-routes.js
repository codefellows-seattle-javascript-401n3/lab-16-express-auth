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
      .then(user => res.json(user))
      .catch(err => res.send(err.message));

  });

  router.get('/users/:id', authMiddlewear, (req, res) => {
    // delete req.user.password;
    // res.json(req.user)  // This is after we refactor the
    // console.log(req.params.id);
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.send(err.message));
  });
};