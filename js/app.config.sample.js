var lightmanager = angular.module('magicMirrorApp');

// http://www.openweathermap.org
lightmanager.constant('openweathermap_config', {
  location: '', // title of location
  locationID: '', // openweathermap cityCode
  appid: '' // openweathermap appid
});
