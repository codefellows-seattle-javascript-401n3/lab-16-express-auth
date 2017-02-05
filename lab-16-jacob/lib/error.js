'use strict';

//CREDIT TO JESS AND OUR WONDERFUL PROJECT GROUP FOR THIS ERROR MIDDLEWARE
const createError = require('http-errors');

module.exports = function(err, req, res, next) {


  if (err.status) {
    res.status(err.status).send(err.name);
    next();
    return;
  }

  if (err.name === 'ValidationError') {
    err = createError(400, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  if(err.name === 'MongoError') {
    err = createError(409, 'No Duplicates');
    res.status(err.status).send(err.name);
    next();
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};
