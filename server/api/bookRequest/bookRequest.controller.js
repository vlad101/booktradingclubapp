'use strict';

var _ = require('lodash');
var BookRequest = require('./bookRequest.model');

// Get list of bookRequests
exports.index = function(req, res) {
  BookRequest.find(function (err, bookRequests) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(bookRequests);
  });
};

// Get a single bookRequest
exports.show = function(req, res) {
  BookRequest.findById(req.params.id, function (err, bookRequest) {
    if(err) { return handleError(res, err); }
    if(!bookRequest) { return res.status(404).send('Not Found'); }
    return res.json(bookRequest);
  });
};

// Creates a new bookRequest in the DB.
exports.create = function(req, res) {
  BookRequest.create(req.body, function(err, bookRequest) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(bookRequest);
  });
};

// Updates an existing bookRequest in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  BookRequest.findById(req.params.id, function (err, bookRequest) {
    if (err) { return handleError(res, err); }
    if(!bookRequest) { return res.status(404).send('Not Found'); }
    var updated = _.merge(bookRequest, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(bookRequest);
    });
  });
};

// Deletes a bookRequest from the DB.
exports.destroy = function(req, res) {
  BookRequest.findById(req.params.id, function (err, bookRequest) {
    if(err) { return handleError(res, err); }
    if(!bookRequest) { return res.status(404).send('Not Found'); }
    bookRequest.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}