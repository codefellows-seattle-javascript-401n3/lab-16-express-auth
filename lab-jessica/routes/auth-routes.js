'use strict';

const Router = require('express').Router;
const basicAuth = require('../lib/basic-authentication.js');


const router = module.exports = new Router();

router.post('/login', basicAuth, (req, res) => {
  req.user.generateToken()
    .then(token => res.json(token))
    .catch(err => console.error(err));
});
