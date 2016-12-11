var magicMirrorApp = angular.module('magicMirrorApp');

magicMirrorApp.controller("QuotationCtrl", function($scope, $http, $interval, $log) {
  var url = 'https://taeglicheszit.at/zitat-api.php?format=json';

  var loadData = function () {

    /* load quotation */
    $http.get(url).then(function(response) {
      $scope.quotation = response.data;
  	}, function(response) {
  		$log.error(response);
    });

  };

  /* initial run */
  loadData();

  /* reload quotation data every hour */
  $interval(loadData, 60 * 60 * 1000);
});

magicMirrorApp.component('quotationDetail', {
  templateUrl: 'components/quotationDetails.html',
  bindings: {
    quotation: '='
  }
});
