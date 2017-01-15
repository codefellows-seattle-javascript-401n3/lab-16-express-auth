const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

module.exports = (req, res, next) => {
  console.log(req.headers.authorization);
  let [method, token] = req.headers.authorization.split(' ');
  console.log(method);
  if(method.toLowerCase() !== 'bearer') {
      // handle as required for you domain
    res.send('not bearer');
    return;
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.SECRET || 'DEV');
  }
  catch (e) {
    return res.status(401).json({msg: 'Authentication Error'});
  }

  User.findById(decoded._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => res.json({msg: 'Authentication Error from Bearer Middleware'}));
};
