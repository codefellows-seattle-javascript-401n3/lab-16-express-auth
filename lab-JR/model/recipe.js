'use strict';

const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const recipeSchema = Schema({
  userID: {type: String, required: true},
  ingredient: {type: String},
});

module.exports = mongoose.model('recipe', recipeSchema);
