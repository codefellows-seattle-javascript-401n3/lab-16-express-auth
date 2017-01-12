let User = require('../models/user');
let authMiddlewear = require('../lib/authentication');
let jsonParser = require('body-parser').json();

module.exports = (router) => {
  router.post('/users', jsonParser, (req, res) => {
    let user = new User(req.body);
    user.hashPassword(user.password)
      .then(user => user.save())
      .then(user => res.json(user))
      .catch();
  });

  router.get('/users/:id', authMiddlewear, (req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(/* throw error*/);
  });

  // create a new user
  /*
  router.post('/signup', (req, res) => {
    User.create(req.body)
      .then(user => res.json(user))
      .catch()
  })

  app.post('/login', (req, res) => {

  })
  */
};
