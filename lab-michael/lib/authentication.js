let createError = require('http-errors');
let User = require('../model/user');

module.exports = (req, res, next) => {
  let auth = req.headers.authorization;
  console.log(auth);
  if (!auth) {
    throw new Error('Authorization Headers needed');
  }
  // extracting the base64 encoded string
  let base64String = auth.split('Basic')[1];
  // fancy node shorthand
  let [username, password] = new Buffer(base64String, 'base64').toString().split(':');
  /* long form of what's going on above
  let tmpBuffer = new Buffer(base64String, 'base64')
  let tmpString = tmpBuffer.toString()
  let userNamePasswordArray = tmpString.split(':')
  let username = userNamePasswordArray[0]
  let password = userNamePasswordArray[1]
  */
  User.findOne({username: username})
  // console.log(username)
    .then(user => {
      if(!user) {
        return Promise.reject(createError(404, 'Error: User Not Found'));
      }
      if(req.params.id === user._id) {
        return user.comparePasswordHash(password);
      }
      return Promise.reject(createError(401, 'Error: User not Authorized'));
      // console.log(user);
    })
    .then(user => {
      req.user = user;
      next();
    })
    // .then(() => next())

    // .then(() => next())
    .catch(err => next(err));
    // .catch(err => res.send(err.message));
};
