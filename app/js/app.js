angular.module("app", 
    [
      "tsn.templates",
      "ngResource",
      "ngRoute",
      "tst.cars"
    ]).run(function($rootScope) {
  // adds some basic utilities to the $rootScope for debugging purposes
  $rootScope.log = function(thing) {
    console.log(thing);
  };

  $rootScope.alert = function(thing) {
     console.log(thing);
  };
});
