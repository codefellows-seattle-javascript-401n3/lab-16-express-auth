let jwt = require('jsonwebtoken');
let User = require('../models/user');

module.exports = (req, res, next) => {
  console.log(req.headers);
  let [method, token] = req.headers.authorization.split(' ');
  // debugger

  if (method !== 'bearer') {
    // handle as required for your domain
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.SECRET || 'DEV');
  }
  catch (e) {
    console.log('catch one');
    console.log(e);
    return res.status(401).json({msg: 'Authentication error'});
  }
  User.findById(decoded.id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(e => {
      console.log('catch 2');
      res.json({msg: 'Authentication error'});
    });
};