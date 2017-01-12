let request = require('superagent');
let expect = require('chai').expect;
require('../index.js');
let User = require('../model/model');



describe('testing user rotues', function(){
  let user;


//Unregistered route
  describe('testing unregistered route', function(){
    it('should return 404 for an unregistered route', function(done) {
      request.get('http://localhost:9000/stuff')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });



// test POST errors/messages
  describe('testing POST /users for response 200', function(){
    it('posts a user and gives a 200', function(done){
      request.post('localhost:9000/users')
      .send({username: 'USERNAME', password:'USERPASS'})
      .end((err, res) => {
        console.log('body', res.body);
        user = res.body;
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should respond with a 401 error for if invalid body is provided', function(){
      request.post('localhost:9000/users')
      .send('franklinhardesty')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        // done();
      });
    });
    it('should return a 401 error if no body is provided', function(){
      request.post('localhost:9000/users')
      .end((err, res) => {
        expect(res.status).to.equal(401);
      });
    });
  });


// testing GET errors/messages
  describe('testing GET /users respones', function(){
    it('provided an id it should return a user but not the password', function(){
      request.get('localhost:9000/users')
      .auth('USERNAME', 'USERPASS')
      .end((err, res) => {
        if (err) return (err);
        expect(res.status).to.equal(200);
        expect(res.body.username).to.equal('USERNAME');
        expect(res.body).to.not.have.property('password');
      });
    });
    it('should return a 401 error if user can not be authenticated', function(){
      request.get(`localhost:9000/users/${user.id}`)
      .auth('USERNAME', 'snoochie bootchies')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        // done();
      });
    });
  });

  after(function(done) {
    User.remove({_id:user._id}).exec();
    done();
  });

//end of file
});
