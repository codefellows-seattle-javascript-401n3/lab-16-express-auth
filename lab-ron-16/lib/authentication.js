'use strict';

let User = require('../models/user.js');

module.exports = (req, res, next) => {
  let auth = req.headers.authorization;
  console.log('auth: ', auth);
  if(!auth) {
    res.json({msg: 'Error, no authorization...'});
  }

  let base64String = auth.split('Basic')[1];
  let [username, password] = new Buffer(base64String, 'base64').toString().split(':');
  console.log(username);
  console.log(password);

  User.find({username: username})
    .then(user => {
      if (user.password == password) {
        console.log('logged in...');
        // req.user = user;
        next();
      }
      else{
        (err => res.json({message: 'wrong password...'}));
        //LOG IN
      }
      next();
    })
    .catch(err => res.json({message: 'Password Required...'}));
};
