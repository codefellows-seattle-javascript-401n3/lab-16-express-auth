'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const User = require('../models/user.js');
const app = require('../index.js');
const PORT = process.env.PORT | 3000;

describe('test for user routes', function() {
    let user;
    let server;

  before(function(done) {
    server = app.listen(PORT, () => {
      console.log('Started server for users test.');
    });
    done();
  });

  describe('testing unauthorized routes', function() {
    it('should return a 404 status', function(done) {
      request.get('localhost:3000/unauthorized')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('testing user routes /POST', function() {
    it('should give a 200 status including user information', function(done) {
      request.post('localhost:3000/users')
      .end((err, res) => {
        user = res.body;
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

});
