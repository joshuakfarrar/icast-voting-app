'use strict';

angular.module('icastApp')
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  });
