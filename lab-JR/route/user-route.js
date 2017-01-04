'use strict';

const Router = require('express').Router;
const userRouter = module.exports = new Router();
const authHeader = require('../lib/auth-middleware');
const jsonParser = require('body-parser').json();
const User = require('../model/user');


//write get/post/delete/put routes that use errorHandler and authHeader as parameters.

userRouter.post('/users', jsonParser, (req, res) => {
  if(!req.body.username) {
    return res.status(400).send('no username');
  } if (!req.body.password) {
    return res.status(400).send('no password');
  }
  let user = new User(req.body);
  user.hashPassword(user.password)
  .then(user => user.save())
  .then(() => res.send('successful user sign up'))
  .catch(() => res.status(500).send('server error'));
});

userRouter.get('/users/:id', authHeader, (req, res) => {
  User.findById(req.params.id)
  .then(user => res.json({username: user.username, message: 'not sending password along with the user object'}))
  .catch(() => res.status(400).send('no matching entries in db'));
});
