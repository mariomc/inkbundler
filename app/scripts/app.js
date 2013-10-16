'use strict';

angular.module('inkbundlerApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).
      when('/less', {
        templateUrl: 'views/less.html',
        controller: 'LessCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
