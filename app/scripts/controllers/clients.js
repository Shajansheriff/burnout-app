'use strict';

/**
 * @ngdoc function
 * @name burnoutApp.controller:ClientsCtrl
 * @description
 * # ClientsCtrl
 * Controller of the burnoutApp
 */
angular.module('burnoutApp')
  .controller('ClientsCtrl', function ($scope, $route, Restangular, ngToast) {
    $scope.empty_clientlist = true;
    $scope.projects = [];
    $scope.clients = [];
    var baseClients = Restangular.all('clients/');
    baseClients.getList().then(function(response){
        if(response.length){
            console.log(response.length)
            $scope.clients = response
            $scope.empty_clientlist = false;
        }
        else {
            $scope.empty_clientlist = true;
        }
    }, function(){

    });
    
    $scope.client = {
    	name: '',
    	address: '',
    	email: ''
    };
    
    $scope.addClient = function () {
        baseClients.post($scope.client).then(function(response) {
            $('#clientModal').modal('toggle');
            $scope.empty_clientlist = false;
		    ngToast.create({
                content: response.name + ' created Successfully!',
                timeout: 2000,
                animation: 'fade'
            })
		    $scope.clients.push(response)
		  }, function() {
		    ngToast.danger({
                content: 'Error Occured created!',
                timeout: 2000,
                animation: 'fade'
            })
		  });

    	console.log($scope.client.indexOf())
    }

    $scope.deleteClient = function(client){
        if(client){
            Restangular.one('clients', client.id).remove()
                .then(function(response){
                    console.log(response)
                    $scope.clients.splice($scope.clients.indexOf(client), 1)
                    ngToast.warning({
                        content:'Deleted Successfully!',
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
    }
    console.log($scope.projects)
    
  });
