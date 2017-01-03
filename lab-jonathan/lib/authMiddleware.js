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
    let temp = user.hashPassword(password)
    .then(temp => {
      console.log('user.password', user.password);
      console.log('temp', temp.password);
      if(user.password == temp.password) {
        console.log('password', password);
        console.log('logged in');
        next();
      }
      else{
        console.log('in the else');
        console.log('user', user);
        console.log('user.password', user.password);
        res.json({msg: 'wrong password'});
      }
    });
  })
  .catch(console.log('error. could not find the user'));
};





// curl -u charlie:password1234 -X POST http://localhost/9000/login   the -u automatically does the encoding for you.
