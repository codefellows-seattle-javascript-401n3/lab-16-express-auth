'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = Schema({
  class: {type: String, required: true},
  classCode: {type: String, require: true},
  userID: {type: Schema.Types.ObjectId, ref: 'user'}
});

module.exports = mongoose.model('class', classSchema);
