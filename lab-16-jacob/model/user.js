'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let createError = require('http-errors');
let jwt = require('jsonwebtoken');

let userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true}
});

//new way to set proper methods
//DON'T USE ARROW FUNCTION
userSchema.methods.hashPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};

userSchema.methods.comparePasswordHash = function(password) {
  return new Promise ((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if (err) return reject(err);
      if(!valid) return reject(createError(401, 'wrong password http error'));
      resolve(this);
    });
  });
};

userSchema.methods.generateToken = function(password) {
  //TODO: promisify this function here
  return jwt.sign({id: this._id}, process.env.SECRET || 'DEV'); //signature computed based on header and payload.
}; //first param: payload, second: secret, third: options.

module.exports = mongoose.model('user', userSchema);
