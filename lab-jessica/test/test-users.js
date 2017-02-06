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

describe('testing user routes', function() {
  let server;

  before(function(done) {
    server = app.listen(PORT, () => console.log('started tests from user tests'));

    new User(exampleUser).save()
      .then(user => {
        this.tempUser = user;
        return user.generateToken();
      })
      .then(token => {
        this.tempUser.token = token;
        done();
      })
      .catch(done);
  });

  after(function(done) {
    User.remove({})
    .then(() => {
      server.close(() => console.log('server closed after user tests'));
      done();
    });
  });

  describe('testing GET /users', function() {

    it('should return 200 with user info, not including password', function(done) {
      request.get('localhost:3000/users')
      .set('Authorization', 'Bearer ' + this.tempUser.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.username).to.equal('ikaika');
        expect(res.body.email).to.equal('kopi@gmail.com');
        expect(res.body.password).to.not.exist;
        done();
      });
    });

    it('should return 401 if user is unauthenticated', function(done) {
      request.get('localhost:3000/users')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });

  });
});
