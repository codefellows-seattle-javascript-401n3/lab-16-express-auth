'use strict';
let express = require('express');
let mongoose = require('mongoose');

let PORT = process.env.PORT || 3000;
let MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/dev';
mongoose.connect(MONGO_URI);
mongoose.Promise = Promise;

let app = express();

let routes = require('./route/routes.js');
app.use(routes);

if(require.main === module) {
  app.listen(PORT, () => {
    console.log(`server on ${PORT}`);
  });
}

module.exports = app;