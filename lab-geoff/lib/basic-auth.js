'use strict';
let User = require('../model/model.js');

module.exports = (req, res, next) => {
  let auth = req.headers.authorization;
  if(!auth) {
    res.json({msg:'authentication headers needed'});
  }
  let base64String = auth.split('Basic')[1];
  let [userName, passWord] = new Buffer(base64String, 'base64').toString().split(':');
  User.findOne({username: userName})
  .then(user => {
    console.log('about to compare passwords');
    user.comparePass(passWord);
  })
  .then(()=> {
    console.log('logged in');
    next();
  })
  .catch(()=> {
    console.log('not logged in');
  });
};