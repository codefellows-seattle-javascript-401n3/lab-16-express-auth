let jwt = require('jsonwebtoken');
let User = require('../model/user');

module.exports = (req, res, next) => {
  let [method, token] = req.headers.authorization.split(' ');
  if(method.toLowerCase() !== 'bearer') {
    //handle as reuqired for your domain
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
  .catch(e =>  {
    console.log('catch 2');
    res.json({msg: 'Authentication error'});
  });
};
