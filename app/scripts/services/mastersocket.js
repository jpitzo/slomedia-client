'use strict';

/**
 * @ngdoc service
 * @name slofilmsFeApp.mastersocket
 * @description
 * # mastersocket
 * Factory in the slofilmsFeApp.
 */
angular.module('slofilmsFeApp')
  .factory('mastersocket', ['constants', function (constants) {
    var socket = io.connect(constants.wssync);

    return {
      on: function(eventName, callback){
        socket.on(eventName, callback);
      },
      emit: function(eventName, data) {
        socket.emit(eventName, data);
      }
    };
  }]);
