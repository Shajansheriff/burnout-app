'use strict';

/**
 * @ngdoc function
 * @name burnoutApp.controller:ClientProjectsCtrl
 * @description
 * # ClientProjectsCtrl
 * Controller of the burnoutApp
 */
angular.module('burnoutApp')
  .controller('ClientProjectsCtrl', function ($scope, Restangular, $routeParams) {
  	$scope.empty_projectlist = true;
  	$scope.project = {
  		name: '',
  		cost_per_hour: '',
  		start_date: '',
  		end_date: '',
  		total_cost: '',
  		completed: '',
  		client: ''
  	}
  	$scope.projects = []
  	console.log($scope.projects)
  	var client_id  = $routeParams.id;
  	if(client_id){
  		Restangular.one('clients', client_id).get()
  			.then(function(response){
  				$scope.client_id = client_id;
			  	console.log(client_id)
			    Restangular.one('clients', client_id).all('projects').getList()
			    	.then(function(response){
			    		if (response.length) {
			    			$scope.projects = response;
			    		}
			    	},function(response){
			    		console.log('rgeg')
		    	})
	    	})
  	}

  	
  });
