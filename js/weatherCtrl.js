var magicMirrorApp = angular.module('magicMirrorApp');

magicMirrorApp.controller("WeatherCtrl", function($scope, $http, $httpParamSerializer, $interval, $log, openweathermap_config) {

  var url = 'http://api.openweathermap.org/data/2.5/';
  var params = {
    'id': openweathermap_config.locationID,
    'units' : 'metric',
    'appid' : openweathermap_config.appid
  };
  var qs = $httpParamSerializer(params);

  var loadData = function () {

    /* load current weather */
    $http.get(url + 'weather?' + qs).then(function(response) {
      $scope.weather = response.data;

      /* convert from utc seconds to milliseconds */
      $scope.weather.sys.sunrise *= 1000;
      $scope.weather.sys.sunset *= 1000;
  	}, function(response) {
  		$log.error(response);
    });

    /* load five day forecast */
    $http.get(url + 'forecast/daily?' + qs).then(function(response) {
      $scope.forecasts = response.data.list;
    }, function(response) {
      $log.error(response);
    });

  };

  /* initial run */
  loadData();

  /* reload weather data every ten minutes */
  $interval(loadData, 10 * 60 * 1000);
});

magicMirrorApp.component('weatherDetail', {
  templateUrl: 'components/weatherDetails.html',
  bindings: {
    weather: '=',
    forecasts: '='
  }
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

    var icon = iconMapping[iconCode];
    return icon != undefined ? icon : iconCode;
  };
});

magicMirrorApp.filter('translateWeatherGerman', function() {
  return function(weatherCode) {
    if (weatherCode == undefined) {
      return undefined;
    }

    var weather = weatherCode.toLowerCase();

    var weatherMapping = {
      "clear" : "Klar",
      "clear sky": "Klarer Himmel",
      "few clouds": "Wenig bewölkt",
      "shower rain": "Regenschauer",
      "rain": "Regen",
      "thunderstorm": "Gewitter",
      "snow": "Schnee",
      "mist": "Dunst",
      "fog": "Nebel",
      "drizzle": "Nieselregen",
    }

    var weatherTranslation = weatherMapping[weather];
    return weatherTranslation != undefined ? weatherTranslation : weatherCode;
  };
});
