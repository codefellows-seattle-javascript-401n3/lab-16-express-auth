'use strict';
let bcrypt = require('bcrypt');
let User = require('../model/user');
let Pet = require('../model/pets');

new User({
  username: 'Edwin',
  password: bcrypt.hashSync('soSecure', 10),
  email: 'edwin@netscape.com'
}).save().then(function(user) {
  new Pet ({
    _id: '001',
    animal: 'dog',
    owner: user.username
  });
});


new User({
  username: 'Bert',
  password: bcrypt.hashSync('stillSecure', 10),
  email: 'bert@msn.com'
}).save().then(function(user) {
  new Pet ({
    _id: '002',
    animal: 'cat',
    owner: user.username
  });
});
