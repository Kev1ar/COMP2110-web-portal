import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

//TODO
/**
 * Check if Location enabled
 * if yes then display location
 * otherwise have inputfield for selecting location?
 *
 * figure out how to request for location permission
 *
 * figure out what the api can give you first
 * then figure out the layout
 *
 *
 */

class WeatherWidget extends LitElement {
  //API URLs
  //---------------------------------------------------------------------------------------------------------------------------------------------
  //Documentation can be found here https://open-meteo.com/en/docs
  static FORECAST_URL =
    "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true";
  //---------------------------------------------------------------------------------------------------------------------------------------------

  //Weather Icon URLS
  //---------------------------------------------------------------------------------------------------------------------------------------------
  static IMAGE_SUNNY_URL =
    "https://cdn-icons-png.flaticon.com/512/2698/2698194.png";

  static WEATHER_LABELS = {
    0: "Clear Sky",
    1: "Mostly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    56: "Light Drizzle",
    57: "Dense Drizzle",
    61: "Light Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    66: "Light Rain",
    67: "Heavy Rain",
    71: "Light Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",
    77: "Snow Grains",
    80: "Light Showers",
    81: "Moderate Showers",
    82: "Violent Showers",
    85: "Light Snow",
    86: "Heavy Snow",
    95: "Thunderstorm",
    96: "Llight Hail",
    99: "Heavy Hail",
  };

  static WEATHER_ICONS_URLS = {
    0: "https://cdn-icons-png.flaticon.com/512/2698/2698194.png",
    1: "https://cdn-icons-png.flaticon.com/512/2698/2698194.png",
    2: "https://cdn-icons-png.flaticon.com/512/2698/2698213.png",
    3: "https://cdn-icons-png.flaticon.com/512/1146/1146869.png",
    45: "https://cdn-icons-png.flaticon.com/512/3750/3750506.png",
    48: "https://cdn-icons-png.flaticon.com/512/3750/3750506.png",
    51: "https://cdn-icons-png.flaticon.com/512/3075/3075858.png",
    53: "https://cdn-icons-png.flaticon.com/512/3075/3075858.png",
    55: "https://cdn-icons-png.flaticon.com/512/3075/3075858.png",
    56: "https://cdn-icons-png.flaticon.com/512/3075/3075858.png",
    57: "https://cdn-icons-png.flaticon.com/512/3075/3075858.png",
    61: "https://cdn-icons-png.flaticon.com/512/1850/1850736.png",
    63: "https://cdn-icons-png.flaticon.com/512/1850/1850736.png",
    65: "https://cdn-icons-png.flaticon.com/512/826/826957.png",
    66: "https://cdn-icons-png.flaticon.com/512/1850/1850736.png",
    67: "https://cdn-icons-png.flaticon.com/512/826/826957.png",
    71: "https://cdn-icons-png.flaticon.com/512/2315/2315309.png",
    73: "https://cdn-icons-png.flaticon.com/512/2315/2315309.png",
    75: "https://cdn-icons-png.flaticon.com/512/2315/2315309.png",
    77: "https://cdn-icons-png.flaticon.com/512/2315/2315309.png",
    80: "https://cdn-icons-png.flaticon.com/512/1959/1959338.png",
    81: "https://cdn-icons-png.flaticon.com/512/1959/1959338.png",
    82: "https://cdn-icons-png.flaticon.com/512/1959/1959338.png",
    85: "https://cdn-icons-png.flaticon.com/512/2315/2315309.png",
    86: "https://cdn-icons-png.flaticon.com/512/2315/2315309.png",
    95: "https://cdn-icons-png.flaticon.com/512/1146/1146860.png",
    96: "https://cdn-icons-png.flaticon.com/512/4165/4165571.png",
    99: "https://cdn-icons-png.flaticon.com/512/4165/4165571.png",
  };
  //---------------------------------------------------------------------------------------------------------------------------------------------

  static properties = {
    _errorOccured: { state: true },

    _locationEnabled: { state: true },
    _coords: { state: true },

    _currentDate: { state: true },

    _forecastData: { state: true },
    _forecastNow: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      background-color: #6ec7ff;
      background-image: url("https://img.freepik.com/free-photo/white-cloud-blue-sky_74190-7709.jpg");
      background-position: center;

      width: 300px;
      height: 300px;

      border-radius: 15px;
      border: 1px solid black;
    }

    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .row-label {
      margin-left: 10px;
      font-variant: small-caps;
    }

    .row-data {
      margin-right: 10px;
    }

