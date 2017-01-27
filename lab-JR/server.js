'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const app = express();

const userRoute = require('./route/user-route');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://heroku_bl29d6v3:3sino9396o2ertmj2fmirp4118@ds117859.mlab.com:17859/heroku_bl29d6v3';

mongoose.Promise = Promise;//tells mongoose to promisify everything
mongoose.connect(MONGODB_URI);

app.use(userRoute);

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
