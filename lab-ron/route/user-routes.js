'use strict'
let User = require('../model/user')
let authMiddlewear = require('../lib/authentication')
let jsonParser = require('body-parser').json()

module.exports = (router) =>  {
  router.post('/users', jsonParser, (req, res) => {
    let user = new User(req, body)
    user.hashPassword(user.password)
      .then(user => user.save()
      .then(user => res.json(user)
      .catch()
      })
    // .catch(/*throw error*/)
  })

  router.get('/users/:id', authMiddlewear, (req, res) => {
    User.findById(id)
    .then(user => res.json(user))
    catch(/*throw error*/)
  })
//below create a new user
  // app.post('/signup', (req, res) => {
  //   User.create(req.body)
  //   .then(user => res.json(user))
  //   .catch()
  // })
}
