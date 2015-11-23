'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/myBooks', {
        templateUrl: 'app/myBooks/myBooks.html',
        controller: 'MyBooksCtrl'
      });
  });
