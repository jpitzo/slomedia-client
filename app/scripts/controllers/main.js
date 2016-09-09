'use strict';

/**
 * @ngdoc function
 * @name slofilmsFeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slofilmsFeApp
 */
angular.module('slofilmsFeApp')
  .controller('MainCtrl', ['$scope','socket','mastersocket', '$http', 'videos', 'cities', 'button', 'constants',
                           'controlActions', 'controlEvents', 'mediaStore',
                           function ($scope, socket, mastersocket, $http, media, cities, button, constants,
                                     controlActions, controlEvents, mediaStore) {
    $scope.time = 0;
    var syncBusy = false;
    var videoIndex = 0;
    var audioIndex = 0;
    var mediaService = mediaStore(media);
    $scope.oos = false;

    var playerSrcPrefix = constants.httpserver;
    
    var videoplayer = document.getElementsByTagName('video')[0];
    var audioplayer = document.getElementsByTagName('audio')[0];
    
    // Hack for now: "Miami Mode"
    var miamiModeKey = null
    if (cities.length > 0) {
        miamiModeKey = cities[0];
    }
    
    button.ondown(function(){
      // Change audio on down
      mediaService.next(true,false);
      
      // Old code!!
      //if ($scope.oos === false) {
        // We're demuxing, so split audio and video
      //  $scope.demux();
      //}
      //else{
        // We're already demuxed, so change audio
      //  mediaService.next(true,false); 
      //}
    },
    function(){
      $http.get('http://sloserver.net:3000/media/')
      .then(function(resp){
        mediaService = mediaStore(resp.data);
      });
      
      //TODO: clean up old double click remux code
      //$scope.$apply(function(){
      //  if ($scope.oos === true) {
      //    $scope.remux();
      //  }
      //  $scope.oos = false;
      //  setUiOOS(false);
      //});
    },
    function(){
      $http.get('http://sloserver.net:3000/media/' + miamiModeKey + '/')
      .then(function(resp){
        mediaService = mediaStore(resp.data, miamiModeKey + '/');
      });
    });
    
    button.onturn(function(data){
        if (data.delta > 1) {
            mediaService.next(false,true);
        }
        else if (data.delta < -1) {
            mediaService.previous(false,true);
        }
    })
    
    // Not sure when this would run??
    mastersocket.on('keypress', function(data){
      socket.emit('sync');
      mediaService.setVideoIndex(0);
      mediaService.setAudioIndex(0);
      $scope.$apply(function(){
        $scope.oos = false;
        setUiOOS(false);
      });
      mediaService.reloadAudio(true);
      mediaService.reloadVideo(true);
      $('body').addClass('sync');
      setTimeout(function(){
        $('body').removeClass('sync');
      }, 7000);
    });
    
    $scope.demux = function(){
      // Should eventually be random audio
      $http.get(constants.httpserver + 'pulse/start/');
      mediaService.next();
      $scope.$apply(function(){
        $scope.oos = true;
        setUiOOS(true);
      });
    }
    
    //TODO: Fix me!!
    $scope.remux = function(){
      $http.get(constants.httpserver + 'pulse/stop/');
      audioIndex = videoIndex;
      reloadAudio();
    }

    function setUiOOS(oos) {
        if (oos === true) {
          $('.wrap').addClass('oos');
          $('.oostext').show();
        }
        else{
          $('.wrap').removeClass('oos');
          $('.oostext').hide();
        }
    }
  }]);
