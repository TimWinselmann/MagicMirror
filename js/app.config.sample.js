var lightmanager = angular.module('magicMirrorApp');

// configuration for http://www.openweathermap.org
lightmanager.constant('openweathermap_config', {
  location: '', // title of location
  locationID: '', // openweathermap cityCode
  appid: '' // openweathermap appid
});
