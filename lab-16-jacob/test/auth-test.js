'use strict';

const expect = require('chai').expect;
const request = require('superagent');
let user = require('../model/user');
let mongoose = require('mongoose');

let seeds = function() {
  require('../seeds/seeds');
};

describe('our server', function() {
  let server = undefined;
  before(function() {
    server = require('../index.js');
    server.listen(3000);
  });
  before(function(done) {
    mongoose.connection.on('open', seeds);
    done();
  });
  describe('our server with basic authentication abilities', function () {
    this.timeout(5000);
    describe('the POST request for a user', function() {
      it('should post a new user to the database if given a valid requst', function(done) {
        request.post('http://localhost:3000/users')
        .send({username:'test', password:'test123', email:'test@test.gov'})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.text).to.equal(`{\"username\":\"${res.body.username}\",\"id\":\"${res.body.id}\"}`); //no password returned
          done();
        });
      });
      it('should return a 401 error if no body is posted to the DB', function(done) {
        request.post('http://localhost:3000/users')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.text).to.equal('invalid body');
          done();
        });
      });
      it('should return a 401 error if an invalid body is posted to the DB', function(done) {
        request.post('http://localhost:3000/users')
        .send({username: 'steve', email: 'something'}) //no password given (required property)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.text).to.equal('invalid body');
          done();
        });
      });
    });
    describe('the GET request to our server', function() {
      it('should be able to get a valid user with proper request and not display their password', function(done) {
        user.findOne({username: 'Edwin'}, function(err, docs) {
          if (err) return done (err);
          return docs;
        })
        .then(docs => {
          request.get(`http://localhost:3000/users/${docs._id}`)
          .auth('Edwin', 'soSecure')
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('Edwin is logged in');
            done();
          });
        });
      });
      it('should return a 401 error if a user could not be authenticated', function(done) {
        user.findOne({username: 'Edwin'}, function(err, docs) {
          if (err) return done (err);
          return docs;
        })
          .then(docs => {
            request.get(`http://localhost:3000/users/${docs._id}`)
            .auth('Edwin', 'bruteForceHack!!!')
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.text).to.equal('wrong password');
              done();
            });
          });
      });

    });
    describe('the DELETE request to our server', function() {
      it('should be able to delete a user if the user is logged in', function(done) {
        user.findOne({username: 'Edwin'}, function(err, docs) {
          if (err) return done (err);
          return docs;
        })
        .then(docs => {
          request.delete(`http://localhost:3000/users/${docs._id}`)
          .auth('Edwin', 'soSecure')
          .end((err, res) => {
            expect(res.status).to.equal(204);
            done();
          });
        });
      });
      it('should reject a delete request if a user is not authenticated', function(done) {
        user.findOne({username: 'Bert'}, function(err, docs) {
          if(err) return done (err);
          return docs;
        })
          .then(docs => {
            request.delete(`http://localhost:3000/users/${docs._id}`)
            .auth('Bert', 'wrongpassword')
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.text).to.equal('wrong password');
              done();
            });
          });
      });
    });
  });
  after(function(done) {
    mongoose.connection.db.dropCollection('users');
    done();
  });
});
