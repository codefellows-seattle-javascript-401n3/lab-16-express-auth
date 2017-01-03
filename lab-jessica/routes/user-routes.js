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

// * `GET` request
//  * the client should pass the username and password to the server using a _Basic_ auth header (Note: curl -u username:password is a shorthand for this)
//  * the server should respond with json describing the user
//  * the response should *NOT* include the users cleartext password nor should it include the hashed version of the password
//  * the server should respond with a 401 Unauthorized to non authenticated users
//  * (Extra credit) In addition to authenticating the user, make it so that a user can only GET their own user account info. (i.e. GET /users/15 should
//    only work if the credentials for user 15 are included in the header)
router.get('/users', authMiddleware, (req, res) => {
  console.log('from routes', req.headers.authorization);
  console.log('req.user', req.body.user);
  res.end();
});
