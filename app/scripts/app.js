'use strict';

var UglifyJS = require('uglify-js');


angular.module('jsbundler', ['ngRoute', 'LocalStorageModule', 'ui.select2'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
