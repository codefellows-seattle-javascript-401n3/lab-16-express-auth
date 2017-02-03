'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const app = express();

const userRoute = require('./route/user-route');
const recipeRoute = require('./route/recipe-route');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/lab17Tests';

mongoose.Promise = Promise;//tells mongoose to promisify everything
mongoose.connect(MONGODB_URI);

app.use(userRoute);
app.use(recipeRoute);
app.use(function(err, req, res, next){
  if(!err.status) {
    return res.status(500).send('server error');
  }
  else {
    res.status(err.status).send(err.message).end();
    next();
  }
}); //can take out since we don't have "next" built out in our routes;

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
