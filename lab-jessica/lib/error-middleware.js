'use strict';

const createError = require('http-errors');

module.exports = function(err, req, res, next) {

  console.error('msg:', err.message);
  console.error('name:', err.name);

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

  if(err.name === 'CastError') {
    err = createError(404);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  if(err.name === 'Error') {
    err = createError(400);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};
