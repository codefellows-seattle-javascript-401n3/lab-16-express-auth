'use strict';

let bearerAuth = require('../lib/bearer-auth');
// let authMiddleWare = require('../lib/authentication');
let User = require('../model/user');
let jsonParser = require('body-parser').json();
let Pet = require('../model/pets');
let createError = require('http-errors');

module.exports = (router) => {
  router.post('/users/pets', bearerAuth, jsonParser, (req, res) => {
    new Pet(req.body).save()
    .then(pet => {
      let petID = pet._id; //updates the user to add on the pet ID
      User.findOneAndUpdate({_id: req.user._id}, {pets: [req.user.pets, pet._id]}, {new: false})
      .then(user => { //updates the new pet to make the authenticated user it's owner
        Pet.findOneAndUpdate({_id: petID}, { $set: {owner: user.username}}, {new: true})
        .then(pet => res.json(pet));
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).end('invalid body');
    });
  });
  router.get('/users/pets', bearerAuth, (req, res) => {
    User.findById(req.user._id)
    .populate('pets')
    .exec(function(err, user) {
      res.json(user.pets);
    });
  });
  router.put('/users/pets/:id', bearerAuth, jsonParser, (req, res, next) => {
    Pet.findById(req.params.id)
    .then(pet => {
      if(req.user.username === pet.owner) {
        pet.update(req.body, function(err) {
          if (err) {
            res.status(400).end('bad request');
          } else {
            res.status(200).json(pet);
          }
        });
      } else {
        return next(createError(401));
      }
    });
  });
  router.delete('/users/pets/:id', bearerAuth, (req, res, next) => {
    Pet.findById(req.params.id)
    .then(pet => {
      if(req.user.username === pet.owner) {
        pet.remove({_id: pet._id}, function(err) {
          if(err) {
            res.status(404).end('not found');
          }
          res.status(204).end();
        });
      } else {
        return next(createError(401));
      }
    });
  });
};
