'use strict';
let jwt = require('jsonwebtoken');
let User = require('../model/models.js');

module.exports = (req, res, next) => {
  let [method, token] = req.headers.authorization.split(' ');
  let decoded = null;
  //if method !== 'bearer' do this {-------------};
  try {
    decoded = jwt.verify(token, process.env.SECRET || 'DEV');
  }
  catch(e) {
    //return Authorization Error response
  }
  User.findById(decoded._id)
  .then(user => {
    // remove password from user
    req.user = user;
    next();
  })
  .catch(e => {
    console.error(e);
    //return Authorization Error response
  });
};