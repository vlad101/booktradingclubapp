'use strict';

angular.module('workspaceApp')
  .controller('MyBooksCtrl', function ($scope, $http, Auth) {
    
    // Get current user
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;

    // Get all book from DB
    $http.get('/api/books')
      .then(function successCallback(bookList) {
          $scope.bookList = bookList.data;
        }, function errorCallback(response) {
          $scope.bookList = 'Something went wrong, try again.';
    }).catch( function() {
      $scope.bookList = '';
    });

    // Add book form
    $scope.addBookForm = {
      bookGoogleId: ""
    };

    // Add book button click event
    $scope.addBook = function(){

      $scope.addBookMessage = '';
      $scope.deleteBookMessage = '';

      // Get form google book id
      var book = {
        userId: $scope.getCurrentUser()._id,
        googleId: $scope.addBookForm.bookGoogleId
      };

      // Do not add a book if a current user has a book
      for(var i in $scope.bookList) {
        if($scope.bookList[i].userId == book.userId && $scope.bookList[i].googleId == book.googleId) {
          $scope.addBookMessage = "Book already exists.";
          return;
        }
      }

      // Add a book to DB
      $http.post('/api/books/', {book:book})
        .then(function successCallback(response) {

          // Add the book to the book list
          $scope.bookList.push(response.data);

          $scope.addBookMessage = "The book was added.";
        }, function errorCallback(response) {
          $scope.addBookMessage = 'Something went wrong, try again.';
      }).catch( function() {
        $scope.addBookMessage = '';
      });

      $scope.addBookForm.bookGoogleId = '';
    }

    // Delete book button click event
    $scope.deleteBook = function(bookId){

      $scope.deleteBookMessage = '';
      $scope.addBookMessage = '';

      $http.delete('/api/books/' + bookId)
        .then(function successCallback(response) {

            // Remove the book from the bok list
            for(var i = $scope.bookList.length - 1; i >= 0; i--) {
              if($scope.bookList[i]._id == bookId) {
                 $scope.bookList.splice(i, 1);
              }
            }
            $scope.deleteBookMessage = "The book was deleted.";
          }, function errorCallback(response) {
            $scope.deleteBookMessage = 'Something went wrong, try again.';
      }).catch( function() {
        $scope.deleteBookMessage = '';
      });
    }
});