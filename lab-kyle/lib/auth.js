'use strict'

let User = require('../model/user')

module.exports = (req, res, next) => {
  let auth = req.headers.authoriztion

  if (!auth) {
    // throw error
  }

  let base64String = auth.split('Basic')[1]

  let [username, password] = new Buffer(base64String, 'base64').toString().split(':')

  User.findOne({username: username})
    .then(user => {
      if(user.password == password) {
        console.log('logged in')
        next()
      } else {
        res.json({msg: 'Wrong Password'})
      }
    })
    .catch(/*error 'user not found' here*/)
}
