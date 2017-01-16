'use strict'

const User = require('../model/user')
const createError = require('http-errors')


module.exports = (req, res, next) => {
  let [method, token] = req.headers.authorization.split(' ')

  if (method.toLowerCase() !== 'bearer') {
    // TODO handle as required
    next(createError(401, 'Invalid Authentication'))
  }

  User
    .verifyToken(token)
    .then(decoded => {
      if(!decoded) {
        next(createError(401, 'Token Authentication Error!'))
      }
      console.log('decoded =', decoded)
      User
        .find({username: decoded.user})
        .select({password: 0})
        .then(user => {
          if (!user.length) return next(createError(401, 'Token Authentication Error!'))
          console.log('found user!', user)
          req.user = user
          next()
        })
        .catch(next)
    })
    .catch(next)


}
