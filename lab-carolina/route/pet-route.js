'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

const Pet = require('../model/pet.js');
const bearerAuth = require('../lib/bearer-auth.js');

const petRouter = module.exports = Router();

petRouter.post('/api/pet', bearerAuth, jsonParser, function(req, res, next){

  req.body.userID = req.user._id;
  new Pet(req.body).save()
  .then( pet => res.json(pet))
  .catch(next);
});


petRouter.get('/api/pet/:id', bearerAuth, function(req, res, next){
  Pet.findById(req.params.id)
  .then(pet => {
    if (pet.userID.toString() !== req.user._id.toString())
      return next(createError(401, 'invalid userid'));
    res.json(pet);
  })
  .catch(next);
});

petRouter.put('/api/pet/:id', bearerAuth, function(req, res, next){
  Pet.findById(req.params.id)
  .then( pet => {
    if(pet.userID.toString() !== req.user._id.toString()) return next(createError(401, 'invalid userId'));
    return Pet.findByIdAndUpdate(req.params.id, req.body, {new:true});
  })
  .then( pet => {
    res.json(pet);
  })
  .catch(err => next(createError(404, err.message)));
});

petRouter.delete('/api/pet/:id', bearerAuth, function(req, res, next) {
  Pet.findByIdAndRemove(req.params.id)
  .then(() => res.status(204).send())
  .catch(err => next(createError(404, err.message)));
});
