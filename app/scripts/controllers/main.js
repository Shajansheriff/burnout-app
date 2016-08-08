'use strict';

/**
 * @ngdoc function
 * @name burnoutApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the burnoutApp
 */
angular.module('burnoutApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.navbar = ['home', 'clients']
  });
