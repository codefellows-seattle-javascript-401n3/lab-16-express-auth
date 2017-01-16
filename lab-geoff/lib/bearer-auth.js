'use strict';
let jwt = require('jsonwebtoken');
let User = require('../model/model.js');

module.exports = (req, res, next) => {
  let [method, token] = req.headers.authorization.split(' ');
  console.log(method);
  console.log(token);
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.SECRET || 'DEV');
    console.log('decoded');
    console.log(decoded);
  }
  catch(e) {
    //return Authorization Error response
    console.log('error with jwt.verify');
  }
  User.findById(decoded.id)
  .then(user => {
    // remove password from user
    console.log('bearerAuth');
    req.user = user;
    next();
  })
  .catch(e => {
    console.error(e);
    //return Authorization Error response
  });
};