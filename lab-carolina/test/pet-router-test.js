'use strict';

// npm
const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');

// app
const server = require('../server.js');
const User = require('../model/user.js');
const Pet = require('../model/pet.js');

// const
const url = `http://localhost:${process.env.PORT}`;
const exampleUser = {
  username: 'mars',
  password: '1234',
  email: 'mars@mars.org',
};

const examplePet = {
  name: 'Humphrey',
  breed: 'Chihuahua'
};

// config
mongoose.Promise = Promise;

describe('testing pet route', function(){
  before(done => {
    if (!server.isRunning){
      server.listen(process.env.PORT, () => {
        server.isRunning = true;
        console.log('server up');
        done();
      });
      return;
    }
    done();
  });

  after(done => {
    if(server.isRunning){
      server.close(err => {
        if (err) return done(err);
        server.isRunning = false;
        console.log('server down');
        done();
      });
      return;
    }
    done();
  });


  afterEach(done => {
    Promise.all([
      User.remove({}),
      Pet.remove({}),
    ])
    .then( () => done())
    .catch(done);
  });

  describe('testing POST to /api/pet', () => {
    before(done => {
      console.log('create user');
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then( user => user.save())
      .then( user => {
        this.tempUser = user;
        return user.generateToken();
      })
      .then( token => {
        this.tempToken = token;
        done();
      })
      .catch(done);
    });

    it('should return a pet', done => {
      request.post(`${url}/api/pet`)
      .send(examplePet)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.name).to.equal(examplePet.name);
        expect(res.body.breed).to.equal(examplePet.breed);
        done();
      });
    });
  });

  describe('testing GET to /api/pet/:id', () => {
    before(done => {
      console.log('create user');
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then( user => user.save())
      .then( user => {
        this.tempUser = user;
        return user.generateToken();
      })
      .then( token => {
        this.tempToken = token;
        done();
      })
      .catch(done);
    });

    before( done => {
      console.log('create pet');
      examplePet.userID = this.tempUser._id.toString();
      new Pet(examplePet).save()
      .then( pet => {
        this.tempPet = pet;
        done();
      })
      .catch(done);
    });

    after(() => {
      delete examplePet.userID;
    });

    it('should return a pet', done => {
      request.get(`${url}/api/pet/${this.tempPet._id}`)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.name).to.equal(examplePet.name);
        expect(res.body.breed).to.equal(examplePet.breed);
        done();
      });
    });
  });
});
