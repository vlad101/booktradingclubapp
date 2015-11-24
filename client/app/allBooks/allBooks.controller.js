'use strict';

angular.module('workspaceApp')
  .controller('AllBooksCtrl', function ($scope, $http, Auth) {
    
    // Get current user
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;

    // Get at all book from DB
    $http.get('/api/books')
      .then(function successCallback(bookList) {
          $scope.bookList = bookList.data;
        }, function errorCallback(response) {
          $scope.bookList = 'Something went wrong, try again.';
    }).catch( function() {
      $scope.bookList = '';
    });
  });