    .location-error {
      display: flex;
      flex-wrap: wrap;

      height: 300px;

      margin: 0px;
      padding: 0px;
      padding-left: 15px;
      padding-right: 15px;
    }
    .location-error h1 {
      align-self: center;

      text-align: center;
      color: white;
      font-size: 24px;
      -webkit-text-stroke: 1px black;
    }

    .main-container {
      display: grid;
      grid-template:
        "a a c c c c c c" 0.3fr
        "a a c c c c c c" 0.3fr
        "d d d d d d d d" 0.2fr
        "d d d d d d d d" 0.2fr;

      height: 300px;
      width: 300px;
    }

    .weather-icon-container {
    //   background-color: blue;
      grid-area: a;
      display: flex;

      margin: 0px;
      padding: 0px;

      justify-content: center;
      align-items: center;
    }
    .weather-icon-container img {
      margin: 0px;
      padding: 0px;
    }

    .current-weather-container {
    //   background-color: yellow;
      grid-area: c;
      display: flex;
      flex-direction: column;
      width: "100%"

      margin: 0px;
      padding: 0px;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-right: 10px;

      align-items: flex-end;
    }
    .current-weather-container h2 {
      margin: 0px;
      padding: 0px;

      font-size: 20px;
    }
    .current-weather-container h1 {
      width: 100px;

      margin: 0px;
      padding: 0px;

      text-align: right;
      font-size: 69px;
    }
    .current-weather-container h4 {
      width: 72px;

      margin: 0px;
      padding: 0px;

      text-align: right;
    }
    .current-weather-container h3 {
      height: 40px;
      width: 100px;

      margin: 0px;
      padding: 0px;

      text-align: right;
      font-size: 20px;
      font-variant: small-caps;
    }

