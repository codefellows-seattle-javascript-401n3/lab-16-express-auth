'use strict';

let bearerAuth = require('../lib/bearer-auth');
// let authMiddleWare = require('../lib/authentication');
// let User = require('../model/user');
let jsonParser = require('body-parser').json();
let Pet = require('../model/pets');

module.exports = (router) => {
  router.post('/pets', jsonParser, (req, res) => {
    new Pet(req.body).save() //saves with hashed password into DB
    .then(pet => {
      res.json({username: pet.animal, owner: pet.owner});
    })
    .catch(() => {
      res.status(401).end('invalid body');
    });
  });
  // router.get('/users/:id/pets', bearerAuth, (req, res) => {
  //
  // })
  router.post('/users/pets', bearerAuth, (req, res) => {
    console.log(req.user);
    res.end();
  });
};
