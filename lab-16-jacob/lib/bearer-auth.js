let jwt = require('jsonwebtoken');
let User = require('../model/user');
let createError = require('http-errors');

module.exports = (req, res, next) => {
  if(!req.headers.authorization) { //non-authenticated route handling
    User.find({}).then(users => { //find all the users
      res.write('Here is a list of users:\n');
      users.forEach(function(individual) {
        res.write(`${individual.username} \n`); //write out all the users
      });
      res.end(); //gimme thems bonus point!
    }); //do not call next
  }
  else { //if there is an authorization header,
    let [method, token] = req.headers.authorization.split(' ');
    if(!token) return next(createError(401, 'token required'));

    if(method.toLowerCase() !== 'bearer') return next(createError(401, 'bearer authentication required'));

    jwt.verify(token, process.env.SECRET || 'DEV', (err, decoded) => {
      if(err) return next(err);

      User.findById(decoded.id)
        .then(user => {
          req.user = user;
          next();
        })
        .catch(err => {
          next(createError(401, err.message));
        });
    });
  }
};
