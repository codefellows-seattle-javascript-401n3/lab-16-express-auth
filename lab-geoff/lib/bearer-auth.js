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
    console.log('error with jwt.verify');
    return res.status(401).json({msg: 'unauthorized'});////
  }
  User.findById(decoded.id)
  .then(user => {
    console.log('bearerAuth');
    req.user = user;
    delete req.user.password;
    next();
  })
  .catch(e => {
    console.error(e);
    return res.status(404).json({msg: 'not found'});
  });
};