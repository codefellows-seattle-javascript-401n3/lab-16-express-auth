'use strict';

const createError = require('http-errors');
const Router = require('express').Router;
const Course = require('../models/course.js');
const User = require('../models/user.js');

const bearerAuth = require('../lib/bearer-authentication.js');

const router = module.exports = new Router();

router.post('/courses', bearerAuth, (req, res, next) => {
  User.findByIdAndAddCourse(req.user._id, req.body)
    .then(course => res.json(course))
    .catch(next);
});

router.get('/courses/:id', bearerAuth, (req, res, next) => {
  Course.findById(req.params.id)
    .then(course => res.json(course))
    .catch(next);
});

router.put('/courses/:id', bearerAuth, (req, res, next) => {
  Course.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(course => res.json(course))
    .catch(err => next(createError(404, 'Course not found for update')));
});

router.delete('/courses/:id', bearerAuth, (req, res, next) => {
  console.log('IN DELETE');
  // User.update({_id: req.user._id}, {$pull: {courses: req.params.id}})
  //   .then(() => Course.remove({_id: req.params.id}))
  //   .then(course => res.status(204).json(course))
  //   .catch(err => next(createError(404, 'Course not found for delete')));
});
