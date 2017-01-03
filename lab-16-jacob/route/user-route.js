let authMiddleWare = require('../lib/authentication');
let User = require('../model/user');
//let express = require('express');
let jsonParser = require('body-parser').json();
//let app = express();


module.exports = (router) => {
  router.post('/users', jsonParser, (req, res) => {
    let user = new User(req.body);
    user.hashPassword(user.password)
    .then(user => {
      user.save(); //saves with hashed password into DB
      res.json(user);
    });
  });
  router.get('/users/:id', authMiddleWare, (req, res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
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
  // router.post('/login', (req, res) => {
  // });
};

// app.post('/login', function(req, res) {
//   console.log('hello');
// });
