'use strict';

angular.module('icastApp')
  .factory('Stars', function ($resource) {
    return $resource('/api/stars/:id', {
      id: '@id'
    });
  });
