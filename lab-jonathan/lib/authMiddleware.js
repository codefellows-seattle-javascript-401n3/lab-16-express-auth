let User = require('../model/model');
let createError = require('http-errors');


module.exports = (req, res, next) => {
  let auth = req.headers.authorization;
  if(!auth){
    return next(createError(401, 'there is no auth'));
  }
  let base64String = auth.split('Basic ')[1];
  let [username, password] = new Buffer(base64String, 'base64').toString().split(':');

  User.findOne({username: username})
  .then(user => {
    if (!user){
      return next(createError(404, 'user not found'));
    }
    if(req.params.id == user._id) {
      return user.comparePasswords(password);
    }
    return Promise.reject(createError(401, 'Not authorized'));
  })
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => next(err));
};
