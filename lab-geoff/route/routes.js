'use strict';

let jsonParser = require('body-parser').json();
let User = require('../model/model.js');
let auth = require('../lib/auth.js');
let Router = require('express').Router;
let router = new Router();

router.post('/users', jsonParser, (req, res) => {
  console.log('/users');
  console.log(req.body);
  let body = req.body;
  console.log(body);
  let user = new User(body);
  console.log(user.password);
  user.hashPass(user.password)
    .then(user => user.save())
    .then(user => res.json({user: user.username, id: user._id}))
    .catch();
  // .then(user => {
  //   user.save(err => {
  //     if(err) {
  //       console.log('save error');
  //       res.status(400);
  //       res.end();
  //     }
  //     // if(err) res.sendStatus(400);
  //     // console.error(err);
  //   });
  // })
  // .then((user) => {
  //   res.json(user.username);
  // })
  // .catch(err => {
  //   console.error(err);
  //   res.sendStatus(400);
  // });
});
router.get('/users/:id', auth, function(req, res) {
  console.log('/users/:id');
  User.findById(req.params.id)
  .then(user => {
    res.json(user);
  })
  .catch();
});

module.exports = router;