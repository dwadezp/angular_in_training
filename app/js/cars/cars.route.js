(function() {
  'use strict';

  angular
    .module('tst.cars.route', [])
    .config(routes);

  function routes($routeProvider, $locationProvider) {
    var catStructureOptions = {
      templateUrl: '/app/js/cars/car.template.html'
    };
    $routeProvider.when('/', catStructureOptions);

  }

})();
