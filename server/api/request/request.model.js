'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequestSchema = new Schema({
  userId: { 
  		type: Schema.Types.ObjectId,
  		required: true
  },
  bookId: { 
  		type: Schema.Types.ObjectId,
  		required: true
  },
  approved: Boolean
});

module.exports = mongoose.model('Request', RequestSchema);