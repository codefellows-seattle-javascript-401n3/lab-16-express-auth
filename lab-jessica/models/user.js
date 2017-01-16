'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, require: true, unique: true},
  password: {type: String, required: true},
  courses: [{type: Schema.Types.ObjectId, ref: 'course'}]
});

userSchema.methods.hashPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};

userSchema.methods.comparePasswords = function(plainTextPass) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainTextPass, this.password, (err, result) => {
      if (err) return reject(err);
      if (!result) return reject(createError(401, 'Wrong Password'));
      resolve(this);
    });
  });
};

userSchema.methods.generateToken = function() {
  return Promise.resolve(jwt.sign({id: this._id}, process.env.SECRET || 'DEV'));
};

module.exports = mongoose.model('user', userSchema);
