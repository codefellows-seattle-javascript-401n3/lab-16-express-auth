let User = require('../model/model');
let authMiddleware = require('../lib/authMiddleware');
let jsonParser = require('body-parser').json();
let createError = require('http-errors');
let bcrypt = require('bcrypt');

module.exports = (router) => {
  router.post('/users', jsonParser, (req, res) => {
    let user = new User(req.body);
    user.hashPassword(user.password)
      .then(user => user.save())
      .then(user => res.json(user))
      .catch();
  });

  router.get('/users/:id', authMiddleware, (req, res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => next(createError(404, 'Not Found')));
  });
};
