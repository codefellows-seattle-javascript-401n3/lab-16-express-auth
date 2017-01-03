'use strict'

let mongoose = require('mongoose')
let bcrypt = require('bcrypt')
let createError = require('http-errors')

let Schema = mongoose.Schema

let userSchema = Schema({
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

userSchema.methods.comparePasswordHash = function(password){
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if (err) return reject(err) // 500 error bcrypt failed
      if (!valid) return reject(createError(401, 'wrong password'))
      resolve(this)
    })
  })
}

module.exports = mongoose.model('user', userSchema)
