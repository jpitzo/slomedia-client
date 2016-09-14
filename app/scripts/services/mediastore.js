'use strict';

/**
 * @ngdoc service
 * @name slofilmsFeApp.mediaStore
 * @description
 * # mediaStore
 * Service in the slofilmsFeApp.
 */
angular.module('slofilmsFeApp')
  .service('mediaStore', function (constants) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var media = [];
    var videoplayer = document.getElementsByTagName('video')[0];
    var audioplayer = document.getElementsByTagName('audio')[0];
    
    var videoIndex;
    var audioIndex;
    
    var audiotime;
    var videotime;
    
    var playerURIBase = constants.httpserver;
    
    return function(list, srcExtra){
        var playerSrcPrefix = playerURIBase;
        if (srcExtra) {
            playerSrcPrefix += srcExtra;
        }
        
        media = list;
        videoIndex = 0;
        audioIndex = 0;
        
        audiotime = 0;
        videotime = 0;
        
        reloadVideo();
        reloadAudio();
        
        return {
            next: next,
            previous: previous,
            reloadAudio: reloadAudio,
            reloadVideo: reloadVideo,
            syncAudioToVideo: syncAudioToVideo,
            setVideoIndex: function(i){ videoIndex = i },
            setAudioIndex: function(i){ audioIndex = i },
            getMediaLenght: function(i){ media.length },
        }
        
        function syncAudioToVideo(){
            audioIndex = videoIndex;
            reloadAudio();
        }
        
        function next(audio, video){
            if (audio === undefined) {
                audio = true;
            }
            if (video === undefined) {
                video = true;
            }
            
            if (video) {
                videoIndex++;
                if (videoIndex >= media.length) {
                  videoIndex = 0;
                }
                reloadVideo();
            }
            
            if (audio) {
              audioIndex++;
              if (audioIndex >= media.length) {
                audioIndex = 0;
              }
              reloadAudio();
            }
            
        }
        function previous(audio, video){
            if (audio === undefined) {
                audio = true;
            }
            if (video === undefined) {
                video = true;
            }
            
            if (video) {
                videoIndex--;
                if (videoIndex < 0) {
                  videoIndex = media.length -1;
                }
                reloadVideo();
            }
            
            if (audio) {
                audioIndex--;
                if (audioIndex < 0) {
                  audioIndex = media.length -1;
                }
                reloadAudio();
            }
        }
        
        function reloadAudio(sync){
            if (sync) {
              audiotime = 0;
            }
            else{
              audiotime = audioplayer.currentTime;
            }
            
            audioplayer.src = playerSrcPrefix + media[audioIndex][1];
            audioplayer.load();
      
            audioplayer.currentTime = audiotime
      
            audioplayer.play();
        }
        
        function reloadVideo(sync){
            if (sync) {
              videotime = 0;
            }
            else{
              videotime = videoplayer.currentTime;
            }
            
            videoplayer.src = playerSrcPrefix + media[videoIndex][0];
      
            videoplayer.load();
      
            videoplayer.currentTime = videotime;
      
            videoplayer.play();
        }
    }
    
  });
