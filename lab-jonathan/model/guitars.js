let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let createError = require('http-errors');

let User = require('./users.js');

let guitarSchema = Schema({
  make: {type: String, required: true},
  model: {type: String, required: true},
  listID: {type: Schema.Types.ObjectId, ref: 'users'},
});

let Guitar = module.exports = mongoose.model('guitars', guitarSchema);
