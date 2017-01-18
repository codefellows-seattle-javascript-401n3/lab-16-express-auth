'use strict';

let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

module.exports = mongoose.model('user', userSchema);

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

// DO NOT USE AN ARROW FUNCTION HERE but this uses an arrow function
userSchema.methods.hashPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};
//The below code is for lab-17
userSchema.methods.comparePassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(this);
      }
    });
  });
};
//PAYLOAD AND SECRET below are placeholders, promisify the below code.
userSchema.methods.generateToken = function(password) {
  return jwt.sign({id: this._id}, process.env.SECRET || 'DEV', (token) );
};
