'use strict';

const Router = require('express').Router;
const recipeRouter = module.exports = new Router();
const bearerAuth = require('../lib/bearer-middleware');
const jsonParser = require('body-parser').json();
const Recipe = require('../model/recipe');

recipeRouter.post('/api/recipe', jsonParser, bearerAuth, (req, res) => {
  if(!req.body.ingredient) return res.sendStatus(400);
  
  new Recipe({
    userID: req.user._id,
    ingredient: req.body.ingredient
  }).save()
  .then(recipe => res.json(recipe))
  .catch(() => res.status(500).send('server error/ cant save recipe'));
  //new recipe will be in the client's req.body which needs to pass through the recipeSchema.

  //new Recipe(req.body)...
});

recipeRouter.get('/api/recipe/:id', bearerAuth, (req, res) => {
  Recipe.findById(req.params.id)
  .then(recipe => res.json(recipe))
  .catch(() => res.status(404).send('resource not found'));
});

recipeRouter.put('/api/recipe/:id', jsonParser, bearerAuth, (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(recipe => res.json(recipe))
  .catch(() => res.status(400).send('invalid request'));
});

recipeRouter.delete('/api/recipe/:id', bearerAuth, (req, res) => {
  Recipe.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(() => res.sendStatus(500));
});
