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
      res.json(`${user.username} has been created`);
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
  router.post('/signup', (req, res) => {
    User.create(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(function(err) {
      if(err) {
        res.status(400).end('unable to post new user');
      }
    });
  });
  router.delete('/users:id', (req, res) => {
    User.findById(req.params.id)
    .then(function(user) {
      user.remove({_id: user._id}, function(err) {
        if(err) {
          res.status(404).end('not found');
          return;
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
