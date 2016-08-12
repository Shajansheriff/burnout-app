'use strict';

/**
 * @ngdoc function
 * @name burnoutApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the burnoutApp
 */
angular.module('burnoutApp')
  .controller('ProjectCtrl', function ($scope, $routeParams, Restangular, ngToast) {
    var project_id = $routeParams.id;
    $scope.loading = true;
    $scope.project_id = project_id;
    $scope.project = ''
    $scope.project_timelines = []
    if(project_id){
    	Restangular.one('projects', project_id).get()
            .then(function(response){
    		      console.log(response)
    		      $scope.project = response
                  Restangular.one('projects', project_id).getList('timeline')
                    .then(function(response){
                        $scope.project_timelines = response
                    }, function(response){

                    })
	       }, function(response){
            console.log('not found')
            $scope.project_not_found = true;
            ngToast.danger({
                content: 'Project Not Found',
            })
           })

        $scope.createTimeline = function (argument) {
            var baseTimeline = Restangular.all('project-timeline');
            $scope.project_timeline.project = project_id;
            baseTimeline.post($scope.project_timeline)
                .then(function(response){
                    console.log(response)
                    $scope.project_timelines.push(response)
                    $scope.project.expense += response.time_spent * $scope.project.cost_per_hour;
                    $scope.project.total_hours_spent += response.time_spent;
                    $scope.project_timeline =''
                }, function(response){
                    console.log(response)
                    ngToast.danger('Error Occured. Please Try Again')
                })
        }

    }

    $('#datetimepicker').datetimepicker({
        format: 'YYYY-MM-DD'
    });


  });
