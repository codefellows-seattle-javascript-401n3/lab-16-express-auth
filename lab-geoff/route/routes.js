'use strict';

let jsonParser = require('body-parser').json();
let User = require('../model/model.js');
let basicAuth = require('../lib/basic-auth.js');
let bearerAuth = require('../lib/bearer-auth.js');
let Router = require('express').Router;
let router = new Router();

router.post('/users', jsonParser, (req, res) => {
  let body = req.body;
  let user = new User(body);
  user.hashPass(user.password)
    .then(user => user.save())
    .then(user => res.json(user))
    .catch();
});

router.post('/login/:id', basicAuth, (req, res) => {
  User.findById(req.params.id)
  .then(user => {
    let token = user.generateToken();
    console.log(token);
    res.json(token);
  });
});

router.get('/users/:id', bearerAuth, function(req, res) {
  //remove password
  res.json(req.user);
});

module.exports = router;