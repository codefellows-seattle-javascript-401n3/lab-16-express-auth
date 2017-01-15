'use strict';
let jwt = require('jsonwebtoken');
let User = require('../model/user.js');
let createError = require('http-errors');

module.exports = (req, res, next) => {
  let [method, token] = req.headers.authorization.split(' ');
  if(method !== 'bearer') {
    //handle as required for your domain
  }
  let decoded = null; //where we will store the value of the id
  try{
    decoded = jwt.verify(token, process.env.SECRET || 'DEV');
  }
  catch(e) {
    return res.status(401).json({msg: 'Authentication error'});
  }
  User.findById(decoded._id)
  .then(user => {
    req.user = user;
    next();
  })
   .catch(err => next(createError(404, 'not found.')));
};
