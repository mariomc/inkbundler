'use strict';

var UglifyJS = require('uglify-js');


angular.module('inkbundlerApp', ['ngRoute', 'LocalStorageModule', 'ui.select2'])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
