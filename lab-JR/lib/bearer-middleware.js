'use strict';

const jwt = require('jsonwebtoken');
const User = require('../model/user')
const createError = require('https-errors');

// module.exports = (req, res, next) => {
//   let decoded = null;
//
//   try {
//     decoded = jwt.verify(req.headers.token, process.env.SECRET || 'DEV')
//   } catch (e) {
//     return res.status(401).json({msg: 'authentication error'});
//   }
//   User.findById(decoded._id)
//   .then(user => {
//     req.user = user;
//     next();
//   })
//   .catch( e => res.json({msg: 'authentication error'}));
// };

module.exports = (req, res, next) => {
  let authHeader = req.headers.authorization;
  if(!authHeader)
    return next(createError(401, 'requires auth header'));
  if(!token)
    return next(createError(401, 'requires token'));
  let token = authHeader.split('Bearer ')[1]; //[0] is bearer, [1] is the token itself
  jwt.verify(token, process.env.SECRET || 'DEV', (err, decodedToken) => {
    if(err) return next(createError(500, 'server error'));
    User.findOne({findHashedToken: decodedToken})
    .then(user => {
      req.user = user;
      next();
    })
    .catch(() => {
      next(() => createError(401, 'token creation failed'));
    });
  });
};

// module.exports = function(req, res, next){
//   debug()
//   let authHeader = req.headers.authorization
//   if (!authHeader)
//     return next(createError(401, 'requires auth header'))
//   let token = authHeader.split('Bearer ')[1]
//   if (!token)
//     return next(createError(401, 'requires token'))
//   jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
//     if (err) return next(err) // 500 error
//     User.findOne({findHash: decoded.token})
//     .then( user => {
//       req.user = user
//       next()
//     })
//     .catch(err => {
//       next(createError(401, err.message))
//     })
//   })
// }
