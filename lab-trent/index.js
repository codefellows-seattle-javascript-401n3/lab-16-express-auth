'use strict';

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/event';
const PORT = process.env.PORT || 3000;

mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI, function(err) {
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
  app.listen(PORT, function() {
    console.log('Server listening on http://localhost/:' + PORT);
  });
}
