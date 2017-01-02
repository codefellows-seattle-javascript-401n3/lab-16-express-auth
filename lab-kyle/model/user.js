'use strict'

let mongoose = require('mongoose')
let bcrypt = require('bcrypt')

let Schema = mongoose.Schema

let userSchema = Schema({
  email: String,
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true} //need to hash password before saving
})

userSchema.methods.hashPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(err)
      this.password = hash
      resolve(this)
    })
  })
}
module.exports = mongoose.model('user', userSchema)
