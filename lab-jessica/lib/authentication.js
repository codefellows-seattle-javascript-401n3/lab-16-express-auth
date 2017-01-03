'use strict';

const User = require('../models/user.js');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;

  if(!auth) throw new Error('authroization headers expected');

  const base64String = auth.split('Basic ')[1];
  const [username, password] = new Buffer(base64String, 'base64').toString().split(':');

  User.findOne({username: username})
    .then(user => {
      return user.comparePasswords(password);
    })
    .then(user => {
      res.json({username: user.username, email: user.email});
      next();
    })
    .catch(err => {
      console.error(err);
    });
      // if(user.password === password) {
      //   console.log('WE ARE NOW LOGGED IN' + '\n');
      //   req.user = user;
      //   next();
      // } else {
      //   // console.log('DB users\'s password', user.passord);
      //   // console.log('provided password', password);
      //   res.send('Wrong Password' + '\n');
      // }
    // });
    // .catch(err => {
    //   console.error(err);
    //   res.send('Could not find user' + '\n');
    // });
};
