'use strict';

angular.module('icastApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
