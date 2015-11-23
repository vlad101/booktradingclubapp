/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');

// Add test users
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User 1',
    email: 'test1@test1.com',
    city: 'Brooklyn',
    state: 'NY',
    password: 'test1'
  },{
    provider: 'local',
    name: 'Test User 2',
    email: 'test2@test2.com',
    city: 'Boston',
    state: 'MA',
    password: 'test2'
  },{
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

// Add test books

// Add test requests