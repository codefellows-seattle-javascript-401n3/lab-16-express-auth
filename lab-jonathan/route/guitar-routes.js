let Owner = require('../model/users.js');
let Router = require('express').Router;
let router = module.exports = new Router();
let jsonParser = require('body-parser').json();
let createError = require('http-errors');


router.get('/owners/:id', (req, res, next) => {
  Owner.findById(req.params.id)
    .populate('guitar')
    .then(owner => res.json(owner))
    .catch(err => next(createError(404, 'Not Found')));
});


router.post('/owners', jsonParser, function(req, res, next) {
  new Owner(req.body).save()
  .then(owner => res.json(owner))
  .catch(next);
});


router.put('/owners/:id', function(req, res, next){
  Owner.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(owner => res.json(owner))
  .catch(err => {
    if(err.name === 'ValidationError') return next(err);
    next(createError(404, 'Not Found'));
  });
});


router.delete('/owners/:id', function(req, res, next){
  Owner.findByIdAndRemove(req.params.id)
  .then( () => res.status(204).send())
  .catch(err => next(createError(404, 'Not Found')));
});
