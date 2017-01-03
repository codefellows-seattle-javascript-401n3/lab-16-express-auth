'use strict'

const app = require('../index')

const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

let server = undefined

let username = 'test'
let password = 'test'

describe('authentication app', function() {
  before(function(done) {
    server = app.listen(3000, () => {
      console.log('test server started on port 3000')
      done()
    })
  })
  describe('POST /users', function() {
    it('should post and return a username but no password', function(done) {
      chai.request(app)
        .post('/users')
        .send({username: username, password: password})
        .end(function(err, res) {
          let data = JSON.parse(res.text)
          expect(err).to.be.null
          expect(data.username).to.equal(username)
          expect(data.id).to.not.be.null
          expect(data.password).to.be.undefined
          done()
        })
    })

    it('should fail if sent the same username', function(done) {
      chai.request(app)
        .post('/users')
        .send({username: username, password: password})
        .end(function(err, res) {
          expect(res).to.have.status(500)
          done()
        })
    })

    it('should fail if sent incomplete data', function(done) {
      chai.request(app)
        .post('/users')
        .send({password: password})
        .end(function(err, res) {
          expect(res).to.have.status(400)
          done()
        })
    })

  })

  describe('GET /users', function() {
    it('should fail for any user other than Admin', function(done) {
      chai.request(app)
        .get('/users')
        .auth(username, password)
        .end(function(err, res) {
          expect(res).to.have.status(403)
          done()
        })
    })
  })

  describe('GET /users/:userid', function() {
    it('should return user info but no password', function(done) {
      chai.request(app)
        .get(`/users/${username}`)
        .auth(username, password)
        .end(function(err, res) {
          let data = JSON.parse(res.text)
          expect(res).to.have.status(200)
          expect(data[0].username).to.equal(username)
          expect(data[0].password).to.be.undefined
          done()
        })
    })

    it('should fail if not authorized user', function(done) {
      chai.request(app)
        .get('/users/Admin')
        .auth(username, password)
        .end(function(err, res) {
          expect(res).to.have.status(403)
          done()
        })
    })

    it('should fail if wrong credentials', function(done) {
      chai.request(app)
        .get(`/users/${username}`)
        .auth('baduser', 'badpass')
        .end(function(err, res) {
          expect(res).to.have.status(401)
          done()
        })
    })

    it('should fail if wrong credentials', function(done) {
      chai.request(app)
        .get(`/users/${username}`)
        .auth(username, 'badpass')
        .end(function(err, res) {
          expect(res).to.have.status(401)
          done()
        })
    })
  })

  after(function(done) {
    server.close(() => {
      console.log('test server closed')
      done()
    })
  })
})
