let express = require('express');
let mongoose = require('mongoose');
let morgan = require('morgan'); //morgan is a logging module.
let authMiddleware = require('./lib/authMiddleware');


let PORT = process.env.PORT || 9000;
// let MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/authLab';  //export MONGO_URI='mongodb://localhost/guitarsOwnersDB'
mongoose.connect('mongodb://localhost/authLab');
mongoose.Promise = Promise;


// mongoose.connect('mongodb://localhost/authLab'); //local db name here.

let app = express();

// mongoose.createConnection(MONGO_URI);
app.use(morgan('authLab'));
// app.use('authMiddleware');
require('./route/user-routes')(app);

app.listen(PORT, () => console.log(`server started on ${PORT}`));


module.exports = app;







//depending on what charlie puts in the lab notes, i need to populate the database with users, at least 3, with unique usernames and passwords.  or at least unique usernames.  then i need to be able to 'get' and 'delete' them from the db.

//i have a db called authLab, and a collection called 'users' already created.  so i'll just add them to that collection
