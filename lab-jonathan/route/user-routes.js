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
  });

  router.put('/users', bearerAuth, jsonParser, (req, res) => {
    if(req.user) {
      User.update((req.body), function(err){
        if(err) {
          res.status(400).end('bad request');
        } else {
          res.status(200).json({msg: 'updated the user'})
        }
      });
    } else{
      if(err) {
        console.log(err);
        res.status(404).end('not found');
      }
    }
  });

  router.delete('/users', bearerAuth, (req, res) => {
    if(req.user) {
      delete req.user
      .then( () => res.status(204).send())
      .catch(err => createError(404, 'Not Found'));
    } else {
      res.json({msg: 'you are not authorized to delete'})
    }
  });
};
