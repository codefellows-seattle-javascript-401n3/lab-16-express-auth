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
        .find({username: decoded.user})
        .select({password: 0})
        .then(user => {
          if (!user.length) return next(createError(401, 'Token Authentication Error!'))
          req.user = user
          next()
        })
        .catch(next)
    })
    .catch(next)


}
