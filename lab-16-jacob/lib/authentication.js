'use strict';

let User = require('../model/user'); //basic auth middleware

module.exports = (req, res, next) => {
  let headers = req.headers;
  let auth = req.headers.authorization;
  if(!auth) {
    res.status(400).end('needs auth');
  }
  let base64String = auth.split('Basic ')[1];
  let [username, password] = new Buffer(base64String, 'base64').toString().split(':');
  User.findOne({username: username})
    .then(user => {
      return user.comparePasswordHash(password)
      .then((user) => {
        req.user = user; //this will give the req.user property to the object that is returned from this middleware
        next();
      })
      .catch(function() {
        res.status(401).end('wrong password');
      });
    })
    .catch(function(err) {
      console.log(err);
      if(err) {
        res.status(400).end(err.message);
      }
    });
};
