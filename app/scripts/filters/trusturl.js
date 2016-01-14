'use strict';

/**
 * @ngdoc filter
 * @name slofilmsFeApp.filter:trustUrl
 * @function
 * @description
 * # trustUrl
 * Filter in the slofilmsFeApp.
 */
angular.module('slofilmsFeApp')
  .filter('trustUrl', ['$sce', function ($sce) {
    return function (recordingUrl) {
      return $sce.trustAsResourceUrl(recordingUrl);
    };
  }]);
