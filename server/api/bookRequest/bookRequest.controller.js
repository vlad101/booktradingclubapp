'use strict';

var _ = require('lodash');
var Request = require('../request/request.model');
var Book = require('../book/book.model');

// Object id is used fo mongoose object id type
var ObjectId = require('mongoose').Types.ObjectId;

// Get list of bookRequests
exports.index = function(req, res) {

  // Get all requests objects
  Request.find(function (err, requestInfoList) {
    if(err) { return handleError(res, err); }
    if(!requestInfoList) { return handleError(res, err); }

    // Store all book ids from book request into a list
    var bookIdList = [];
    for(var i in requestInfoList)
      bookIdList.push(ObjectId(requestInfoList[i].bookId));

    // Get all books where book _id matches book request bookId
    Book.find( { _id : { $in : bookIdList } }, function (err, bookInfoList) {
      if(err) { return handleError(res, err); }
      if(!bookInfoList) { return res.status(404).send('Not Found'); }

      // Initialize book request dict ( key - book request id , value - book info )
      var bookRequestsDict = { };
      for(var i in requestInfoList) {
        for(var j in bookInfoList) {
          // requestInfoList book id must match with bookListInfo book id
          if(String(requestInfoList[i].bookId) == String(bookInfoList[j]._id)) {
            bookRequestsDict[requestInfoList[i]._id] = bookInfoList[j];
          }
        }
      }

      return res.status(200).json(bookRequestsDict);
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}