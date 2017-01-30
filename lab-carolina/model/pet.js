'use strict';

const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
  name: {type: String, required: true},
  breed: {type: String, required: true},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model('pet', petSchema);
