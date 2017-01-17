'use strict'

const User = require('../model/user')
const bearerAuth = require('../lib/bearer-authentication')
const basicAuth = require('../lib/basic-authentication')
const jsonParser = require('body-parser').json()
const createError = require('http-errors')


module.exports = (router) => {

  router.get('/', (req, res) => {
    res.json({msg: 'this is Dan\'s authentication app!'})
  })

  router.post('/register', jsonParser, (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      return next(createError(400, 'Bad request'))
    }
    if (req.body.username.toLowerCase() === 'admin') {
      return next(createError(400, 'Invalid username selected'))
    }
    let newUser = new User(req.body)
    newUser
      .hashAndStorePassword(newUser.password)
      .then(user => {
        user
          .save()
          .then(user => {
            user.password = undefined
            res.json(user)
          })
          .catch(next)
      })
      .catch(next)
  })

  router.post('/login', basicAuth, (req, res, next) => {
    req.user
      .generateToken()
      .then(token => res.json({token: token}))
      .catch(next)
  })

  router.get('/users', bearerAuth, (req, res, next) => {
    if(req.user.username.toLowerCase() === 'admin') {
      console.log('returning admin level details')
      User
      .find()
      .select({password: 0})
      .then(users => res.json(users))
      .catch(next)
    } else if (req.user) {
      console.log('returning just the user')
      res.json(req.user)
    } else {
      next(createError(403, 'Unauthorized'))
    }
  })

  router.get('/users/:user', bearerAuth, (req, res, next) => {
    if (req.user.username !== req.params.user && req.user.username !== 'Admin') {
      return next(createError(403, 'Unauthorized'))
    }
    User
      .find({username: req.params.user})
      .select({password: 0})
      .then(user => res.json(user))
      .catch(next)
  })
}
