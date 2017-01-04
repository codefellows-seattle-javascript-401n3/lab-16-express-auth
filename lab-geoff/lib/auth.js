'use strict';
let User = require('../model/model.js');

module.exports = (req, res, next) => {
  console.log(req.headers);
  let auth = req.headers.authorization;
  console.log(auth);
  if(!auth) {
    //error stuff
    res.json({msg:'authentication headers needed'});
  }
  let base64String = auth.split('Basic')[1];
  console.log(base64String);
  let [userName, passWord] = new Buffer(base64String, 'base64').toString().split(':');
  console.log(userName);
  console.log(passWord);
  User.findOne({username: userName})
  .then(user => {
    console.log(user);
    // console.log(passWord);
    if(user.password == passWord) {
      console.log('logged in');
      next();
    } else {
      res.json({msg:'incorrect password'});
    }
  })
  .catch();
};