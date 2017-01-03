let User = require('../model/user'); //basic auth middleware

module.exports = (req, res, next) => {
  let auth = req.headers.authorization;
  if(!auth) {
    res.status(400).end('needs auth');
  }
  let base64 = auth.split('basic ')[1];
  let [username, password] = new Buffer(base64, 'base64').toString().split(':');
  User.findOne({username: username})
    .then(user => {
      if (user.password == password) {
        console.log('logged in');
        req.user = user;
        next();
      }
      else {
        res.status(400).end('wrong password');
      }
    })
    .catch(function(err) {
      if(err) {
        res.status(400).end('bad request');
      }
    });
};


//
