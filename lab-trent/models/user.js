const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password'))
    return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

userSchema.methods.checkPass = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, matches) {
    if (err) return callback(err);
    callback(null, matches);
  });
};

module.exports = mongoose.model('users', userSchema);
