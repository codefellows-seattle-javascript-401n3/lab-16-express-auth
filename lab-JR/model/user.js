'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const createError = require('http-errors');

const userSchema = Schema({
  username: {type: String, required: true},
  // email: {type: String, required: true},
  password: {type: String, required: true},
});

userSchema.methods.hashPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if(err) return reject(err);
      this.password = hashedPassword;
      resolve(this);
    });
  });
};
//took this from slack verbatim to check plaintext pw vs database pw
userSchema.methods.comparePasswordHash = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {//"this" refers to the instance of userSchema (ie a user that is created with a username and a password)
      if (err) return reject(err); // 500 error bcrypt failed
      if (!valid) return reject(createError(401, 'wrong password'));
      resolve(this);//resolving user object that passed through the errors and has valid password that matches in both plaintext and saved db hashed password
    });
  });
};

module.exports = mongoose.model('user', userSchema);
