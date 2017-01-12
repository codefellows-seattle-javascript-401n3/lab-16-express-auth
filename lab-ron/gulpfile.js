'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

gulp.task('mocha', function() {
  return gulp.src('test/server-test.js')
  .pipe(mocha());
});

gulp.task('eslint', function() {
  return gulp.src(['**/*.js', 'node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError);
});

gulp.task('dev', function() {
  gulp.watch('**/*.js', ['mocha', 'eslint']);
});

gulp.task('default', ['dev']);
