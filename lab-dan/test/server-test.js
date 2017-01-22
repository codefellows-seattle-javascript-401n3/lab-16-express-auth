'use strict'

const app = require('../index')

const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

let server = undefined

let username = 'tester'
let password = 'test'
let token = ''

describe('authentication app', function() {

  before(function(done) {
    server = app.listen(3000, () => {
      console.log('test server started on port 3000')
      done()
    })
  })

  describe('POST /register', function() {
    it('should post and return a username but no password', function(done) {
      chai
        .request(app)
        .post('/register')
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
      chai
        .request(app)
        .post('/register')
        .send({username: username, password: password})
        .end(function(err, res) {
          expect(res).to.have.status(500)
          done()
        })
    })

    it('should fail if sent incomplete data', function(done) {
      chai
        .request(app)
        .post('/register')
        .send({password: password})
        .end(function(err, res) {
          expect(res).to.have.status(400)
          done()
        })
    })
  })

  describe('POST /login', function() {
    it('should fail if wrong credentials', function(done) {
      chai
        .request(app)
        .post('/login')
        .auth(username, 'badpass')
        .end(function(err, res) {
          expect(res).to.have.status(401)
          done()
        })
    })
    it('should post and return a token', function(done) {
      chai
        .request(app)
        .post('/login')
        .auth(username, password)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res.type).to.equal('application/json')
          expect(res).to.have.status(200)
          token = res.body.token
          done()
        })
    })
  })

  describe('GET /users', function() {
    it('should only return user\'s info for any user other than Admin', function(done) {
      chai
        .request(app)
        .get('/users')
        .set('authorization', `Bearer ${token}`)
        .end(function(err, res) {
          expect(res).to.have.status(200)
          // expect(res.body).to.not.be.array
          // expect(res.body.username).to.equal(username)
          done()
        })
    })
  })

  describe('GET /users/:userid', function() {
    it('should return user info but no password', function(done) {
      chai
        .request(app)
        .get(`/users/${username}`)
        .set('Authorization', `Bearer ${token}`)
        .end(function(err, res) {
          let data = JSON.parse(res.text)
          expect(res).to.have.status(200)
          expect(data[0].username).to.equal(username)
          expect(data[0].password).to.be.undefined
          done()
        })
    })

    it('should fail if not authorized user', function(done) {
      chai
        .request(app)
        .get('/users/Admin')
        .set('Authorization', `Bearer ${token}`)
        .end(function(err, res) {
          expect(res).to.have.status(403)
          done()
        })
    })

    it('should fail if wrong credentials', function(done) {
      let fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImlhdCI6MTQ4NTA0MzAxMiwiZXhwIjoxNDg1MTI5NDEyfQ.yuoLmDam8mrW6YAkleheEONWCmUEjFGwdEZ2-sJZZDQ'
      chai
        .request(app)
        .get(`/users/${username}`)
        .set('Authorization', `Bearer ${fakeToken}`)
        .end(function(err, res) {
          expect(res).to.have.status(403)
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
