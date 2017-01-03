'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, require: true, unique: true},
  password: {type: String, required: true},
  // findHash: {type: String, required: true}
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
      if (!result) return reject(new Error('Wrong Password'));
      resolve(this);
    });
  });
};

module.exports = mongoose.model('user', userSchema);
