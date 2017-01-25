'use strict';

let bearerAuth = require('../lib/bearer-auth');
// let authMiddleWare = require('../lib/authentication');
let User = require('../model/user');
let jsonParser = require('body-parser').json();
let Pet = require('../model/pets');

module.exports = (router) => {
  router.post('/users/pets', bearerAuth, jsonParser, (req, res) => {
    new Pet(req.body).save() //saves with hashed password into DB
    .then(pet => pet.update({owner: req.user.username}))
    .then(pet => res.json(pet))
    .catch((err) => {
      console.log(err);
      res.status(401).end('invalid body');
    });
  });
  router.get('/users/pets', bearerAuth, (req, res) => {
    User.findById(req.user)
    .populate('pets')
    .exec(function(err, user) {
      res.json(user.pets);
    });
  });
  router.post('/users/pets', bearerAuth, (req, res) => {
    console.log(req.user);
    res.end();
  });
};
