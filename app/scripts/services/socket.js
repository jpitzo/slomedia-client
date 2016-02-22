'use strict';

/**
 * @ngdoc service
 * @name slofilmsFeApp.socket
 * @description
 * # socket
 * Factory in the slofilmsFeApp.
 */
angular.module('slofilmsFeApp')
  .factory('socket', ['constants', function (constants) {
    var socket = io.connect(constants.wsserver);

    return {
      on: function(eventName, callback){
        socket.on(eventName, callback);
      },
      emit: function(eventName, data) {
        socket.emit(eventName, data);
      }
    };
  }]);
