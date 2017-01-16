const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

module.exports = (req, res, next) => {
  let [method, token] = req.headers.authorization.split(' ');

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

  User.findById(decoded.id)
    .populate('courses')
    .exec( (err, user) => {
      if (err) throw Error;
      req.user = user;
      next();
    })
    .catch(err => {
      console.error(err);
      res.json({msg: 'Authentication Error from Bearer Middleware'});
    });
};
