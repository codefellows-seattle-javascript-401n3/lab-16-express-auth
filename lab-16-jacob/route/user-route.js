'use strict';

let bearerAuth = require('../lib/bearer-auth');
// let authMiddleWare = require('../lib/authentication');
let User = require('../model/user');
let jsonParser = require('body-parser').json();


module.exports = (router) => {
  router.post('/signup', jsonParser, (req, res) => {
    let user = new User(req.body);
    user.hashPassword(user.password)
    .then(user => user.save())
    .then(user => user.generateToken())
    .then(token => res.json(token))
    .catch(() => {
      res.status(401).end('invalid body');
    });
  });
  router.get('/users', bearerAuth,  (req, res) => { //because of authMiddleWare being called, we will have the req.user property!
    User.findById(req.user._id)
    .then((user) => {
      res.json(user);
    })
    .catch(function(err) {
      if(err) {
        res.status(404).end('user not found');
      }
    });
  });
  router.put('/users/', bearerAuth, jsonParser, (req, res) => {
    User.findById(req.user._id)
    .then(function(user) {
      user.update((req.body), function(err) {
        if (err) {
          res.status(400).end('bad request');
        } else {
          res.status(200).json(user);
        }
      });
    })
    .catch(function(err) {
      if(err) {
        console.log(err);
        res.status(404).end('not found');
      }
    });
  });
  router.delete('/users', bearerAuth, (req, res) => {
    User.findById(req.user._id)
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
