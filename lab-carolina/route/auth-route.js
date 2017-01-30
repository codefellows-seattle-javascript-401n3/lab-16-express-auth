'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const basicAuth = require('../lib/basic-auth.js');

const User = require('../model/user.js');

const authRouter = module.exports = Router();

authRouter.post('/api/signup', jsonParser, function(req, res, next){
  console.log(req.body);
  let password = req.body.password;
  console.log('password', password);

  delete req.body.password;
  let user = new User(req.body);

  user.generatePasswordHash(password)
  .then( user => user.save()) 
  .then( user => user.generateToken())
  .then( token => res.send(token))
  .catch(next);
});

authRouter.get('/api/login', basicAuth, function(req, res, next){

  User.findOne({username: req.auth.username})
  .then( user => user.comparePasswordHash(req.auth.password))
  .then( user => user.generateToken())
  .then( token => res.send(token))
  .catch(next);
});
