'use strict';

let User = require('../models/user');
let authMiddlewear = require('../lib/authentication');
let jsonParser = require('body-parser').json();
let createError = require('http-errors');

module.exports = (router) => {
  router.post('/users', jsonParser, (req, res, next) => {
    let user = new User(req.body);
    user.hashPassword(user.password)
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(err => res.json({message: 'error in post route...'}));
  });

  router.get('/users/:id', authMiddlewear, (req, res, next) => {
    User.findById(req.params.id)
    .then(user => res.json (user))
    .catch(err => res.json({message: 'error in get route...'}));
  });
};

// app.post('/login', authMiddlewear, (req, res) => {
//   console.log(req.headers.authorization);
//   res.end();
// });
