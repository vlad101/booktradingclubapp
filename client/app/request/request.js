'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/requests', {
        templateUrl: 'app/request/request.html',
        controller: 'RequestCtrl'
      });
  });
