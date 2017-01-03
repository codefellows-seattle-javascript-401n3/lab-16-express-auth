'use strict';

let jsonParser = require('body-parser').json();
let User = require('../model/model.js');
let auth = require('../lib/auth.js');
let Router = require('express').Router;
let router = new Router();

router.post('/users', jsonParser, function(req, res) {
  console.log('/users');
  console.log(req.body);
  let user = new User(req.body);
  console.log(user.password);
  user.hashPass(user.password)
  .then(user => {
    user.save(err => {
      // if(err) res.sendStatus(400);
      // console.error(err);
    });
  })
  .then(() => {
    res.json(user.username);
  })
  .catch(err => {
    console.error(err);
    res.sendStatus(400);
  });
});
router.get('/users/:id', function(req, res) {
  console.log('/users/:id');
  User.findById(req.params.id, (err, user) => {
    if(err) {
      //not found
    }
    user;
  });
  res.end();
});

module.exports = router;