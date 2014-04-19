'use strict';

angular.module('icastApp')
  .controller('DashboardCtrl', function ($http, $scope, Star) {
    $scope.stars = [];

    $http.get('/api/stars').success(function(stars) {
      $scope.stars = stars;
    });

    $scope.star = function(form) {
      $scope.submitted = true;
      $scope.errors = {};

      if(form.$valid) {
        Star.star({
          product: $scope.star.product,
          description: $scope.star.description
        })
        .then( function(star) {
          $scope.stars.push(star);
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    }

    $scope.unstar = function(product) {
      Star.unstar({
        product: product
      })
      .then( function() {
        for (var k = 0; k < $scope.stars.length; k++) {
          if ($scope.stars[k].product === product) {
            $scope.stars.splice(k, 1);
            k--;
          }
        }
      })
      .catch( function(err) {
        console.log('unstar error');
      });
    }
  });
