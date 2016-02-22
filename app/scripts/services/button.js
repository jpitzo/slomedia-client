'use strict';

/**
 * @ngdoc service
 * @name slofilmsFeApp.button
 * @description
 * # button
 * Service in the slofilmsFeApp.
 */
angular.module('slofilmsFeApp')
  .service('button', ['socket', function (socket) {
    var doubleClick = 0;
    var doubleClickEvent = null;
    
    var ondown = function(onSingle, onDouble){
        socket.on('buttonDown', function(data){
            if (doubleClick !== 0) {
              clearTimeout(doubleClickEvent);
              doubleClickEvent = null;
              doubleClick = 0;
              onDouble();
            }
            else{
              doubleClick++;
              doubleClickEvent = setTimeout(function(){
                doubleClick = 0;
                doubleClickEvent = null;
                onSingle();
              }, 450);
            } 
        });
    }
    
    
    return {
        ondown: ondown
    }
  }]);
