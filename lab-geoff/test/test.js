'use strict';
let request = require('superagent');
let expect = require('chai').expect;
let User = require('../model/model.js');
let app = require('../server.js');

describe('.routes.js', function() {
  let server = null;
  let id = null;
  before(function(done) {
    server = app.listen(3000, function() {
      console.log('server up');
      done();
    });
  });
  describe('/users post()', function() {
    it('should add a new user' , function(done) {
      request.post('http://localhost:3000/users')
      .send({username : 'newUser', password: 'testPass', email: 'testEmail'})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) {
          return done(err);
        } else {
          console.log(res.body);
          console.log(res.body.id);
          id = res.body.id;
          console.log(res.status);
          expect(res.status).to.equal(200);
          done();
        }
      });
    });
  });
  describe('/users/:id get()', function() {
    it('should get a user from the db', function(done) {
      console.log('send base64 password in authentication header');
      request.get(`http://localhost:3000/users/${id}`)
      .auth('newUser', 'testPass')
      .end((err, res) => {
        if(err) {
          return done(err);
        } else {
          console.log(res.status);
        }
      });
      done();
    });
  });
  after(function(done) {
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