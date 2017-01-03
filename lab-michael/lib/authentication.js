let User = require('../model/user');

module.exports = (req, res, next) => {
  let auth = req.headers.authorization;
  console.log(auth);
  if (!auth) {
    // throw error
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
    .then(user => {
      console.log(user);
      return user.comparePasswordHash(password);
    })
    .then(() => next())
    .catch(err => res.send(err.message));
      // if (user.password == password) {
      //   console.log(user.password);
      //   console.log(password);
      //   console.log('logged in');
};
