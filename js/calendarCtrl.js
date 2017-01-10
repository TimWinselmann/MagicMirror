var magicMirrorApp = angular.module('magicMirrorApp');

magicMirrorApp.controller("CalendarCtrl", function($scope, $http, $interval, $log, calendar_config) {

  $scope.events = [];

  for (var i = 0; i < calendar_config.ical_urls.length; i++) {
    $http.get(calendar_config.ical_urls[i]).then(function(response) {
      parseIcal(response.data);
  	}, function(response) {
  		$log.error(response);
    });
  }

  var parseIcal = function (icalData) {
    var jcalData = ICAL.parse(icalData);
    var comp = new ICAL.Component(jcalData);
    var events = comp.getAllSubcomponents('vevent');

    var now = new Date();

    for (e in events) {
      var event = new ICAL.Event(events[e]);

      if (event.isRecurring()) {

        var title = event.summary || false;
        var endDate = event.endDate.toJSDate();
        /* the end date of a recurring event is the first end date
         * in that series, which does not represent the correct
         * value. Adjust end date of recurring events to now */
        endDate = new Date(endDate.setFullYear(now.getFullYear(), now.getMonth(), now.getDate()));
        var alreadyFinished = false;

        var recurringLimit = 0;
        var expand = event.iterator();

        while (next = expand.next()) {
          var startDate = next.toJSDate();
          if (startDate.withoutTime() == now.withoutTime()) {
            //$log.debug('Event: ' + title, startDate, endDate, now);

            if (now.getTime() > endDate.getTime()) {
              //$log.debug('Event already finished: ' + title);
              alreadyFinished = true;
            }

            $scope.events.push({
              'title': title,
              'startDate': startDate,
              'startsToday': event.duration.days < 1,
              'endDate': endDate,
              'endsToday': event.duration.days < 1,
              'alreadyFinished': alreadyFinished,
            });

          }

          /* handle infinite rules: limit iterations */
          if (recurringLimit == 100) {
            //$log.debug('Reached recurring limit for ' + title);
            break;
          }
          recurringLimit++;
        }

      } else {

        // TODO Test or-initialization
        var title = event.summary || false;
        var startDate = event.startDate.toJSDate();
        var endDate = event.endDate.toJSDate();
        var alreadyFinished = false;

        if (endDate.withoutTime() < now.withoutTime()) {
          //$log.debug('Event ends in the past: ' + title);
          continue;
        } else if (startDate.withoutTime() > now.withoutTime()) {
          //$log.debug('Event starts in the future: ' + title);
          continue;
        } else if (startDate.withoutTime() <= now.withoutTime()) {
          //$log.debug('Event: ' + title);

          if (endDate.getTime() == now.atMidnight().getTime()) {
            //$log.debug('Event ends last night: ' + title);
            continue;
          }

          if (now.getTime() > endDate.getTime()) {
            //$log.debug('Event already finished: ' + title);
            alreadyFinished = true;
          }

          $scope.events.push({
            'title': title,
            'startDate': startDate,
            'startsToday': startDate.withoutTime() == now.withoutTime(),
            'endDate': endDate,
            'endsToday': endDate.withoutTime() == now.withoutTime(),
            'alreadyFinished': alreadyFinished,
          });

        }
      }
    }
  }

});

magicMirrorApp.component('calendarDetail', {
  templateUrl: 'components/calendarDetails.html',
  bindings: {
    events: '='
  }
});

/* extend Date prototype: withoutTime() returns a new Date instance
 * without time information in unix time format */
Date.prototype.withoutTime = function () {
    var d = new Date(this);
    d.setHours(0, 0, 0, 0, 0);
    return d.getTime();
}

/* extend Date prototype: atMidnight() returns a new Date instance
 * without time information in javascript date format */
Date.prototype.atMidnight = function () {
    var d = new Date(this);
    d.setHours(0, 0, 0, 0, 0);
    return d;
}
