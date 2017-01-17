'use strict'

const User = require('../model/user')
const createError = require('http-errors')

module.exports = (req, res, next) => {
  // check if authorization is basic
  // decode the base64 string
  let [check, encodedAuthorization]  = req.headers.authorization.split(' ')
  if (check.toLowerCase() !== 'basic') return next(createError(401, 'Invalid authorization header'))
  // split the string to get values
  let [username, password] = new Buffer(encodedAuthorization, 'base64').toString().split(':')
  User
    .findOne({username: username})
    .then(user => {
      if(!user) {
        return next(createError(401, 'Invalid username or password'))
      }
      user.hashAndComparePassword(password)
        .then(result => {
          if(result) {
            req.user = user
            next()
            // 'log-in' and return token
            // user
            //   .generateToken()
            //   .then(token => res.json({token: token}))
            //   .catch(next)
          } else {
            next(createError(401, 'Invalid username or password'))
          }
        })
        .catch(next)
    })
    .catch(next)
}
