'use strict';

let express = require('express');
let mongoose = require('mongoose');
let morgan = require('morgan');
let authMiddlewear = require('./lib/authentication.js');

const PORT = process.env.PORT | 3000;
mongoose.connect('mongodb://localhost/dev');
mongoose.Promise = Promise;

let app = express();

app.use(morgan('dev'));
//app.use(authMiddlewear);
require('./routes/user-routes.js')(app);

app.listen(PORT, () => console.log(`server is running on ${PORT}`));



// let express = require('express');
// let mongoose = require('mongoose');
// let morgan = require('morgan');
// let authMiddlewear = require('./lib/authentication');
//
// const PORT = process.env.port || 3000;
// mongoose.connect('mongodb://localhost/dev');
// mongoose.Promise = Promise;
//
// let app = express();
//
// app.use(morgan('dev'));
// app.use(authMiddlewear);

// require('./routes/user-routes')(app);
// require('./routes/auth-routes.js');
//
//
// app.listen(PORT, () => console.log(`server started on ${PORT}`));



// app.post('/login', authMiddlewear, (req, res) => {
//   console.log(req.headers.authorization);
//   res.end();
// });
