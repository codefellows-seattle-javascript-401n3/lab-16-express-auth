'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const User = require('../models/user.js');
const app = require('../index.js');
const PORT = process.env.PORT || 3000;

describe('testing user routes', function() {
  let server;
  let user;

  before(function(done) {
    server = app.listen(PORT, () => {
      console.log('started tests from user tests');
    });
    done();
  });

  describe('testing unregistered routes', function() {
    it('should return 404', function(done) {
      request.get('localhost:3000/hello')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('testing POST /users routes', function() {

    it('should return 200 along with user info, not including password', function(done) {
      request.post('localhost:3000/users')
      .send({username: 'Username Test', password: 'Password Test', email: 'Email Test'})
      .end((err, res) => {
        user = res.body;
        expect(res.status).to.equal(200);
        expect(res.body.username).to.equal('Username Test');
        expect(res.body.email).to.equal('Email Test');
        expect(res.body).to.not.have.property('password');
        done();
      });
    });

    //  * `POST` - test 400, responds with the `http-errors` 401 name, for 'invalid body`
    // it('should respond 401 if invalid body provided', function(done) {
    //   request.post('localhost:3000/users')
    //   .send('sjsdkgs')
    //   .end((err, res) => {
    //     expect(res.status).to.equal(401);
    //     done();
    //   });
    // });

    //  * `POST` - test 400, responds with the `http-errors` 401 name, for if no `body provided`
    // it('should return 401 if no body provided', function(done) {
    //   request.post('localhost:3000/users')
    //   .end((err, res) => {
    //     expect(res.status).to.equal(401);
    //     done();
    //   });
    // });

  });

  describe('testing GET /users', function() {

    it('should return 200 with user info, not including password', function(done) {
      request.get(`localhost:3000/users/${user._id}`)
      .auth('Username Test', 'Password Test')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.username).to.equal(user.username);
        expect(res.body.email).to.equal(user.email);
        expect(res.body).to.not.have.property('password');
        done();
      });
    });

    it('should return 401 if user not authenticated due to wrong password', function(done) {
      request.get(`localhost:3000/users/${user._id}`)
      .auth('Username Test', 'Wrong Password')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });

  });

  after(function(done) {
    User.remove({_id: user._id}).exec();

    server.close(() => {
      console.log('server closed after user tests');
    });
    done();
  });

});
