'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/allBooks', {
        templateUrl: 'app/allBooks/allBooks.html',
        controller: 'AllBooksCtrl'
      });
  });
