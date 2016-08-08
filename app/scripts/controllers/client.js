'use strict';

/**
 * @ngdoc function
 * @name burnoutApp.controller:ClientCtrl
 * @description
 * # ClientCtrl
 * Controller of the burnoutApp
 */
angular.module('burnoutApp')
  .controller('ClientCtrl', function ($scope, $route, $routeParams, Restangular, ngToast) {
    $scope.client_id = $routeParams.id
    //var baseClients = Restangular.all('clients/');
    Restangular.one('clients', $scope.client_id).get()
    .then(function(response) {
	    $scope.client = response
	    Restangular.one('clients',$scope.client.id).all('projects').getList()
	    	.then(function(response) {
	    		console.log(response);
	    		if(response.length){
	    			console.log(response.length)
	    			$scope.projects = response;
	    			$scope.empty_projectlist = false;
	    		}
	    		else {
	    			$scope.empty_projectlist = true;
	    		}
	    	},function() {
	    		console.log("There was an error saving");
	  		})
  	}, function() {
	    console.log("There was an error saving");
  	})

  });
