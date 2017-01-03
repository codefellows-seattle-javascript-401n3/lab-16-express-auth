let User = require('../model/user'); //basic auth middleware

module.exports = (req, res, next) => {
  let auth = req.headers.authorization;
  if(!auth) {
    res.status(400).end('needs auth');
  }
  let base64String = auth.split('Basic ')[1];
  let [username, password] = new Buffer(base64String, 'base64').toString().split(':');
  User.findOne({username: username})
    .then(user => {
      user.comparePasswordHash(password)
      .catch(function(err) {
        res.end('wrong password');
      })
      .then(next());
    })
    .catch(function(err) {
      console.log(err);
      if(err) {
        res.status(400).end(err.message);
      }
    });
};


//
