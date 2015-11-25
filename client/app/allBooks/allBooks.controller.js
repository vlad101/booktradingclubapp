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

    // Trade button click event
    $scope.tradeBook = function(bookId){

      $scope.tradeBookMessage = '';

      var request = {
        bookId: bookId,
        userId: $scope.getCurrentUser()._id,
        approved: 0 
      };

      $http.post('/api/requests', {request:request})
        .then(function successCallback(response) {
            $scope.tradeBookMessage = "The trade request is placed.";
          }, function errorCallback(response) {
            $scope.tradeBookMessage = 'Something went wrong, try again.';
      }).catch( function() {
        $scope.tradeBookMessage = '';
      });
    }
  });
