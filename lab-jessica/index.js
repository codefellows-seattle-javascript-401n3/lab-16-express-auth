'use strict';

// npm modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const jsonParser = require('body-parser').json();
const app = express();

// app modules
const errorMiddlware = require('./lib/error-middleware.js');
const userRoutes = require('./routes/user-routes.js');
const authRoutes = require('./routes/auth-routes.js');
const courseRoutes = require('./routes/course-routes.js');

// module constants
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/lab17';

mongoose.connect(MONGODB_URI);
mongoose.Promise = Promise;

// app middleware
app.use(morgan('dev'));
app.use(jsonParser);
app.use(userRoutes);
app.use(authRoutes);
app.use('/api', courseRoutes);
app.use(errorMiddlware);

module.exports = app;

// start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log('listening on PORT', PORT);
  });
}
