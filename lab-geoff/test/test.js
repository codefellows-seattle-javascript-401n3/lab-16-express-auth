'use strict';
let request = require('superagent');
let expect = require('chai').expect;
let app = require('../server.js');

describe('.routes.js', function() {
  let server = null;
  before(function() {
    server = app.listen(3000, function() {
      console.log('server up');
    });
  });
  describe('/users post()', function() {
    it('should add a new user' , function(done) {
      console.log('tests go here');
      done();
    });
  });
  after(function() {
    server.close(function() {
      console.log('server closed');
    });
  });
});