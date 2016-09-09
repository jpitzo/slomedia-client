'use strict';

/**
 * @ngdoc service
 * @name slofilmsFeApp.cityResolver
 * @description
 * # cityResolver
 * Service in the slofilmsFeApp.
 */
angular.module('slofilmsFeApp')
  .service('cityResolver', function ($q, $http) {
    var deferred = $q.defer()
    
    $http.get('http://sloserver.net:3000/cities/')
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
