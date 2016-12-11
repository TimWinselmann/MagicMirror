var magicMirrorApp = angular.module('magicMirrorApp');

magicMirrorApp.controller("DateTimeCtrl", function($scope, $interval) {
  $scope.clock = Date.now();

  $interval(function () {
    $scope.clock = Date.now();
  }, 1000);
});

magicMirrorApp.component('dateTimeDetail', {
  templateUrl: 'components/dateTimeDetails.html',
  bindings: {
    clock: '='
  }
});
