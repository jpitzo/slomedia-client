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
    
    var toggles = {
      single: [false,null,null],
      dbl: [false,null,null],
      lng: [false,null,null]
    }
    
    return {
        ondown: ondown,
        onturn: onturn
    }
    
    function registerToggle(fora, type){
      if (typeof fora === "function") {
          //code
          toggles[type][1] = toggles[type][2] = fora;
      }
      else if(typeof fora === 'object' && fora.length == 2){
        toggles[type][1] = fora[0];
        toggles[type][2] = fora[1];
      }
      else{
        console.log('warning!!! cb not set for type: ' + type);
      }
    }
    
    function callAction(type) {
        if (typeof toggles[type][1] !== 'function' &&
            typeof toggles[type][2] !== 'function') {
            // cb type is unregistered
            return;
        }
        
        (toggles[type][0] && toggles[type][2]()) || (!toggles[type][0] && toggles[type][1]());
        toggles[type][0] = !toggles[type][0];
    }
    
    function ondown(onSingle, onDouble, onLong){
        socket.on('buttonDown', function(data){
            doubleDown = lastDown;
            lastDown = new Date().getTime();
        });
        
        onup(onSingle, onDouble, onLong);
    }
    
    function onup(onSingle, onDouble, onLong){
      
      registerToggle(onSingle, 'single');
      registerToggle(onDouble, 'dbl');
      registerToggle(onLong, 'lng');
      
      console.log(toggles);
      
      socket.on('buttonUp', function(data){
          lastUp = new Date().getTime();
          
          if (doubleDown !== null && ((lastUp - doubleDown) < 450)) {
            // Boom, double click, clear single click and call double click cb
            clearTimeout(doubleClickEvent);
            callAction('dbl');
          }
          else if (lastDown !== null && ((lastUp - lastDown) > 3000)) {
            callAction('lng');
          }
          else{
            // Queue up single click event in case there is no double click
            doubleClickEvent = setTimeout(function(){
              doubleClick = 0;
              doubleClickEvent = null;
              callAction('single');
            }, 450);
          }
      });
    }
    
    function onturn(cb){
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
  }]);
