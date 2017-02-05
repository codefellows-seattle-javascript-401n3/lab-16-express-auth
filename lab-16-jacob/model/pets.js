'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let petSchema = Schema ({
  _id: {type: String, unique: true},
  animal: {type: String, required: true},
  owner: {type: String, ref: 'user'}
});

module.exports = mongoose.model('pets', petSchema);
