let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let createError = require('http-errors');
let jwt = require('jsonwebtoken');

let userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  guitar: [{type: mongoose.Schema.ObjectId, ref: 'guitars'}],
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

userSchema.methods.comparePasswords = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, result) => {
      if(err) return reject(err);
      if(!result) return reject(createError(401, 'Wrong Password'));
      resolve(this);
    });
  });
};

userSchema.methods.generateToken = function(password) {
  return jwt.sign({id: this._id}, process.env.SECRET || 'DEV');
};

module.exports = mongoose.model('user', userSchema);
