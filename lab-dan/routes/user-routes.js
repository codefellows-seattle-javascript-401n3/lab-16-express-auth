const User = require('../model/user')
const authentication = require('../lib/authentication')
const jsonParser = require('body-parser').json()
const createError = require('http-errors')


module.exports = (router) => {

  router.get('/', (req, res) => {
    res.json({msg: 'this is Dan\'s authentication app!'})
  })

  router.post('/users', jsonParser, (req, res, next) => {
    if (!req.username || !req.password) {
      next(createError(400, 'Bad request'))
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
      })
      .catch(next)
  })

  router.get('/users', authentication, (req, res, next) => {
    if(req.user.username === 'Admin') {
      User
      .find()
      .select({password: 0})
      .then(users => res.json(users))
      .catch(next)
    } else {
      next(createError(401, 'Invalid username or password'))
    }
  })

  router.get('/users/:user', authentication, (req, res, next) => {
    if (req.user.username != req.params.user) {
      return next(createError(403, 'Unauthorized'))
    }
    User
      .find({username: req.params.user})
      .select({password: 0})
      .then(user => res.json(user))
      .catch(next)
  })
  // create a new user
  // router.post('/signup', (req, res, next) => {
  //   User
  //     .create(req.body)
  //     .then(user => {
  //       res.json(user)
  //     })
  //     .catch(next)
  // })
  //
  // router.login('/login', (req, res, next) => {
  //
  // })
}
