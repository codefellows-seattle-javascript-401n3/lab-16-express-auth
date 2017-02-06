'use strict'; 

const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const User = require('../model/user.js');

module.exports = function(req, res, next){
  let authHeader = req.headers.authorization;
  if (!authHeader)
    return next(createError(401, 'requires auth header'));
  let token = authHeader.split('Bearer ')[1];
  if (!token)
    return next(createError(401, 'requires token'));
  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    if (err) return next(err);
    User.findOne({findHash: decoded.token})
    .then( user => {
      req.user = user;
      next();
    })
    .catch(err => {
      next(createError(401, err.message));
    });
  });
};
