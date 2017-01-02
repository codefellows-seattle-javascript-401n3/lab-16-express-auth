'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = Schema({
  email: String,
  username: {type: String, unique: true},
  password: String //hash password first
})

module.exports = mongoose.model('user', userSchema)
