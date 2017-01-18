'use strict';
let basicAuth = require('../lib/authentication.js');
//here we have authenticated the user now we need a token
module.exports = (router) => {
  router.post('/login', basicAuth, (req, res) => {
    res.json(user.generateToken); //TODO stuff i did not hear/see
  });
};
