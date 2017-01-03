//username(unique)
//password (hashed)
//e-mail(required)
'use strict';
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password:{type: String},
  email: {type: String, required: true}
});

userSchema.methods.hashPass = function(password) {
  bcrypt.hash(password, 16)
  .then(function(hash) {
    this.password = hash;
  })
  .catch(); //<---here
};

module.exports = mongoose.model('User', userSchema);