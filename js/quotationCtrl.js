var magicMirrorApp = angular.module('magicMirrorApp');

magicMirrorApp.controller("QuotationCtrl", function($scope, $http, $httpParamSerializer, $log, $timeout, openweathermap_config) {
  var url = 'https://taeglicheszit.at/zitat-api.php?format=json';

  // daily quotation
  $http.get(url).then(function(response) {
    $scope.quotation = response.data;
	}, function(response) {
		$log.error(response);
  });

});
