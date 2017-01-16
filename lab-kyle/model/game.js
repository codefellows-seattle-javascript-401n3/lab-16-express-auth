'use strict'

let mongoose = require('mongoose')

let Schema = mongoose.Schema

let gameSchema = Schema({
  name: {type: String, required: true},
  rating: {type: String, required: true},
  userID: null
})

module.exports = mongoose.model('game', gameSchema)
