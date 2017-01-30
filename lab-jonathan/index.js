let express = require('express');
let mongoose = require('mongoose');
let morgan = require('morgan'); //morgan is a logging module.
let authMiddleware = require('./lib/authMiddleware');


let PORT = process.env.PORT || 9000;

mongoose.connect('mongodb://localhost/authLab');
mongoose.Promise = Promise;


let app = express();

app.use(morgan('authLab'));
require('./route/user-routes')(app);

app.listen(PORT, () => console.log(`server started on ${PORT}`));


module.exports = app;
