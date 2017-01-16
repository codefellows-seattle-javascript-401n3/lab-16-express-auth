let jwt = require('jsonwebtoken');
let User = require('../model/users');

module.exports = (req, res, next) => {
  let [method, token] = req.headers.authorization.split(' ');
  console.log('method', method);
  console.log('token', token);
  if(method !== 'Bearer') {
    return res.status(401).json({msg: 'you aint using bearer, man'})
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.SECRET || 'DEV');
  }
  catch (e) {
    return res.status(401).json({msg: 'authentication error'});
  }
  //adding authorization:
  User.findById(decoded.id)
    .populate('guitar')
    .exec((err, user) => {
      if(err) return res.status(404).sent('not found');
      req.user = user;
      next();
    })
    .catch(e => res.json({msg: 'authentication error'}));
};
