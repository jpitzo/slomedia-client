'use strict';

/**
 * @ngdoc service
 * @name slofilmsFeApp.socket
 * @description
 * # socket
 * Factory in the slofilmsFeApp.
 */
angular.module('slofilmsFeApp')
  .factory('socket', function () {
    var socket = io.connect('sloserver.net:3000');

    return {
      on: function(eventName, callback){
        socket.on(eventName, callback);
      },
      emit: function(eventName, data) {
        socket.emit(eventName, data);
      }
    };
  });
