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
    .catch(() => {
      res.status(400).json({msg: 'Bad Request'});
    });
});

router.post('/login/:id', basicAuth, (req, res) => {
  User.findById(req.params.id)
  .then(user => {
    let token = user.generateToken();
    res.json(token);
  });
});

router.get('/users/:id', bearerAuth, (req, res) => {
  delete req.user.password;
  res.json(req.user);
});

router.put('/users/:id', jsonParser, bearerAuth, (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
  .then(user => {
    res.json(user);
  })
  .catch(() => {
    console.log('what the heck');
    res.status(400).json({msg: 'Bad Request'});
  });
});

router.delete('/users/:id', bearerAuth, (req, res) => {
  User.findByIdAndRemove(req.params.id)
  .then(user => {
    res.json(user);
  })
  .catch(() => {
    res.status(404).json({msg: 'Not Found'});
  });
});

module.exports = router;