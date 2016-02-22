'use strict';

/**
 * @ngdoc service
 * @name slofilmsFeApp.constants
 * @description
 * # constants
 * Factory in the slofilmsFeApp.
 */
angular.module('slofilmsFeApp')
  .factory('constants', function () {

    // Public API here
    return {
      httpserver: 'http://sloserver.net:3000/',
      wsserver: 'sloserver.net:3000',
      wssync: 'raspberrypi_sync:3001'
    };
  });
