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
    
    var doubleDown = null;
    var lastDown = null;
    var doubleUp = null;
    var lastUp = null;
    
    var turnBusy = false;
    
    var ondown = function(onSingle, onDouble, onLong){
        socket.on('buttonDown', function(data){
            doubleDown = lastDown;
            lastDown = new Date().getTime();
        });
        
        onup(onSingle, onDouble, onLong);
    }
    
    var onup = function(onSingle, onDouble, onLong){
      socket.on('buttonUp', function(data){
          lastUp = new Date().getTime();
          
          if (doubleDown !== null && ((lastUp - doubleDown) < 450)) {
            // Boom, double click, clear single click and call double click cb
            clearTimeout(doubleClickEvent);
            onDouble();
          }
          else if (lastDown !== null && ((lastUp - lastDown) > 3000)) {
            onLong();
          }
          else{
            // Queue up single click event in case there is no double click
            doubleClickEvent = setTimeout(function(){
              doubleClick = 0;
              doubleClickEvent = null;
              onSingle();
            }, 450);
          }
      });
    }
    
    var onlongpress = function(onlp){
        socket.on('buttonLongPress', function(data){
           onlp();
        });
    }
    
    var onturn = function(cb){
      socket.on('turn', function(data){
        if (!turnBusy && Math.abs(data.delta) > 1) {
          turnBusy = true;
          cb(data);
          setTimeout(function(){
            turnBusy = false;
          }, 250);
        }
      });
    }
    
    return {
        ondown: ondown,
        onlongpress: onlongpress,
        onturn: onturn,
    }
  }]);
