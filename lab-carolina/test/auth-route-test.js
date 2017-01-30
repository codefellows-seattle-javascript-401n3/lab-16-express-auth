'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const User = require('../model/user');

mongoose.Promise = Promise;

require('../server.js');

const exampleUser = {
  username: 'oreo',
  password: '123',
  email: 'oreo@oreo.org',
};

describe('Testing auth-router', function(){

  describe('Testing POST routes', function(){
    describe('Testing POST with VALID BODY', function(){

      after(done => {
        User.remove({})
        .then(() => done())
        .catch(done);
      });

      it('Should return a token', (done) => {
        request.post('localhost:3000/api/signup')
        .send(exampleUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(!!res.text).to.equal(true);
          done();
        });
      });
    });

    describe('Testing POST with INVALID BODY', function(){

      after(done => {
        User.remove({})
        .then(() => done())
        .catch(done);
      });

      it('Should return a 400 error', (done) => {
        request.post('localhost:3000/api/signup')
        .set('Content-type', 'application/json')
        .send('wat')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

  });

  describe('Testing GET /api/signin', function(){
    describe('Testing GET with valid credentials', function(){

      before(done => {
        let user = new User(exampleUser);
        user.generatePasswordHash(exampleUser.password)
        .then(user => user.save())
        .then(user => {
          this.tempuser = user;
          done();
        })
        .catch(done);
      });

      after(done => {
        User.remove({})
        .then(() => done())
        .catch(done);
      });

      it('Should return a token', (done) => {
        request.get('localhost:3000/api/login')
        .auth('oreo', '123')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(!!res.text).to.equal(true);
          done();
        });
      });
    });

    describe('Testing GET with invalid credentials', function(){

      before(done => {
        let user = new User(exampleUser);
        user.generatePasswordHash(exampleUser.password)
        .then(user => user.save())
        .then(user => {
          this.tempuser = user;
          done();
        })
        .catch(done);
      });

      after(done => {
        User.remove({})
        .then(() => done())
        .catch(done);
      });

      it('Should return a 401 error', (done) => {
        request.get('localhost:3000/api/login')
        .auth('oreo', 'wrongPass')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(!!res.text).to.equal(true);
          done();
        });
      });
    });

  });

  describe('Testing unregistered routes', function(){
    it('Should return a 404 status and an error message', function(done){
      request.get('localhost:3000/cats')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
        res.end();
      });
    });
  });
});
