let User = require('../model/model');
let createError = require('http-errors');


module.exports = (req, res, next) => {
  let auth = req.headers.authorization;
  console.log(auth);
  if(!auth){
    console.error('there is no auth');
  }
  let base64String = auth.split('Basic')[1];
  let [username, password] = new Buffer(base64String, 'base64').toString().split(':');

  User.findOne({username: username})
  .then(user => {
    console.log(user);
    if(user.password == password) {
      console.log(user.password);
      console.log(password);
      console.log('logged in');
      next();
    }
    else{
      res.json({msg: 'wrong password'});
    }
    // user.hashPassword(password)
    // if(user.password == password){
    // }
    // else{
    //   //error wrong password
    // }
  })
  .catch(err => next(createError(404, 'Not Found')));

};




// curl -u charlie:password1234 -X POST http://localhost/9000/login   the -u automatically does the encoding for you.
