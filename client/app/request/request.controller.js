'use strict';

angular.module('workspaceApp')
  .controller('RequestCtrl', function ($scope, $http, Auth) {
    
    // Get current user
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;

	// Hide trade requests
	$scope.yourRequests = false;
	$scope.requestsForYou = false;

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
        approved: false 
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

    /*
     Choose requests type
	*/
    
    // Trade request type button click event
    $scope.chooseRequestType = function(actionId){
    	if(actionId == 1) {
    		// Show your trade requets
	    	$scope.yourRequests = true;
	    	$scope.requestsForYou = false;
	    	console.log("yourRequests");
		} else {
			// Show trade requests for you
	    	$scope.requestsForYou = true;
	    	$scope.yourRequests = false;
	    	console.log("requestsForYou");
		}
    }
  });