    .future-weather-container {
    //   background-color: orange;
      grid-area: d;
      display: flex;
      flex-direction: row;

      margin: 0px;
      padding: 0px;
      padding-left: 5px;
      padding-right: 5px;

      justify-content: space-between;
      align-items: center;
    }
    .future-weather-day {
      margin: 0px;
      padding: 0px;
    }
    .future-weather-day h4 {
      margin: 0px;
      padding: 0px;

      font-size: 16px;
    }
    .future-weather-day img {
      height: 40px;
      width: auto;

      margin: 0px;
      padding: 0px;
    }
  `;

  constructor() {
    super();

    this._currentDate = new Date();
  }

  connectedCallback() {
    super.connectedCallback();
    this._getLocation();
  }

  //Access Location
  //---------------------------------------------------------------------------------------------------------------------------------------------
  _getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this._locSuccess(pos);
        },
        (error) => {
          this._locError(error);
        }
      );
    } else {
      console.log("Geolocation not supported");
      this._locationEnabled = false;
    }
  }

  _locSuccess(pos) {
    this._locationEnabled = true;
    this._coords = pos.coords;
    this._fetchForecast();
  }

  _locError(err) {
    console.log("GeoLocError " + err);
    this._locationEnabled = false;
  }
  //---------------------------------------------------------------------------------------------------------------------------------------------

  //Get Forecast
  //---------------------------------------------------------------------------------------------------------------------------------------------
  _fetchForecast() {
    if (this._coords) {
      fetch(
        WeatherWidget.FORECAST_URL +
          "&latitude=" +
          this._coords.latitude +
          "&longitude=" +
          this._coords.longitude +
          "&timezone=" +
          encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone)
      )
        .then((res) => {
          if (!res.ok) {
            console.log(res.statusText);
            this._errorOccured = true;
          }
          return res.json();
        })
        .then((data) => {
          this._forecastData = data;

          this._forecastNow = data.current_weather;
        })
        .catch((error) => {
          console.log(error);
          this._errorOccured = true;
        });
    }
  }

  _getForecastForDate(dateIndex) {
    return {
      date: this._forecastData.daily.time[dateIndex],
      min: this._forecastData.daily.temperature_2m_min[dateIndex],
      max: this._forecastData.daily.temperature_2m_max[dateIndex],
      weathercode: this._forecastData.daily.weathercode[dateIndex],
    };
  }

  _getDayName(newDate) {
    let day_names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let date = new Date(newDate);

    return day_names[date.getDay()];
  }
  //---------------------------------------------------------------------------------------------------------------------------------------------

  //Testing stuff
  //---------------------------------------------------------------------------------------------------------------------------------------------
  _basicTesting() {
    return html`
    <div>
      <h4>Weather</h4>
      <button @click="${this._getLocation}"">Try It</button>
      <div class="row">
        <h5 class="row-label">Location</h5>
        <h5 class="row-data">
          ${this._coords ? this._coords.latitude : ""},
          ${this._coords ? this._coords.longitude : ""}
        </h5>
      </div>
      <div class="row">
        <h5 class="row-label">Forecast Now</h5>
        <h5 class="row-data">
          ${this._forecastNow ? this._forecastNow : ""}
        </h5>
      </div>
    </div>
  `;
  }
  //---------------------------------------------------------------------------------------------------------------------------------------------

  //Main Widget Components
  //---------------------------------------------------------------------------------------------------------------------------------------------
  _widget() {
    return html`<div class="main-container">
      <div class="weather-icon-container">
        <img
          style="height: 100px; width: auto"
          src=${this._forecastNow
            ? WeatherWidget.WEATHER_ICONS_URLS[this._forecastNow.weathercode]
            : WeatherWidget.IMAGE_SUNNY_URL}
        />
      </div>
      <div class="current-weather-container">
        <h2>
          ${this._currentDate
            .toDateString()
            .substring(0, this._currentDate.toDateString().length - 5)}
        </h2>
        <h1>
          ${this._forecastNow
            ? this._forecastNow.temperature.toString().substring(0, 2)
            : ""}&#176;
        </h1>
        <h4>
          ${this._forecastData
            ? this._getForecastForDate(0).min.toString().substring(0, 2) +
              "~" +
              this._getForecastForDate(0).max.toString().substring(0, 2)
            : ""}&#176;
        </h4>
        <h3>
          ${this._forecastNow
            ? WeatherWidget.WEATHER_LABELS[this._forecastNow.weathercode]
            : ""}
        </h3>
      </div>
      <div class="future-weather-container">
        <div class="future-weather-day">
          <h4>
            ${this._forecastData
              ? this._getDayName(this._getForecastForDate(1).date)
              : "DAY"}
          </h4>
          <img
            src=${this._forecastData
              ? WeatherWidget.WEATHER_ICONS_URLS[
                  this._getForecastForDate(1).weathercode
                ]
              : WeatherWidget.IMAGE_SUNNY_URL}
          />
          <h4>
            ${this._forecastData
              ? this._getForecastForDate(1).min.toString().substring(0, 2) +
                "/" +
                this._getForecastForDate(1).max.toString().substring(0, 2)
              : ""}&#176;
          </h4>
        </div>
        <div class="future-weather-day">
          <h4>
            ${this._forecastData
              ? this._getDayName(this._getForecastForDate(2).date)
              : "DAY"}
          </h4>
          <img
            src=${this._forecastData
              ? WeatherWidget.WEATHER_ICONS_URLS[
                  this._getForecastForDate(2).weathercode
                ]
              : WeatherWidget.IMAGE_SUNNY_URL}
          />
          <h4>
            ${this._forecastData
              ? this._getForecastForDate(2).min.toString().substring(0, 2) +
                "/" +
                this._getForecastForDate(2).max.toString().substring(0, 2)
              : ""}&#176;
          </h4>
        </div>
        <div class="future-weather-day">
          <h4>
            ${this._forecastData
              ? this._getDayName(this._getForecastForDate(3).date)
              : "DAY"}
          </h4>
          <img
            src=${this._forecastData
              ? WeatherWidget.WEATHER_ICONS_URLS[
                  this._getForecastForDate(3).weathercode
                ]
              : WeatherWidget.IMAGE_SUNNY_URL}
          />
          <h4>
            ${this._forecastData
              ? this._getForecastForDate(3).min.toString().substring(0, 2) +
                "/" +
                this._getForecastForDate(3).max.toString().substring(0, 2)
              : ""}&#176;
          </h4>
        </div>
        <div class="future-weather-day">
          <h4>
            ${this._forecastData
              ? this._getDayName(this._getForecastForDate(4).date)
              : "DAY"}
          </h4>
          <img
            src=${this._forecastData
              ? WeatherWidget.WEATHER_ICONS_URLS[
                  this._getForecastForDate(4).weathercode
                ]
              : WeatherWidget.IMAGE_SUNNY_URL}
          />
          <h4>
            ${this._forecastData
              ? this._getForecastForDate(4).min.toString().substring(0, 2) +
                "/" +
                this._getForecastForDate(4).max.toString().substring(0, 2)
              : ""}&#176;
          </h4>
        </div>
      </div>
    </div>`;
  }
  //---------------------------------------------------------------------------------------------------------------------------------------------

  render() {
    if (!this._locationEnabled) {
      return html`<div class="location-error">
        <h1>
          The Weather Widget needs access to your Location. Please allow access
          to your location and refresh the page.
        </h1>
      </div>`;
    }
    if (this._errorOccured) {
      return html`<div class="location-error">
        <h1>Something has gone wrong. Please try again.</h1>
      </div>`;
    }
    return html`${this._widget()}`;
  }
}

customElements.define("weather-widget", WeatherWidget);
