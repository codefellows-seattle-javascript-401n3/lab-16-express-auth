'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = Schema({
  course: {type: String, required: true},
  courseCode: {type: String, required: true},
  userID: {type: Schema.Types.ObjectId, ref: 'user'}
});

module.exports = mongoose.model('course', courseSchema);
