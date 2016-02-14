'use strict';

/**
 * @ngdoc service
 * @name slofilmsFeApp.videoResolver
 * @description
 * # videoResolver
 * Factory in the slofilmsFeApp.
 */
angular.module('slofilmsFeApp')
  .factory('videoResolver', function ($q, $http) {
    var deferred = $q.defer()
    
    $http.get('http://sloserver.net:3000/media/')
    .then(function(resp){
      deferred.resolve(resp.data);
    })
    .catch(function(error){
      console.log(error)
      deferred.reject();
    });

    // Public API here
    return deferred.promise;
  });
