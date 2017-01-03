const app = require('../index')

const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

let server = undefined

describe('authentication app', function() {
  before(function(done) {
    server = app.listen(3000, () => {
      console.log('test server started on port 3000')
      done()
    })
  })
  describe('POST /users', function() {
    it('should work', function(done) {
      expect(1).to.be.equal(1)
      done()
    })
  })
  after(function(done) {
    server.close(() => {
      console.log('test server closed')
      done()
    })
  })
})
