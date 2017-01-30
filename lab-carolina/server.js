'use strict';

const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
const Promise = require('bluebird');
const mongoose = require('mongoose');

const authRouter = require('./route/auth-route.js');
const galleryRouter = require('./route/pet-route.js');
const errorMiddleware = require('./lib/error-middleware.js');

dotenv.load();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(authRouter);
app.use(galleryRouter);
app.use(errorMiddleware);

const server = module.exports = app.listen(PORT , () => {
  console.log(`server running on port ${PORT}`);
});

server.isRunning = true;
