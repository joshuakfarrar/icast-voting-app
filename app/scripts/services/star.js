'use strict';

angular.module('icastApp')
  .factory('Star', function (Stars, $location) {

    return {

      /**
       * Authenticate user
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      star: function(star, callback) {
        var cb = callback || angular.noop;

        return Stars.save({
          product: star.product,
          description: star.description
        }, function(user) {
          return cb();
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Unauthenticate user
       *
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      unstar: function(product, callback) {
        var cb = callback || angular.noop;

        return Stars.delete(product, function() {
          return cb();
        },
        function(err) {
          return cb(err);
        }).$promise;
      }
    };
  });
