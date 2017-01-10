# MagicMirror
This project turns your mirror into a house-elf.

## Features
* Displays weather information from [openweathermap.org](https://openweathermap.org)
* Displays the current date and time
* Displays a daily quotation from [taeglicheszit.at](https://taeglicheszit.at)
* Displays calendar events from multiple ical files

## How To
* To display weather information from [openweathermap.org](https://openweathermap.org) you will have to customize the configuration file `js/app.config.sample.js` and save it as `app.config.js`. To access the API you need to sign up for an API key (appid) at [openweathermap.org](https://openweathermap.org). Furthermore you will have to provide a cityCode to display the weather of your city.
* To display calendar events from an ical file you will have to customize the configuration file `js/app.config.sample.js` and save it as `app.config.js`. The `ical_urls` array has to be filled with valid ical urls.
