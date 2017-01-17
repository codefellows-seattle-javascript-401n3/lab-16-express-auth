'use strict';
let request = require('superagent');
require('superagent-auth-bearer')(request);
let expect = require('chai').expect;
let User = require('../model/model.js');
let app = require('../server.js');

describe('.routes.js', function() {
  let server = null;
  let id = null;
  let token = null;
  before(function(done) {
    server = app.listen(3000, function() {
      console.log('server up');
      done();
    });
  });
  describe('/users post()', function() {
    it('should add a new user' , function(done) {
      request.post('http://localhost:3000/users')
      .send({username : 'testUser', password: 'testPass', email: 'testEmail'})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) {
          return done(err);
        } else {
          id = res.body._id;
          expect(res.status).to.equal(200);
          done();
        }
      });
    });
  });
  describe('/login post()', function() {
    it('should return a token when correct user and pass is sent', function(done) {
      request.post(`http://localhost:3000/login/${id}`)
      .auth('testUser', 'testPass')
      .end((err, res) => {
        if(err) {
          return done(err);
        } else {
          console.log(res.text);
          token = res.text;
          console.log('token ' + token);
          expect(res.status).to.equal(200);
          done();
        }
      });
    });
  });
  describe('/users/:id()', function() {
    it('should return the logged in user', function(done) {
      request.get(`http://localhost:3000/users/${id}`)
      .authBearer(JSON.parse(token))
      .end((err, res) => {
        if(err) {
          return done(err);
        } else {
          console.log(res.body);
          expect(res.status).to.equal(200);
          done();
        }
      });
    });
  });
  after(function(done) {
    console.log(id);
    User.findByIdAndRemove(id, (err, doc) => {
      if(err) {
        return console.error(err);
      } else {
        console.log(doc + ' removed');
      }
    });
    server.close(function() {
      console.log('server closed');
    });
    done();
  });
});