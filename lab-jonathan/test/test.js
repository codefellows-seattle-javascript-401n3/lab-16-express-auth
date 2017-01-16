let request = require('superagent');
let expect = require('chai').expect;
require('../index.js');
let User = require('../model/users');



describe('testing user rotues', function(){
  let user;
  let token;

  before(function(done) {
    console.log('something happening');
    let tmp = new User({username: 'usertestafa', password: 'testpass'});
    tmp.save()
    .then(u => {
      user = u;
      token = u.generateToken();
      console.log(token);
      console.log('token created');
      done();
    });
  });



//Unregistered route
  describe('testing unregistered route', function(){
    it('should return 404 for an unregistered route', function(done) {
      request.get('http://localhost:3000/stuff')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });



// test POST errors/messages
  describe('testing POST /users for response 200', function(){
    it('posts a user and gives a 200', function(){
      request.post('localhost:3000/users')
      .auth('Bearer', token, {type:'auto'})
      .send({make: 'usertestafa', model:'testpass'})
      .end((err, res) => {
        console.log('body', res.body);
        user = res.body;
        console.log('user', user);
        expect(res.status).to.equal(200);
        // done();
      });
    });
    it('should respond with a 401 error for if no token was provided', function(){
      request.post('localhost:3000/users')
      .auth('Bearer', '', {type:'auto'})
      .send({make: 'usertestafa', model:'testpass'})
      .end((err, res) => {
        expect(res.status).to.equal(401);
        // done();
      });
    });
    it('should return a 400 error if no body is provided', function(){
      request.post('localhost:3000/users')
      .end((err, res) => {
        expect(res.status).to.equal(400);
      });
    });
  });


// testing GET errors/messages
  describe('testing GET /users respones', function(){
    it('provided an id it should return a user but not the password', function(){
      request.get('localhost:3000/users')
      .auth('Bearer', token, {type:'auto'})
      .send({make: 'usertestafa', model:'testpass'})
      .end((err, res) => {
        if (err) return (err);
        expect(res.status).to.equal(200);
        expect(res.body.username).to.equal('usertestafa');
        expect(res.body).to.not.have.property('password');
      });
    });
    it('should return a 401 error if a token was not provided', function(){
      request.get('localhost:3000/users')
      .auth('Bearer', '', {type:'auto'})
      .send({make: 'usertestafa', model:'testpass'})
      .end((err, res) => {
        expect(res.status).to.equal(401);
        // done();
      });
    });
    it('should return a 404 error if the id provided was not found', function(){
      request.get('localhost:3000/users')
      .auth('Bearer', 'badToken', {type: 'auto'})
      .send({make: 'usertestafa', model:'testpass'})
      .end((err, res) =>{
        expect(res.status).to.equal(404);
      });
    });
  });

  after(function(done) {
    User.remove({_id:user._id}).exec();
    done();
  });

//end of file
});
