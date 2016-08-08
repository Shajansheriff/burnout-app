'use strict';

describe('Controller: ClientProjectsCtrl', function () {

  // load the controller's module
  beforeEach(module('burnoutApp'));

  var ClientProjectsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClientProjectsCtrl = $controller('ClientProjectsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ClientProjectsCtrl.awesomeThings.length).toBe(3);
  });
});
