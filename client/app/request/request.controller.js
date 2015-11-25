'use strict';

angular.module('workspaceApp')
  .controller('RequestCtrl', function ($scope, $http, Auth) {
    
    // Get current user
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;

	// Hide trade requests
	$scope.yourRequests = false;
	$scope.requestsForYou = false;

    // Get outstanding trade requests that are not approved

    // The list will contain book id requests that are approved
    var approvedRequestList = [ ];

    $http.get('/api/requests')
      .then(function successCallback(bookList) {
          $scope.tradeRequests = bookList.data;

          // Get book details for each book in trade requests
          $scope.tradeRequestsBooks = [ ];

          // Get list of approved books id
          $scope.yourTradeRequestsBooksApproved = [ ];

          for(var i in $scope.tradeRequests) {
            if($scope.tradeRequests[i].approved == 1)
              $scope.yourTradeRequestsBooksApproved.push($scope.tradeRequests[i].bookId);
            $http.get('/api/books/' + $scope.tradeRequests[i].bookId)
              .then(function successCallback(bookList) {
                  $scope.tradeRequestsBooks.push(bookList.data);
                }, function errorCallback(response) {
                  $scope.requestsMessage = 'Something went wrong, try again.';
            }).catch( function() {
              $scope.tradeRequestsMessage = '';
            });
          }
        }, function errorCallback(response) {
          $scope.tradeRequestsMessage = 'Something went wrong, try again.';
    }).catch( function() {
      $scope.tradeRequestsMessage = '';
    });

    $scope.deleteRequest = function(bookId, approved){

      // GET position take care of three arrays
      // var request = {
      //   bookId: bookId,
      //   userId: $scope.getCurrentUser()._id,
      //   approved: approved
      // };

      // console.log("deleteRequest from  -> " + $scope.yourTradeRequestsBooksApproved);
      // console.log("deleteRequest from  -> " + $scope.tradeRequestsBooks);

      // var count = 0;
      // for(var i in $scope.tradeRequestsBooks) {
      //   if($scope.tradeRequestsBooks[i].bookId == request.bookId && 
      //     $scope.tradeRequestsBooks[i].userId == request.userId && 
      //     $scope.tradeRequestsBooks[i].approved == request.approved) {
      //       $scope.tradeRequestsBooks.splice(i, 1);

      //       for(var j in $scope.yourTradeRequestsBooksApproved) {
      //         if($scope.yourTradeRequestsBooksApproved[j] == $scope.tradeRequestsBooks[i].bookId) {
      //           $scope.yourTradeRequestsBooksApproved.splice(j, 1);
      //           count++;
      //         }

      //       for(var j in $scope.yourTradeRequestsBooksApproved) {
      //         if($scope.yourTradeRequestsBooksApproved[j] == $scope.tradeRequestsBooks[i].bookId) {
      //           $scope.yourTradeRequestsBooksApproved.splice(j, 1);
      //           count++;
      //         }
      //       if(count == 1)
      //         break;
      //     }
      //   }
      // }
      // console.log("deleteRequest from  -> " + $scope.yourTradeRequestsBooksApproved);
      // console.log("deleteRequest from  -> " + $scope.tradeRequestsBooks);
    }
          
      // }

      // $http.detele('/api/requests', {request:request})
      //   .then(function successCallback(response) {
      //       $scope.deleteRequestMessage = "The trade request was deleted.";
      //     }, function errorCallback(response) {
      //       $scope.deleteRequestMessage = 'Something went wrong, try again.';
      // }).catch( function() {
      //   $scope.deleteRequestMessage = '';
      // });
    // }

    /*
     Choose requests type
	*/
    
    // Trade request type button click event
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
