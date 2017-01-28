'use strict';

const Router = require('express').Router;
const recipeRouter = module.exports = new Router();
const bearerAuth = require('../lib/bearer-middleware');
const jsonParser = require('body-parser').json();
const User = require('../model/user');
const Recipe = require('../model/recipe');

recipeRouter.post('/api/recipe', jsonParser, bearerAuth, (req, res) => {
  new Recipe({
    userID: req.user._id,
    ingredient: req.body.ingredient
  }).save()
  .then(recipe => res.json(recipe))
  .catch(() => res.status(500).send('server error/ cant save recipe'));
  //new recipe will be in the client's req.body which needs to pass through the recipeSchema.

  //new Recipe(req.body)...
});
