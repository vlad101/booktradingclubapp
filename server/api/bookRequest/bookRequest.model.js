'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookRequestSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('BookRequest', BookRequestSchema);