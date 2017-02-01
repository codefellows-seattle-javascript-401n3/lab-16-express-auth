let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let createError = require('http-errors');

let userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true},
  password: {type: String, required: true}
});
// DO NOT USE AN ARROW FUNCTION HERE! but this uses an arrow function
userSchema.methods.hashPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};

userSchema.methods.comparePassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if (err) return reject(err);
      if (!valid) return reject(createError(401, 'incorrect password!'));
      resolve(this);
    });
  });
};

// userSchema.methods.generateToken = function(password) {
//   return jwt.sign({id: this._id}, process.env.SECRET || 'DEV', (token) );
// };

module.exports = mongoose.model('user', userSchema);
