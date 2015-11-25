'use strict';

angular.module('workspaceApp')
  .controller('RequestCtrl', function ($scope, $http, Auth) {
    
    // Get current user
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;

	// Hide trade requests
	$scope.yourRequests = false;
	$scope.requestsForYou = false;;

    // Get book trade requests along with the book info
    $http.get('/api/bookRequests')
      .then(function successCallback(bookRequestList) {
      	$scope.bookRequestList = bookRequestList.data;
      	// Query example of dictionary
      	// for(var i in $scope.bookRequestList ) {
      	// 	console.log("Request ID -> " + i);
      	// 	console.log("GoogleId -> " + $scope.bookRequestList[i].googleId);
      	// }
        }, function errorCallback(response) {
          $scope.requestListMessage = 'Something went wrong, try again.';
    }).catch( function() {
      $scope.requestListMessage = '';
    });

    // Get book trade requests that are not approved
    $http.get('/api/requests')
      .then(function successCallback(requestList) {
      	$scope.requestList = requestList.data;

      	$scope.yourRequestList = [ ];
      	for(var i in $scope.requestList) {
      		if($scope.requestList[i].userId == $scope.getCurrentUser()._id)
      			$scope.yourRequestList.push($scope.requestList[i])
      	}

        }, function errorCallback(response) {
          $scope.requestListMessage = 'Something went wrong, try again.';
    }).catch( function() {
      $scope.requestListMessage = '';
    });

    $scope.deleteRequest = function(requestId){

    // Remove request from DB
      $http.delete('/api/requests/' + requestId)
        .then(function successCallback(response) {
        	// Remove request from fromnt end
	    	for(var i = 0; i < $scope.yourRequestList.length; i++) {
	    		if($scope.yourRequestList[i]._id == requestId) {
	    			$scope.yourRequestList.splice(i, 1);
	    		}
	    	}
            $scope.deleteRequestMessage = "The trade request was deleted.";
          }, function errorCallback(response) {
            $scope.deleteRequestMessage = 'Something went wrong, try again.';
      }).catch( function() {
        $scope.deleteRequestMessage = '';
      });
    }

    
    //Choose requests type
    $scope.chooseRequestType = function(actionId){
      	if(actionId == 1) {
      		// Show your trade requets
  	    	$scope.yourRequests = true;
  	    	$scope.requestsForYou = false;
  		} else {
  			// Show trade requests for you
  	    	$scope.requestsForYou = true;
  	    	$scope.yourRequests = false;
  		}
    }
  });
