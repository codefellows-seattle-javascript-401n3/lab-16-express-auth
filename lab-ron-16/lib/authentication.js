'use strict';
let createError = require('http-errors');
let User = require('../models/user.js');

module.exports = (req, res, next) => {
  let auth = req.headers.authorization;
  if(!auth) {
    res.json({msg: 'Error, no authorization...'});
  }

  let base64String = auth.split('Basic')[1];
  let [username, password] = new Buffer(base64String, 'base64').toString().split(':');

  User.find({username: username})
    .then(user => {
      if (req.params.id == user._id) {
        return user.comparePasswords(password);
      } else {
        (err => res.json({message: 'wrong password...'}));
      }
      next();
    })
    .catch(err => res.json({message: 'Password Required...'}));
};
