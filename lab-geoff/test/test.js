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
      .send({username : 'newuser', password: 'testPass', email: 'testEmail'})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) {
          return done(err);
        } else {
          console.log(res.body);
          id = res.body._id;
          console.log(id);
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
      .auth('newuser', 'testPass')
      .end((err, res) => {
        if(err) {
          return done(err);
        } else {
          console.log(res.status);
          expect(res.status).to.equal(200);
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