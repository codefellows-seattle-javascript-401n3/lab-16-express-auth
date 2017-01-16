let User = require('../model/users');
let Guitar = require('../model/guitars');
// let authMiddleware = require('../lib/authMiddleware');
let jsonParser = require('body-parser').json();
let createError = require('http-errors');
let bearerAuth = require('../lib/bearer-auth')

module.exports = (router) => {
  router.post('/users', jsonParser, (req, res) => {
    let user = new User(req.body);
    user.hashPassword(user.password)
      .then(user => user.save())
      .then(user => res.json(user))
      .catch(console.error);
  });

  router.post('/guitars', bearerAuth, jsonParser, (req, res) => {
    if (req.user._id) {
      req.body.owner = req.user._id;
      let guitar = new Guitar(req.body);
      guitar.save();
      console.log('user', req.user);
      req.user.guitar = guitar;
      res.json(req.user.guitar);
      req.user.save();
    } else {
      res.json({msg: 'you are not authorized to post'})
    }
  });


  router.get('/users', bearerAuth, (req, res) => {
    if(req.user) {
      console.log('users matched');
      delete req.user.password;
      res.json(req.user);
    } else {
      User.find({}).then(users => res.json(users));
    }
  //   User.findById(req.params.id)
  //   .then(user => res.json(user))
  //   .catch(err => next(createError(404, 'Not Found')));
  // });

  });
};
