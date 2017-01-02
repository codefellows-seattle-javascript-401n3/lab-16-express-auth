'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const app = require('..index.js');
const PORT = process.env.PORT || 3000;

describe('testing user routes', function() {
  let server;

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

    //  * `POST` - test 200, Does not include the password
    it('', function(done) {
      request.post('localhost:3000/users')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });

    //  * `POST` - test 400, responds with the `http-errors` 401 name, for 'invalid body`
    it('', function(done) {
      request.post('localhost:3000/users')
      .send('sjsdkgs')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });

    //  * `POST` - test 400, responds with the `http-errors` 401 name, for if no `body provided`
    it('', function(done) {
      request.post('localhost:3000/users')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });

  });

  describe('testing GET /users', function() {

    //  * `GET` - test 200, Does not include the password
    it('', function(done) {
      request.get('localhost:3000/users/:id')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });

    //  * `GET` - test 401, responds with the `http-errors` 401 name, if the users could not be authenticated
    it('', function(done) {
      request.get('localhost:3000/users/:id')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });

  });

  after(function(done) {
    server.close(() => {
      console.log('server closed after user tests');
    });
    done();
  });

});
