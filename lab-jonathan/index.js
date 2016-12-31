let express = require('express');
let mongoose = require('mongoose');
let morgan = require('morgan'); //morgan is a logging module.
let authMiddleware = require('./lib/authMiddleware');

let PORT = process.env.port || 9000;
mongoose.connect('mongodb://localhost/authLab'); //local db name here.
mongoose.Promise = Promise;

app = express();

app.use(morgan('authLab'));
app.use(authMiddleware);
require('./route/user-routes')(app);

app.listen(PORT, () => console.log(`server started on ${PORT}`));




//depending on what charlie puts in the lab notes, i need to populate the database with users, at least 3, with unique usernames and passwords.  or at least unique usernames.  then i need to be able to 'get' and 'delete' them from the db.

//i have a db called authLab, and a collection called 'users' already created.  so i'll just add them to that collection 
