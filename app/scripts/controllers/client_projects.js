'use strict';

/**
 * @ngdoc function
 * @name burnoutApp.controller:ClientProjectsCtrl
 * @description
 * # ClientProjectsCtrl
 * Controller of the burnoutApp
 */
angular.module('burnoutApp')
  .controller('ClientProjectsCtrl', function ($scope, Restangular, $routeParams, ngToast) {
  	$scope.empty_projectlist = true;
  	// $scope.project = {
  	// 	name: '',
  	// 	cost_per_hour: '',
  	// 	start_date: '',
  	// 	end_date: '',
  	// 	total_cost: '',
  	// 	client: ''
  	// }
  	$scope.projects = []
  	console.log($scope.projects)
  	var client_id  = $routeParams.id;
  	if(client_id){
  		Restangular.one('clients', client_id).get()
  			.then(function(response){
  				$scope.client_id = client_id;
          $scope.client = response
			  	console.log(client_id)
			    Restangular.one('clients', client_id).all('projects').getList()
			    	.then(function(response){
			    		console.log(response)
			    		if (response.length) {
			    			$scope.projects = response;
			    		}
			    	},function(response){
			    		console.log('rgeg')
		    	})
	    	})
  	}
		var baseProjects = Restangular.all('projects/');
    $scope.addProject = function(client){
      $scope.project.client = $scope.client_id;
      // console.log($scope.project);
    	baseProjects.post($scope.project)
    		.then(function(response){
          $scope.projects.push(response);
    			$('#addProjectModal').modal('toggle');
    			ngToast.create({
                content: response.name + ' Project created Successfully!',
                timeout: 2000,
                animation: 'fade'
            })
    		}
    		, function(response){
    			console.log(response)
    			$('#addProjectModal').modal('toggle');
    			ngToast.danger({
                content: 'Error Occured',
                timeout: 2000,
                animation: 'fade'
            })
    		})
    }

    $scope.deleteProject = function(project){
      Restangular.one('projects', project.id).remove()
        .then(function(response){
          $scope.projects.splice($scope.projects.indexOf(project), 1)
          ngToast.create({
                content: 'Deleted created Successfully!',
                timeout: 2000,
                animation: 'fade'
            })
        }, function(response){
          ngToast.danger({
                content: 'Error Occured',
                timeout: 2000,
                animation: 'fade'
            })
        })
    }
    $scope.setProject = function(project){
      console.log(project)
      $scope.project = project;
    }
    $scope.editProject = function(){
      // $scope.project = project;
      $scope.project.put().then(function(response){
          $('#editProjectModal').modal('toggle');
         $('#editClientModal').modal('toggle');
         ngToast.create({
          content: 'Updated Successfully',
          timeout: 2000
         });
      }, function(response){
        ngToast.danger({
          content: 'Error Occured',
          timeout: 2000
         });
        console.log('error')
      })
    }

    $('#editProjectModal').on('hidden.bs.modal', function ($scope) {
      $scope.project = '';
      console.log('hello')
    });
  	
  });
