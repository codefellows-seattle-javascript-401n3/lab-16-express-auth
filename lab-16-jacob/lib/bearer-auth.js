let jwt = require('jsonwebtoken');
let User = require('../model/user');

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
    let [method, token] = req.headers.authorization.split(' ');  //split up the header
    if(method.toLowerCase() !== 'bearer') {
      res.status(400).end('needs proper auth'); //you've come too far!
    }
    let decoded  = null;
    try {
      decoded = jwt.verify(token, process.env.SECRET || 'DEV'); //inverse of jwt.sign
    }
    catch(e) {
      console.log('catch one');
      return res.status(401).json({msg: 'Authentication error'});
    }
    User.findById(decoded._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(() =>  {
      console.log('catch 2');
      res.json({msg: 'Authentication error'});
    });
  }
};
