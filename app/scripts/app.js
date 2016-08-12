'use strict';

/**
 * @ngdoc overview
 * @name burnoutApp
 * @description
 * # burnoutApp
 *
 * Main module of the application.
 */
angular
  .module('burnoutApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular',
    'ngToast',
    'ng.httpLoader'
  ])
  .config(function ($routeProvider, RestangularProvider, httpMethodInterceptorProvider) {

    httpMethodInterceptorProvider.whitelistDomain('burnout-api.herokuapp.com');
    httpMethodInterceptorProvider.whitelistDomain('twitter.com');
    RestangularProvider.setBaseUrl('https://burnout-api.herokuapp.com');
    RestangularProvider.setRequestSuffix('/');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
        activetab: 'about'
      })
      .when('/clients', {
        templateUrl: 'views/clients.html',
        controller: 'ClientsCtrl',
        controllerAs: 'clients',
        activetab: 'clients'
      })
      .when('/clients/:id', {
        templateUrl: 'views/client.html',
        controller: 'ClientCtrl',
        controllerAs: 'client',
        activetab: 'client'
      })
      .when('/clients/:id/projects', {
        templateUrl: 'views/client_projects.html',
        controller: 'ClientProjectsCtrl',
        controllerAs: 'client_Project',
        activetab: 'clients'
      })
      .when('/projects/', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl',
        controllerAs: 'projects',
        activetab: 'projects'
      })
      .when('/projects/:id', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'project',
        activetab: 'project'
      })
      .when('/404', {
        templateUrl: 'views/not_found.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        activetab: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
