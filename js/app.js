var magicMirrorApp = angular.module('magicMirrorApp', []);

magicMirrorApp.controller("DateTimeCtrl", function($scope, $interval) {
  $scope.clock = Date.now();

  $interval(function () {
    $scope.clock = Date.now();
  }, 1000);
});

magicMirrorApp.controller("WeatherCtrl", function($scope, $http, $httpParamSerializer, $log, $timeout, openweathermap_config) {
  $scope.location = openweathermap_config.location;

  var url = 'http://api.openweathermap.org/data/2.5/';
  var params = {
    'id': openweathermap_config.locationID,
    'units' : 'metric',
    'appid' : openweathermap_config.appid
  };
  var qs = $httpParamSerializer(params);

  // current weather
  $http.get(url + 'weather?' + qs).then(function(response) {
    $scope.weather = response.data;

    $scope.weather.sys.sunrise *= 1000;
    $scope.weather.sys.sunset *= 1000;
	}, function(response) {
		$log.error(response);
  });

  // five day forecast
  $http.get(url + 'forecast/daily?' + qs).then(function(response) {
    $scope.forecasts = response.data.list;
  }, function(response) {
    $log.error(response);
  });

});

magicMirrorApp.filter('convertToIcon', function() {
  return function(iconCode) {
    var iconMapping = {"01d": "wi-day-sunny", "02d": "wi-day-cloudy", "03d": "wi-cloud",
                       "04d": "wi-cloudy", "09d": "wi-showers", "10d": "wi-rain",
                       "11d": "wi-thunderstorm", "13d": "wi-snow", "50d": "wi-fog",
                       "01n": "wi-night-clear", "02n": "wi-night-alt-cloudy",
                       "03n": "wi-cloud", "04n": "wi-cloudy", "09n": "wi-showers",
                       "10n": "wi-rain", "11n": "wi-thunderstorm", "13n": "wi-snow",
                       "50n": "wi-fog"}

    return iconMapping[iconCode];
  };
});
