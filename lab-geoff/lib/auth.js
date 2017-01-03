'use strict';
let User = require('../model/model.js');

module.exports = (req, res, next) => {
  let auth = req.headers.authorization;
  if(!auth) {
    //error stuff
  }
  let base64 = auth.split('Basic')[1];
  let [username, password] = new Buffer(base64, 'base64').toString.split(':');
  User.findOne({username: username})
  .then(user => {
    if(user.password === password) {
      console.log('logged in');
      next();
    } else {
      res.json({msg:'incorrect password'});
    }
  })
  .catch(err => {
    //error stuff
  });
};