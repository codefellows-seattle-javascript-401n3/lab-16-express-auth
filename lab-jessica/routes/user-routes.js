'use strict';

const Router = require('express').Router;

// app modules
const User = require('../models/user.js');
const authMiddleware = require('../lib/authentication.js');

const router = module.exports = new Router();

router.post('/users', (req, res) => {
  const user = new User(req.body);

  user.hashPassword(user.password)
    .then(user => user.save())
    .then(user => res.json({username: user.username, email: user.email}))
    .catch(err => {
      console.error(err);
      res.status(400).send('bad request' + '\n');
    });
});

//  * the server should respond with a 401 Unauthorized to non authenticated users
router.get('/users/:id', authMiddleware, (req, res) => {
  console.log('from routes', req.headers.authorization);
  console.log('req.user', req.user);
  res.end();
});
