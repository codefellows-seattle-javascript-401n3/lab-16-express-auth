'use strict'

let User = require('../model/user')
let authMiddleware = require('../lib/auth')
let jsonParser = require('bode-parser').json()

module.exports = (router) => {

  router.post('/users', jsonParser, (req, res) => {
    let user = new User(req.body)
    user.hashPassword(user.password)
      .then(user => user.save())
      .then(user => res.json(user))
      .catch(/*throw error here*/)
  })

  router.get('/users/id', (req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(/*throw error here*/)
  })
}
