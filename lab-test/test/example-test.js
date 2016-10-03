'use strict';

const exampleCrud = require('../index');
const expect = require('chai').expect;

describe('testing module exampleCrud', function(){
  before((done) => {
    exampleCrud.createExample({content: 'test data'})
    .then( example => this.example = example )
    .then( () => done())
    .catch(done);
  });

  it('should return a note', (done) => {
    exampleCrud.fetchExample(this.example._id)
    .then( example => {
      console.log(example);
      expect(!!example.content).to.equal(true);
      done();
    }).catch(done);
  });
});
