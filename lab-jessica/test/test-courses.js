'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const User = require('../models/user.js');
const Course = require('../models/course.js');
const app = require('../index.js');
const PORT = process.env.PORT || 3000;

const exampleUser = {
  username: 'ikaika',
  password: 'oliver',
  email: 'kopi@gmail.com'
};

const exampleCourse = {
  course: 'Calculus I',
  courseCode: 'MATH 151'
};

describe('testing auth routes', function() {
  let server;
  before(done => {
    server = app.listen(PORT, () => console.log('started tests from auth tests'));

    new User(exampleUser).save()
    .then(user => user.generateToken())
    .then(token => {
      this.token = token;
      done();
    })
    .catch(done);
  });

  after(done => {
    User.remove({})
    .then(() => done())
    .catch(done);
  });

  describe('testing POST /api/courses', () => {

    after(done => {
      Course.remove({})
      .then(() => done())
      .catch(done);
    });

    it('should return 200 along with course when valid token is provided', done => {
      request.post('localhost:3000/api/courses')
      .set('Authorization', 'Bearer ' + this.token)
      .send(exampleCourse)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.course).to.equal('Calculus I');
        expect(res.body.courseCode).to.equal('MATH 151');
        done();
      });
    });

    it('should return 401 if user does not provide token', done => {
      request.post('localhost:3000/api/courses')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.deep.equal({});
        done();
      });
    });

    it('should return 400 for invalid body', done => {
      request.post('localhost:3000/api/courses')
      .set('Authorization', 'Bearer ' + this.token)
      .send('lolol')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('should return 400 when no body is provided', done => {
      request.post('localhost:3000/api/courses')
      .set('Authorization', 'Bearer ' + this.token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

  });

  describe('testing GET /api/courses', () => {
    before(done => {
      new Course(exampleCourse).save()
      .then(course => {
        this.tempCourse = course;
        done();
      })
      .catch(done);
    });

    after(done => {
      Course.remove({})
      .then(() => done())
      .catch(done);
    });

    it('should return 200 along with course when provided a valid id', done => {
      request.get(`localhost:3000/api/courses/${this.tempCourse._id}`)
      .set('Authorization', 'Bearer ' + this.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.course).to.equal('Calculus I');
        expect(res.body.courseCode).to.equal('MATH 151');
        done();
      });
    });

    it('should return 401 if no token is provided', done => {
      request.get(`localhost:3000/api/courses/${this.tempCourse._id}`)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.deep.equal({});
        done();
      });
    });

    it('should return 404 if invalid id is provided by authenticated user', done => {
      request.get('localhost:3000/api/courses/9')
      .set('Authorization', 'Bearer ' + this.token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  after(function(done) {
    server.close(() => console.log('server closed after user tests'));
    done();
  });

});
