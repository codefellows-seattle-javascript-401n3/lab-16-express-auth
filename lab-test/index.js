'use strict';

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost/example';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect(mongoURI);

const exampleSchema = mongoose.Schema({
  content: String
});

const Example = mongoose.model('example', exampleSchema);

exports.createExample = function(data){
  const salt = bcrypt.genSaltSync(8);
  data.content = bcrypt.hashSync(data.content, salt);
  return new Example(data).save();
};

exports.fetchExample = function(id){
  return Example.findOne({_id: id});
};

