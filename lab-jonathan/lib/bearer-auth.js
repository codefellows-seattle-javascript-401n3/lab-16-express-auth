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
    console.log('catch1');
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
    console.log('catch2')
    .catch(e => res.json({msg: 'authentication error'}));
};
