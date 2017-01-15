'use strict';

let jsonParser = require('body-parser').json();
let User = require('../model/model.js');
let basicAuth = require('../lib/auth.js');
let Router = require('express').Router;
let router = new Router();

router.post('/users', jsonParser, (req, res) => {
  //if auth sent -> generate token
  //else do below
  let body = req.body;
  let user = new User(body);
  user.hashPass(user.password)
    .then(user => user.save())
    .then(user => res.json(user))
    .catch();
});

router.get('/users/:id', basicAuth, function(req, res) {
  console.log('/users/:id');
  User.findById(req.params.id)
  .then(user => {
    res.json(user);
  })
  .catch();
});

module.exports = router;