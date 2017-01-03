'use strict'

let mongoose = require('mongoose')
let bcrypt = require('bcrypt')

let userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true}
  password: {type: String} // THIS IS BAD FORM ONLY FOR DEMO!!!!!
})
//do not use arrow function
userSchema.methods.hashPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.has(password, 10, (err, hash) => {
      if (err) return reject(err)
      this.password = hash
      resolve(this)
    })
  })
}

module.exports = mongoose.model('user', userSchema)
