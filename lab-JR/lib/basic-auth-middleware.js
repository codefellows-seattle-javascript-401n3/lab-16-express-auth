'use strict';

const User = require('../model/user');
const createError = require('http-errors');

module.exports = (req, res, next) => {
  let auth = req.headers.authorization;//this is the authorization the user curls in.
  console.log(auth);
  if(!auth) {
    return next(createError(400, 'invalid authorization header'));
  }
  let base64string = auth.split('Basic')[1];
  let authBuffer = new Buffer(base64string, 'base64');
  let authString = authBuffer.toString();
  let credentials = authString.split(':');
  let usernameUnbased = credentials[0];
  let passwordUnbased = credentials[1];

  User.findOne({username : usernameUnbased})//returns user object in promise
  .then(user => {
    user.comparePasswordHash(passwordUnbased); //passing plaintext password into our userSchema method that checks the db against a plaintext pw
  })
  .then(() => next());
};
