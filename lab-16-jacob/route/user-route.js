'use strict';

let bearerAuth = require('../lib/bearer-auth')
let authMiddleWare = require('../lib/authentication');
let User = require('../model/user');
let jsonParser = require('body-parser').json();


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
  router.get('/users', bearerAuth,  (req, res) => { //because of authMiddleWare being called, we will have the req.user property!
    if(req.user) { //token will dictate what user you're looking up
      delete req.user.password;
      res.json(req.user);
    }
    else {
      User.find({}).then(users => res.json(users));
    }
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

//context of the request
//why in req.headers
//why in req.body
