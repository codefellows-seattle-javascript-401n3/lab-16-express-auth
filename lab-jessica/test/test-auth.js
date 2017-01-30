'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const User = require('../models/user.js');
const app = require('../index.js');
const PORT = process.env.PORT || 3000;

const exampleUser = {
  username: 'ikaika',
  password: 'oliver',
  email: 'kopi@gmail.com'
};

describe('testing auth routes', function() {
  let server;

  before(function(done) {
    server = app.listen(PORT, () => {
      console.log('started tests from auth tests');
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

  describe('testing POST /signup route', function() {
    after(done => {
      User.remove({})
        .then(() => done())
        .catch(done);
    });

    it('should return 200 along with user info, not including password', function(done) {
      request.post('localhost:3000/signup')
      .send(exampleUser)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.username).to.equal(exampleUser.username);
        expect(res.body.email).to.equal(exampleUser.email);
        expect(res.body).to.not.have.property('password');
        done();
      });
    });

    // it('should respond 400 if invalid body provided', function(done) {
    //   request.post('localhost:3000/signup')
    //   .send('')
    //   .end((err, res) => {
    //     expect(res.status).to.equal(400);
    //     done();
    //   });
    // });
    //
    // it('should return 400 if no body provided', function(done) {
    //   request.post('localhost:3000/signup')
    //   .end((err, res) => {
    //     expect(res.status).to.equal(400);
    //     done();
    //   });
    // });

  });

  describe('testing GET /login', function() {

    before(done => {
      let user = new User(exampleUser);
      user.hashPassword(exampleUser.password)
        .then(user => user.save())
        .then(user => {
          this.tempUser = user;
          done();
        })
        .catch(done);
    });

    after(done => {
      User.remove({})
        .then(() => done())
        .catch(done);
    });

    it('should return 200 with token', done => {
      request.get('localhost:3000/login')
      .auth('ikaika', 'oliver')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('string');
        done();
      });
    });

    it('should return 401 if user not authenticated due to wrong password', function(done) {
      request.get('localhost:3000/login')
      .auth('ikaika', 'Wrong Password')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });

  });

  after(function(done) {
    server.close(() => console.log('server closed after user tests'));
    done();
  });

});
