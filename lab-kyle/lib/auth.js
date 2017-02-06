'use strict'

let User = require('../model/user')
let createError = require('http-errors')

module.exports = (req, res, next) => {
  let auth = req.headers.authorization

  if (!auth) {
    res.send('no authorization headers set')
  }

  let base64String = auth.split('Basic')[1]

  let [username, password] = new Buffer(base64String, 'base64').toString().split(':')

  User.findOne({username})
    .then(user => {
      if(!user) {
        return next(createError(404, 'invalid username in headers'))
      }
      req.user = user
      return user
    })
    .then(user => user.comparePasswordHash(password))
    .then(() => next())
    .catch(err => res.status(err.status).send(err.message))
}
