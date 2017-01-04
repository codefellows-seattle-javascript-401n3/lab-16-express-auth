'use strict';

const expect = require('chai').expect;
const request = require('superagent');
let User = require('../model/user');
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
    describe('the POST request for a user', function() {
      it('should post a new user to the database if given a valid requst', function(done) {
        request.post('http://localhost:3000/users')
        .send({username:'test', password:'test123', email:'test@test.gov'})
        .end((err, res) => {
          expect(res.text).to.equal('\"test has been created\"'); //no password returned
          request.delete(`http://localhost:3000/leagues${res.body._id}`); //return to stateless
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
  });
  after(function(done) {
    mongoose.connection.db.dropCollection('users');
    done();
  });
});
