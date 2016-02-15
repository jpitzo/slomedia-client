'use strict';

/**
 * @ngdoc function
 * @name slofilmsFeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slofilmsFeApp
 */
angular.module('slofilmsFeApp')
  .controller('MainCtrl', ['$scope','socket','mastersocket', '$http', 'videos', 'button',
                           function ($scope, socket, mastersocket, $http, media, button) {
    $scope.time = 0;
    var syncBusy = false;
    var videoIndex = 0;
    var audioIndex = 0;
    $scope.oos = false;

    var playerSrcPrefix = "http://sloserver.net:3000/media/";
    
    var videoplayer = document.getElementsByTagName('video')[0];
    var audioplayer = document.getElementsByTagName('audio')[0];

    if(media.length < 1){
        // No vidz bruh bruh!
        return;
    }

    setPlayerSrc(media[0]);
    
    
    button.ondown(function(){
      if ($scope.oos === false) {
        $scope.demux();
      }
      $scope.$apply(function(){
        $scope.oos = true;
        $('body').addClass('oos');
      });
    },
    function(){
      $scope.$apply(function(){
        if ($scope.oos === true) {
          $scope.remux();
        }
        $scope.oos = false;
        $('body').removeClass('oos');
      });
    });

    socket.on('turn', function(data){
      //setPlayerTime(videoplayer.currentTime + data.delta);
      
      if (!syncBusy && Math.abs(data.delta) > 1) {
        syncBusy = true;
        if (data.delta < 0) {
          $scope.next();  
        }
        else{
          $scope.previous();
        }
        setTimeout(function(){
          syncBusy = false;
        }, 250);
      }
      
    });
    mastersocket.on('sync', function(data){
      socket.emit('sync');
      videoIndex = 0;
      audioIndex = 0;
      $scope.$apply(function(){
        $scope.oos = false;
        $('body').removeClass('oos');
      });
      reload(true);
    });
    
    $scope.sync = function(){
      socket.emit('sync');
      videoIndex = 0;
      audioIndex = 0;
      console.log('here');
      $scope.$apply(function(){
        $scope.oos = false;
        $('body').removeClass('oos');
      });
      reload(true);
    }
    
    $scope.demux = function(){
      audioIndex = audioIndex + 1;
      if (audioIndex >= media.length) {
        audioIndex = 0;
      }
      reloadAudio();
    }
    
    $scope.remux = function(){
      audioIndex = videoIndex;
      reloadAudio();
    }
    
    $scope.next = function(){
      videoIndex++
      audioIndex++
      if (videoIndex >= media.length) {
        videoIndex = 0;
      }
      if (audioIndex >= media.length) {
        audioIndex = 0;
      }
      reloadAudio();
      reloadVideo();
    }
    
    $scope.previous = function(){
      videoIndex--;
      audioIndex--;
      if (videoIndex < 0) {
        videoIndex = media.length -1;
      }
      if (audioIndex < 0) {
        audioIndex = media.length -1;
      }
      reloadAudio();
      reloadVideo();
    }
    
    function reload(sync) {
      if (sync) {
        $scope.time = 0;
      }
      else{
        $scope.time = videoplayer.currentTime;
      }
      
      setPlayerSrc(media[videoIndex]);

      videoplayer.load();
      audioplayer.load();

      setPlayerTime($scope.time);

      videoplayer.play();
      audioplayer.play();
    }
    
    function reloadAudio(sync) {
      if (sync) {
        $scope.time = 0;
      }
      else{
        $scope.time = audioplayer.currentTime;
      }
      
      audioplayer.src = playerSrcPrefix + media[audioIndex][1];

      audioplayer.load();

      setPlayerTime($scope.time);
      audioplayer.currentTime = $scope.time

      audioplayer.play();
    }
    
    function reloadVideo(sync) {
      if (sync) {
        $scope.time = 0;
      }
      else{
        $scope.time = videoplayer.currentTime;
      }
      
      videoplayer.src = playerSrcPrefix + media[videoIndex][0];

      videoplayer.load();

      videoplayer.currentTime = $scope.time;

      videoplayer.play();
    }
    
    function setPlayerSrc(src){
      videoplayer.src = playerSrcPrefix + src[0];
      audioplayer.src = playerSrcPrefix + src[1];
    }

    function setPlayerTime(time){
      videoplayer.currentTime = time;
      audioplayer.currentTime = time;
    }
  }]);
