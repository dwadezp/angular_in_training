(function() {
  'use strict';

  angular
    .module('tst.cars.route', [])
    .config(routes);

  function routes($routeProvider, $locationProvider) {

    var catStructureOptions = {
      templateUrl: '/app/js/cars/controllers/car.template.html',
      controller: 'CarStructureController',
      controllerAs: 'ctrl'
    };
    $routeProvider.when('/', catStructureOptions);

  }

})();
