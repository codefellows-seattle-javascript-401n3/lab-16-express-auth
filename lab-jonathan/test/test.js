let request = require('superagent');
let expect = require('chai').expect;
require('../index.js');


describe('testing user rotues', function(){
  // let owner = null
  // before((done) => {
  //   console.log('waiting');
  //   setTimeout(() => {}, 10000);
  //   request.post('localhost:9000/owners')
  //      .send({name: 'OWNER NAME', style: 'OWNER STYLE', guitar: 'OWNER GUITAR'})
  //      .end((err, res) => {
  //        owner = res.body;
  //        done();
  //      });
  // });
  it('should return 404 for an unregistered route', function(done) {
    request.get('http://localhost:9000/stuff')
    .end((err, res) => {
      console.log(err);
      console.log(res);
      expect(res.status).to.equal(404);
      done();
    });
  });


// test POST errors/messages
  describe('testing POST /users for response 200', function(){
    it('should return a user', function(done){
      request.post('localhost:9000/users')
      .send({username: 'USERNAME'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.username).to.equal('USERNAME');
        done();
      });
    });
  //
    it('should responds with "bad request" for if no body provided or invalid body provided', function(done){
      request.post('localhost:9000/users')
      .send({username: 'USERNAME'})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });


// testing GET errors/messages
  // describe('testing GET /suers respones', function(){
  //   it('provided an id it should return a user', function(done){
  //     request.get(`localhost:9000/users/${user.id}`)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.status).to.equal(200);
  //       expect(res.body.username).to.equal('USERNAME');
  //       expect(res.body.password).to.equal('OWNER STYLE');
  //       owner = res.body;
  //       done();
  //     });
  //   });
  //
  //   it('should return a 400 bad request error if no id was provided', function(done){
  //     request.get('localhost:9000/owners/')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400);
  //       done();
  //     });
  //   });
  //
  //   it('should return a 404 error if the id was not found' , function(done){
  //     request.get('localhost:9000/owners/lemmy')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(404);
  //       // expect(res.text).to.equal('Not Found');
  //       done();
  //     });
  //   });
  //
  //
  // });

//end of file
});










//delete tests
//DELETE - test 404, for a DELETE request with an invalid or missing id
// 404 for missing id because DELETE /api/<simple-resource-name>/ is not a route
// DELETE - test 204, with an empty response body for DELETE request with a valid id
