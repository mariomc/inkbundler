'use strict';

angular.module('inkbundlerApp', ['ngRoute', 'angularFileUpload', 'LocalStorageModule', 'ui.select2'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
