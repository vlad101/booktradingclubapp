/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

// Import user, book, and request model
var User = require('../api/user/user.model');
var Book = require('../api/book/book.model');
var Request = require('../api/request/request.model');

// Object id is used fo mongoose object id type
var ObjectId = require('mongoose').Types.ObjectId;

// Add test users
User.find({}).remove(function() {
  User.create({
    _id : ObjectId("5653ac8fa197a3a01af9d932"),
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    city: 'Brooklyn',
    state: 'NY',
    password: 'admin'
  },{
    _id: ObjectId("5653a4efb2c7aa19102b5280"),
    provider: 'local',
    name: 'Test User 1',
    email: 'test1@test1.com',
    city: 'Brooklyn',
    state: 'NY',
    password: 'test1'
  },{
    _id: ObjectId("5653a4efb2c7aa19102b5281"),
    provider: 'local',
    name: 'Test User 2',
    email: 'test2@test2.com',
    city: 'Boston',
    state: 'MA',
    password: 'test2'
  }, function() {
      console.log('finished populating users');
    }
  );
});

// Add test books
Book.find({}).remove(function() {
  Book.create({
    _id: ObjectId("5653b6219ad6087723fa1cbf"),
    userId: ObjectId("5653a4efb2c7aa19102b5280"),
    title: "Tricky Twenty-Two: A Stephanie Plum Novel",
    author: "Janet Evanovich",
    googleId: "hUqwBgAAQBAJ",
    active: true
  },{
    _id: ObjectId("5653b6219ad6087723fa1cc0"),
    userId: ObjectId("5653a4efb2c7aa19102b5280"),
    title: "The Guilty",
    author: "David Baldacci",
    googleId: "a2LkBgAAQBAJ",
    active: true
  },{
    _id: ObjectId("5653b6219ad6087723fa1cc1"),
    userId: ObjectId("5653a4efb2c7aa19102b5280"),
    title: "Grey: Fifty Shades of Grey as Told by Christian",
    author: "E L James",
    googleId: "TJKmCQAAQBAJ",
    active: true
  },{
    _id: ObjectId("5653b8d51a8178c223983966"),
    userId: ObjectId("5653a4efb2c7aa19102b5280"),
    title: "The Martian: A Novel",
    author: "Andy Weir",
    googleId: "MQeHAAAAQBAJ",
    active: true
  },{
    _id: ObjectId("5653b6219ad6087723fa1cc3"),
    userId: ObjectId("5653a4efb2c7aa19102b5280"),
    title: "Warheart",
    author: "Terry Goodkind",
    googleId: "ndexCAAAQBAJ",
    active: true
  },{
    _id: ObjectId("5653b6219ad6087723fa1cc4"),
    userId: ObjectId("5653a4efb2c7aa19102b5281"),
    title: "Getting Started with Meteor.js JavaScript Framework: Edition 2",
    author: "Isaac Strack",
    googleId: "Bk0OCgAAQBAJ",
    active: true
  },{ 
    _id: ObjectId("5653b6219ad6087723fa1cc5"),
    userId: ObjectId("5653a4efb2c7aa19102b5281"),
    title: "Write Modern Web Apps with the MEAN Stack: Mongo, Express, AngularJS, and Node.js",
    author: "Jeff Dickey",
    googleId: "UEOZBAAAQBAJ",
    active: true
  },{
    _id: ObjectId("5653b6219ad6087723fa1cc6"),
    userId: ObjectId("5653a4efb2c7aa19102b5281"),
    title: "Sams Teach Yourself Java in 21 Days (Covering Java 7 and Android): Edition 6",
    author: "Rogers Cadenhead",
    googleId: "S1QQ-mOaPd8C",
    active: true
  },{
    _id: ObjectId("5653b6219ad6087723fa1cc7"),
    userId: ObjectId("5653a4efb2c7aa19102b5281"),
    title: "Python: Visual QuickStart Guide, Edition 2",
    author: "Toby Donaldson",
    googleId: "FnpWOWlwE74C",
    active: true
  },{
    _id: ObjectId("5653b6219ad6087723fa1cc8"),
    userId: ObjectId("5653a4efb2c7aa19102b5281"),
    title: "Sams Teach Yourself HTML, CSS, and JavaScript All in One",
    author: "Julie C. Meloni",
    googleId: "LS3qWhojG2gC",
    active: true
  }, function() {
      console.log('finished populating books');
    }
  );
});

// Add test requests
Request.find({}).remove(function() {
  Request.create({
    _id: ObjectId("5653bcae9318d1da240a5743"),
    userId: ObjectId("5653a4efb2c7aa19102b5280"),
    bookId: ObjectId("5653b6219ad6087723fa1cbf"),
    approved: 1
  },{
    _id: ObjectId("5653bcae9318d1da240a5744"),
    userId: ObjectId("5653a4efb2c7aa19102b5280"),
    bookId: ObjectId("5653b6219ad6087723fa1cc0"),
    approved: 0
  },{
    _id: ObjectId("5653bcae9318d1da240a5745"),
    userId: ObjectId("5653a4efb2c7aa19102b5280"),
    bookId: ObjectId("5653b6219ad6087723fa1cc1"),
    approved: 1
  },{
    _id: ObjectId("5653bcae9318d1da240a5746"),
    bookId: ObjectId("5653b8d51a8178c223983966"),
    userId: ObjectId("5653a4efb2c7aa19102b5280"),
    approved: 0
  },{
    _id: ObjectId("5653bcae9318d1da240a5747"),
    bookId: ObjectId("5653b6219ad6087723fa1cc3"),
    userId: ObjectId("5653a4efb2c7aa19102b5280"),
    approved: 1
  },{
    _id: ObjectId("5653bcae9318d1da240a5748"),
    userId: ObjectId("5653a4efb2c7aa19102b5281"),
    bookId: ObjectId("5653b6219ad6087723fa1cc4"),    
    approved: 0
  },{
    _id: ObjectId("5653bcae9318d1da240a5749"),
    userId: ObjectId("5653a4efb2c7aa19102b5281"),
    bookId: ObjectId("5653b6219ad6087723fa1cc5"),
    approved: 1
  },{
    _id: ObjectId("5653bcae9318d1da240a574a"),
    userId: ObjectId("5653a4efb2c7aa19102b5281"),
    bookId: ObjectId("5653b6219ad6087723fa1cc6"),
    approved: 0
  },{
    _id: ObjectId("5653bcae9318d1da240a574b"),
    userId: ObjectId("5653a4efb2c7aa19102b5281"),
    bookId: ObjectId("5653b6219ad6087723fa1cc7"),
    aapproved: 1
  },{
    _id: ObjectId("5653bcae9318d1da240a574c"),
    userId: ObjectId("5653a4efb2c7aa19102b5281"),
    bookId: ObjectId("5653b6219ad6087723fa1cc8"),
    approved: 1
  }, function() {
      console.log('finished populating requests');
    }
  );
});