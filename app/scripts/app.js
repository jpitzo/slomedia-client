'use strict';

/**
 * @ngdoc overview
 * @name slofilmsFeApp
 * @description
 * # slofilmsFeApp
 *
 * Main module of the application.
 */
angular
  .module('slofilmsFeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          'videos': function(videoResolver){
            return videoResolver;
          },
          'cities': function(cityResolver){
            return cityResolver;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
