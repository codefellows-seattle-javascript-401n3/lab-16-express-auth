let User = require('../model/model');
let authMiddlewear = require('../lib/authMiddleware');
let jsonParser = require('body-parser').json();
let createError = require('http-errors');

module.exports = (router) => { //creating a new user with a password, hashing it and putting it into the db.
  router.post('/users', jsonParser, (req, res) => {
    let user = new User(req.body);
    user.hashPassword(user.password)
      .then(user => user.save())
      .then(user => res.json(user))
      .catch();
  });

  router.get('/users/:id', authMiddlewear, (req, res) => {  //getting an existing user
    User.findByID(req.params.id)
    .then(user => res.json(user))
    .catch(err => next(createError(404, 'Not Found')));
  });
};
