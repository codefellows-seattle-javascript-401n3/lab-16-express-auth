'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let devKey = 'dev'

let userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
}, {timestamp: true})

// DO NOT USE AN ARROW FUNCTION ON MONOGOOSE MODELS
userSchema.methods.hashAndStorePassword = function(password) {
  // the hashing process is async
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if(err) return reject(err)
      this.password = hash
      resolve(this)
    })
  })
}

userSchema.methods.hashAndComparePassword = function(password) {
  return bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function () {
  return new Promise((resolve, reject) => {
    let payload = {
      user: this.username
    }
    jwt.sign(payload, process.env.SECRET || devKey, { expiresIn: '1d' }, (err, token) => {
      if (err) return reject(err)
      resolve(token)
    })
  })
}

userSchema.statics.verifyToken = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET || devKey, (err, decoded) => {
      if (err) return reject(err)
      resolve(decoded)
    })
  })
}

module.exports = mongoose.model('user', userSchema)
