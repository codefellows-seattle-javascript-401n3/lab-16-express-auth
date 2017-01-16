'use strict';

const Router = require('express').Router;
const Course = require('../models/course.js');
const User = require('../models/user.js');

const bearerAuth = require('../lib/bearer-authentication.js');

const router = module.exports = new Router();

router.post('/courses', bearerAuth, (req, res) => {
  req.body.userID = req.user._id;

  new Course(req.body).save()
    .then(course => {
      res.json(course);
      return User.findOneAndUpdate({_id: req.user._id}, {$push: {courses: course._id}});
    })
    .catch(err => {
      console.error(err);
      res.send('in catch block for post course');
    });
});

router.get('/courses/:id', bearerAuth, (req, res) => {
  Course.findById(req.params.id)
    .then(course => res.json(course))
    .catch(err => {
      console.error(err);
      res.status(404).sned('not found' + '\n');
    });
});

router.put('/courses/:id', bearerAuth, (req, res) => {
  Course.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(course => res.json(course))
    .catch(err => {
      console.error(err);
      res.status(404).send('not found' + '\n');
    });
});

router.delete('/courses/:id', bearerAuth, (req, res) => {
  User.update({_id: req.user._id}, {$pull: {courses: req.params.id}})
    .then(() => Course.remove({_id: req.params.id}))
    .then(course => res.status(204).json(course))
    .catch(err => {
      console.error(err);
      res.status(404);
    });
});
