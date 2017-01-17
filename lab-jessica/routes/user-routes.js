'use strict';

const Router = require('express').Router;

// app modules
const User = require('../models/user.js');
const bearerAuth = require('../lib/bearer-authentication.js');

const router = module.exports = new Router();

router.get('/users', bearerAuth, (req, res) => {
  if (req.user) {
    res.json({username: req.user.username, email: req.user.email, _id: req.user._id});
  } else {
    User.find({}).then(users => res.json(users));
  }
});
