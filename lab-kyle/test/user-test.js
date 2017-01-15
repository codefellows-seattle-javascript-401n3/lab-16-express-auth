'use strict'

let expect = require('chai').expect
let request = require('superagent')
let mongoose = require('mongoose')

let User = require('../model/user')
let url = 'http://localhost:3000/api'

let testUser = {
  username: 'kyle',
  password: 'pass1234'
}

describe('a user module', function() {
  let server
  before(done => {
    server = require('../index.js')
    server.listen(3000)
    done()
  })

  describe('unregistered route', function() {
    it('will return 404', done => {
      request.get(`${url}/wrong`)
        .end((err, res) => {
          expect(res.status).to.equal(404)
          done()
        })
    })
  })

  describe('GET', function() {

    describe('/api/cars/id', function() {

      before(done => {
        request.post(`${url}/users`)
          .send(testUser)
          .then(user => {
            console.log(user)
            this.testUser = user
            done()
          })
          .catch(done)
      })
      after(done => {
        User.remove({})
        .then(()=> done())
        .catch(done)
      })

      it('can fetch a user if authenticated')
      request.get(`${url}/users/${this.testUser._id}`)
        .auth(this.testUser.username, this.testUser.password)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.username).to.equal(this.testUser.username)
        })
    })
  })
})
