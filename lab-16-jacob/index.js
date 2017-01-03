let express = require('express');
let mongoose = require('mongoose');
// let jsonParser = require('body-parser').json();
let authMiddleWare = require('./lib/authentication');
let morgan = require('morgan');
let handleError = require('./lib/error');

const PORT = process.env.port || 3000;
mongoose.connect('mongodb://localhost/users');
mongoose.Promise = Promise;

let app = express();

app.use(morgan('dev'));
app.use(handleError);
app.use(authMiddleWare);

require('./route/user-route')(app);

if(require.main === module) {
  app.listen(PORT, () => console.log(`server started on ${PORT}`));
}
