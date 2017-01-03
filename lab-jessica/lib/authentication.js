'use strict';

const User = require('../models/user.js');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;

  if(!auth) throw new Error('authroization headers expected');

  const base64String = auth.split('Basic ')[1];
  const [username, password] = new Buffer(base64String, 'base64').toString().split(':');

  User.findOne({username: username})
    .then(user => {
      if(user.password === password) {
        console.log('WE ARE NOW LOGGED IN');
        next();
      } else {
        res.send('Wrong Password');
      }
    })
    .catch(err => {
      console.error(err);
      res.send('Could not find user');
    });
};
