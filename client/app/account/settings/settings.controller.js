'use strict';

angular.module('workspaceApp')
  .controller('SettingsCtrl', function ($scope, $http, User, Auth) {

    // Initialize errors for change password form
    $scope.errors = {};

    // Get current user
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    // Prepolulate update profile form with user data
    $scope.user = {
      _id: $scope.getCurrentUser()._id,
      name: $scope.getCurrentUser().name,
      city: $scope.getCurrentUser().city,
      state: $scope.getCurrentUser().state
    };

    $scope.updateProfile = function(form) {
      $scope.submittedUpdatedProfile = true;

      // Check if form is valid
      if(form.$valid) {
        // Update user profile db
        $http.put('/api/users/updateProfile', { user:$scope.user })
          .then(function successCallback(response) {
              $scope.messageUpdateProfile = 'Profile successfully updated.';
            }, function errorCallback(response) {
              $scope.messageUpdateProfile = 'Something went wrong, try again.';
        }).catch( function() {
          $scope.messageUpdateProfile = '';
        });
      }
    };

    $scope.changePassword = function(form) {
      $scope.submittedChangePassword = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.messageChangePassword = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.otherChangePassword = 'Incorrect password';
          $scope.messageChangePassword = '';
        });
      }
		};
  });
