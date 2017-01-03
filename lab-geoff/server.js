'use strict';
let express = require('express');
let mongoose = require('mongoose');

let PORT = process.env.PORT || 3000;
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/dev';
mongoose.connect(MONGODB_URI);
mongoose.Promise = Promise;

let app = express();
let router = require('./route/routes.js');
app.use(router);
module.exports = app;

if(require.main === module) {
  app.listen(PORT, () => {
    console.log(`server on ${PORT}`);
  });
}
