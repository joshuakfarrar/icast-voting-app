'use strict';

angular.module('icastApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    if (Auth.isLoggedIn()) {
      $location.path('/dashboard');
    }

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          badge: $scope.user.badge,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/dashboard');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors.other = err.message;
        });
      }
    };
  });
