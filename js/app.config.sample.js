var lightmanager = angular.module('magicMirrorApp');

// configuration for http://www.openweathermap.org
lightmanager.constant('openweathermap_config', {
    locationID: '', // openweathermap cityCode
    appid: '' // openweathermap appid
});

// calendar configuration
lightmanager.constant('calendar_config', {
    // TODO add colors for each ical url
    ical_urls: [
        '', // ical url 1
        '', // ical url 2
        '', // ical url ...
    ]
});
