const createError = require('http-errors');

function errorHandle(err, req, res, next) {
  if (err.name === 'SyntaxError') {
    console.log('this fired');
    res.status(400).end('bad request');
  } else {
    err = createError(500, err.message);
    res.status(err.status).send(err.name);
    next();
  }
}

module.exports = errorHandle;
