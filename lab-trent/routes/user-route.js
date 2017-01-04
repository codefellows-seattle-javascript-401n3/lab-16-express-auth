'use strict';

const express = require('express');
const mongoose = require('mongoose');
const jsonToken = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

const TOKEN_KEY = process.env.TOKEN_KEY || '29j3f029k';
const TOKEN_EXPIRY_TIME = 60 * 60 * 24;

router.post('/user', function(req, res, next) {
  new User(req.body).save().then(function(user) {
    res.json({ id: user._id, username: user.username });
  }).catch(next);
});

router.post('/login', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({
      success: false,
      message: 'Username or password incorrect.',
    });
  }

  User.findOne({ username: req.body.username }).then(function(user) {
    if (!user) {
      res.json({
        success: false,
        message: 'Username or password incorrect.',
      });
    }
    return user;
  }).then(function(user) {
    user.checkPass(req.body.password, function(err, correct) {
      if (err)
        throw err;
      console.log('Authentication request for ' + req.body.username, correct);
      if (correct) {
        let token = jsonToken.sign(user, TOKEN_KEY, {
          expiresIn: TOKEN_EXPIRY_TIME
        });

        res.json({
          success: true,
          message: 'Login sucessful.',
          token: token,
          expiresIn: Date.now() + (TOKEN_EXPIRY_TIME * 1000)
        });
      }
    });
  }).catch(function(err) {
    console.log(err);
  });
});
