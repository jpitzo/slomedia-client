'use strict';

/**
 * @ngdoc service
 * @name slofilmsFeApp.mastersocket
 * @description
 * # mastersocket
 * Factory in the slofilmsFeApp.
 */
angular.module('slofilmsFeApp')
  .factory('mastersocket', function () {
    var socket = io.connect('raspberrypi_sync:3001');

    return {
      on: function(eventName, callback){
        socket.on(eventName, callback);
      },
      emit: function(eventName, data) {
        socket.emit(eventName, data);
      }
    };
  });
