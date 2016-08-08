'use strict';

/**
 * @ngdoc function
 * @name burnoutApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the burnoutApp
 */
angular.module('burnoutApp')
  .controller('ProjectCtrl', function ($scope, $routeParams, Restangular) {
    var project_id = $routeParams.id
    if(project_id){
    	Restangular.one('projects', project_id).get().then(function(response){
    		console.log(response)
    		$scope.project = response
    	})
    	Restangular.one('projects', project_id).all('timeline').getList()
    		.then(function(response){
    			$scope.project_timelines = response
    		}, function(){

    		})
    }
  });
