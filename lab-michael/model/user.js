'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let createError = require('http-errors');
let jwt = require('jsonwebtoken');


let userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}, // THIS IS OMGWTFBBQ TERRIBLE
  email: {type: String, required: true, unique:true}
});

// DO NOT USE AN ARROW FUNCTION HERE
userSchema.methods.hashPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};
userSchema.methods.comparePasswordHash = function(password){
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if (err) return reject(err); // 500 error bcrypt failed
      if (!valid) return reject(createError(401, 'wrong password'));
      resolve(this);
    });
  });
};
userSchema.methods.generateToken = function(password) {
  return new Promise((resolve, reject) => {
    jwt.sign({id: this._id}, process.env.SECRET || 'DEV', (err, token) => {
      if (err) return reject(err);
      if (!token) return reject(createError(401, 'need token'));
      resolve(this);
    });
  });
  /* Can be promisified. After class work
  jwt.sign({id: this._id}, process.env.SECRET || 'DEV', (token) => {
  })
  */
  // return jwt.sign({id: this._id}, process.env.SECRET || 'DEV');
};

module.exports = mongoose.model('user', userSchema);
