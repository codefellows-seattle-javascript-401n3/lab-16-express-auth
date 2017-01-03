'use strict';


const express = require('express');
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost/users';
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jsonParser = require('body-parser');
const morgan = require('morgan');
const app = express();
require('./route/user-routes')(app);

let PORT = process.env.PORT || 3000;
mongoose.Promise = Promise;
mongoose.connect(mongoURI);

app.use(morgan('dev'));
// app.use(jsonParser);

if (require.main === module) {
  app.listen(PORT, () => console.log(`server started on ${PORT}`));
}
module.exports = app;

