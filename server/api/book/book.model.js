'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  	userId: { 
  		type: Schema.Types.ObjectId,
  		required: true
  	},
  	title: String,
  	author: String,
  	googleId: String,
  	valid: Number,
  	active: Boolean
});

module.exports = mongoose.model('Book', BookSchema);