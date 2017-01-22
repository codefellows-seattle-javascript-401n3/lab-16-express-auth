'use strict'

const User = require('../model/user')
const createError = require('http-errors')


module.exports = (req, res, next) => {
  let [method, token] = req.headers.authorization.split(' ')

  if (method.toLowerCase() !== 'bearer') {
    next(createError(401, 'Invalid Authentication'))
  }

  User
    .verifyToken(token)
    .then(decoded => {
      if(!decoded) {
        next(createError(401, 'Token Authentication Error!'))
      }
      User
        .findOne({username: decoded.user})
        .select({password: 0})
        .then(user => {
          if(!user) return next(createError(403, 'Unauthorized'))
          req.user = user
          next()
        })
        .catch(next)
    })
    .catch(next)


}
