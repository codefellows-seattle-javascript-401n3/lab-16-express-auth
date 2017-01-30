'use strict';
let bcrypt = require('bcrypt');
let User = require('../model/user');

new User({
  username: 'Edwin',
  password: bcrypt.hashSync('soSecure', 10),
  email: 'edwin@netscape.com'
}).save();

new User({
  username: 'Bert',
  password: bcrypt.hashSync('stillSecure', 10),
  email: 'bert@msn.com'
}).save();
