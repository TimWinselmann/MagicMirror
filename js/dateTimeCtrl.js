var magicMirrorApp = angular.module('magicMirrorApp');

magicMirrorApp.controller("DateTimeCtrl", function($scope, $interval) {
  $scope.clock = Date.now();

  $interval(function () {
    $scope.clock = Date.now();
  }, 1000);
});
