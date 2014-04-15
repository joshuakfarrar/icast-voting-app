'use strict';

angular.module('icastApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $location) {

    if (Auth.isLoggedIn()) {
      $location.path('/dashboard');
    }

    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });
