'use strict';

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const constants = require('./lib/constants');

mongoose.Promise = Promise;

mongoose.connect(constants.MONGODB_URI, function(err) {
  if (err)
    throw err;
  console.log('Successfully connected to MongoDB');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', require('./routes/user-route'));

app.use(function(err, req, res, next) {
  if (err) {
    if (err.status) res.status(err.status);
    res.end(err.message);
  } else {
    res.end('Whoops. Unhandled error!');
  }
  next();
});

module.exports = app;

if (require.main === module) {
  app.listen(constants.PORT, function() {
    console.log('Server listening on http://localhost/:' + constants.PORT);
  });
}
