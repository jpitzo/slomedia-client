'use strict';

/**
 * @ngdoc function
 * @name slofilmsFeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slofilmsFeApp
 */
angular.module('slofilmsFeApp')
  .controller('MainCtrl', ['$scope','socket','mastersocket', '$http', 'videos', function ($scope, socket, mastersocket, $http, videos) {
    $scope.time = 0;
    var videoIndex = 0;
    var playerSrcPrefix = "http://localhost:3000/videos/";
    
    var player = document.getElementsByTagName('video')[0];
    setPlayerSrc(videos[0]);
    
    socket.on('button', function(data){
      $scope.$apply(function () {
        $scope.button = data.button;
      });
      
      if (data.button) {
        $scope.next();
      }
    });
    socket.on('turn', function(data){
      player.currentTime = player.currentTime + data.delta;
    });
    mastersocket.on('sync', function(data){
      console.log('syncing');
      socket.emit('sync');
      videoIndex = 0;
      reload(true);
    });
    
    $scope.sync = function(){
      socket.emit('sync');
      videoIndex = 0;
      reload(true);
    }
    
    $scope.next = function(){
      videoIndex++
      if (videoIndex >= videos.length) {
        videoIndex = 0;
      }
      reload();
    }
    
    function reload(sync) {
      if (sync) {
        $scope.time = 0;
      }
      else{
        $scope.time = player.currentTime;
      }
      
      setPlayerSrc(videos[videoIndex]);
      player.load();
      player.currentTime = $scope.time;
      player.play();
      console.log(player.duration);
    }
    
    function setPlayerSrc(src){
      player.src = playerSrcPrefix + src;
    }
  }]);
