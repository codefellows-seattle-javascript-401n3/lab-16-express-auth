'use strict';

const Router = require('express').Router;

// app modules
const User = require('../models/user.js');
const bearerAuth = require('../lib/bearer-authentication.js');

const router = module.exports = new Router();

router.get('/users', bearerAuth, (req, res) => {
  if (req.user) {
    req.user.password = null;
    return res.json(req.user);
  }
  User.find({}).then(users => res.json(users));
});
