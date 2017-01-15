'use strict';

let express = require('express');
let mongoose = require('mongoose');
//let authMiddleWare = require('./lib/authentication');
let morgan = require('morgan');
let handleError = require('./lib/error');

const PORT = process.env.port || 3000;
mongoose.connect('mongodb://localhost/users');
mongoose.Promise = Promise;

let app = express();

app.use(morgan('dev'));
app.use(handleError);

require('./route/user-route')(app);
require('./route/auth-routes')(app);


module.exports = app;

if(require.main === module) {
  app.listen(PORT, () => console.log(`server started on ${PORT}`));
}
