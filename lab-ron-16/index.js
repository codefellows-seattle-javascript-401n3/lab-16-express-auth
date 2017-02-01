'use strict';

let express = require('express');
let mongoose = require('mongoose');
let morgan = require('morgan');
let authMiddlewear = require('./lib/authentication.js');

const PORT = process.env.PORT | 3000;
mongoose.connect('mongodb://localhost/dev');
mongoose.Promise = Promise;

let app = express();
//why does the below code break the verb methods?
// app.use(authMiddlewear);
app.use(morgan('dev'));
require('./routes/user-routes.js')(app);

if(require.main === module) {
  app.listen(PORT, () => console.log(`server is running on ${PORT}`));
}

module.exports = app;
