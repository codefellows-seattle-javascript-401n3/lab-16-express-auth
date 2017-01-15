'use strict';

let User = require('../models/user');
// let authMiddlewear = require('../lib/authentication');
let jsonParser = require('body-parser').json();
let createError = require('http-errors');

module.exports = (router) => {
  router.post('/users', jsonParser, (req, res, next) => {
    new User(req.body).save()
    .then(user => res.json(user))
    .catch(err => res.json(err))
    //.catch(err =>console.log(err) /*next(createError(404, 'error inside post route!'))*/);
  });

  router.get('/users/:id', (req, res, next) => {
    User.findById(id )
    .then(user => res.json (user))
    .catch(err => next(createError(404, 'error, user not found')));


  });
  /*router.post('/signup', (req, res) => {
    User.create(req.body)
    .then(user => res.json(user))
      .catch()
  });

  router.post('/login', authMiddlewear, (req, res) => {
    res.end();
  });*/
};

  // router.post('/users', jsonParser, (req, res, next) => {
  //   console.log('inside the post router. ');
  //   let user = new User(req.body);
  //   user.hashPassword(user.password)
  //     .then(user => user.save())
  //     .then(user => res.json(user))
  //     .catch(err => next(createError(404, 'not found.')));
  // });
  //
  // router.get('/users/:id', authMiddlewear, (req, res, next) => {
  //   User.findById(req.params.id)
  //     .then(user => res.json(user))
  //     .catch(err => next(createError(404, 'not found.')));
  // });
