'use strict';

let authMiddleWare = require('../lib/authentication');
let User = require('../model/user');
let jsonParser = require('body-parser').json();
//let createError = require('http-errors');


module.exports = (router) => {
  router.post('/users', jsonParser, (req, res) => {
    let user = new User(req.body);
    user.hashPassword(user.password)
    .then(user => {
      user.save(); //saves with hashed password into DB
      res.json({username: user.username, id: user._id});
    })
    .catch(() => {
      res.status(401).end('invalid body');
    });
  });
  router.get('/users/:id', authMiddleWare,  (req, res) => {
    User.findById(req.params.id)
    .then((user) => {
      res.send(`${user.username} is logged in`);
    })
    .catch(() => res.status(404).end('not found'));
  });
  router.delete('/users/:id', authMiddleWare, (req, res) => {
    User.findById(req.params.id)
    .then((user) => {
      user.remove({_id: user._id}, function(err) {
        if(err) {
          res.status(404).end('not found');
        }
        res.status(204).end();
      });
    })
    .catch(function(err) {
      if(err) {
        res.status(404).end('user not found');
      }
    });
  });
};
