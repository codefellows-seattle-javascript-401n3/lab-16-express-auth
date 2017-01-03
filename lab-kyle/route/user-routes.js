'use strict'

let User = require('../model/user')
let authMiddleware = require('../lib/auth')
let jsonParser = require('body-parser').json()

module.exports = (router) => {

  router.post('/users', jsonParser, (req, res) => {
    let user = new User(req.body)
    user.hashPassword(user.password)
      .then(user => user.save())
      .then(user => res.json(user.username))
      .catch(() => res.status(400).send('invalid body'))
  })

  router.get('/users/:id', authMiddleware, (req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user.username))
      .catch(()=> res.status(404).send('not found'))
  })
}
