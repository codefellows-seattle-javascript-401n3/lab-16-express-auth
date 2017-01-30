'use strict';

// npm modules
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
const Promise = require('bluebird');
const mongoose = require('mongoose');

// app modules
const authRouter = require('./route/auth-route.js');
const errorMiddleware = require('./lib/error-middleware.js');

// load env vars
dotenv.load();

// setup mongoose
//mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB_URI);

// module constants
const PORT = process.env.PORT;
const app = express();

// app middleware
app.use(cors());
app.use(morgan('dev'));

// app routes
app.use(authRouter);
app.use(errorMiddleware);

// start server
const server = module.exports = app.listen(PORT , () => {
  console.log(`server running on port ${PORT}`);
});

server.isRunning = true;
