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
  static FORECAST_URL =
    "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true";
  //---------------------------------------------------------------------------------------------------------------------------------------------

  //Weather Icon URLS
  //---------------------------------------------------------------------------------------------------------------------------------------------
  static IMAGE_SUNNY_URL =
    "https://cdn-icons-png.flaticon.com/512/2698/2698194.png";
  //---------------------------------------------------------------------------------------------------------------------------------------------

  static properties = {
    _coords: { state: true },
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

    .main-container {
      display: grid;
      grid-template:
        "a a a b b b b b" 0.3fr
        "a a a b b b b b" 0.3fr
        "c c d d d d d d" 0.2fr
        "c c d d d d d d" 0.2fr;

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

    .time-location-container {
      //   background-color: green;
      grid-area: b;
      display: flex;
      flex-direction: column;

      margin: 0px;
      padding: 0px;

      padding-right: 15px;

      justify-content: center;
      align-items: flex-end;
    }
    .time-location-container h4 {
      margin: 0px;
      padding: 0px;
    }
    .time-location-container h1 {
      margin: 0px;
      padding: 0px;

      font-size: 60px;
    }

    .current-weather-container {
      //   background-color: yellow;
      grid-area: c;
      display: flex;
      flex-direction: column;

      margin: 0px;
      padding: 0px;
      padding-left: 10px;
      padding-right: 10px;

      justify-content: center;
      align-items: center;
    }
    .current-weather-container h1 {
      margin: 0px;
      padding: 0px;

      font-size: 50px;
    }
    .current-weather-container h4 {
      margin: 0px;
      padding: 0px;
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
  }

  connectedCallback() {
    super.connectedCallback();
    this._getLocation();

    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
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
    }
  }

  _locSuccess(pos) {
    console.log(pos);
    this._coords = pos.coords;
    this._fetchForecast();
  }

  _locError(err) {
    console.log("GeoLocError " + err);
  }
  //---------------------------------------------------------------------------------------------------------------------------------------------

  //Get Forecast
  //---------------------------------------------------------------------------------------------------------------------------------------------
  _fetchForecast() {
    if (this._coords) {
      console.log("Fetching Forecast");
      console.log(
        "Location latitude=" +
          this._coords.latitude +
          "&longitude=" +
          this._coords.longitude
      );
      fetch(
        WeatherWidget.FORECAST_URL +
          "&latitude=" +
          this._coords.latitude +
          "&longitude=" +
          this._coords.longitude +
          "&timezone=" +
          encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone)
      )
        .then((res) => res.json())
        .then((data) => {
          this._forecastData = data;
          console.log(data);
          let now = new Date();
          let key =
            now.toISOString().substring(0, now.toISOString().indexOf(":")) +
            ":00";

          this._forecastNow =
            data.hourly.temperature_2m[data.hourly.time.indexOf(key)];
        });
    }
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
          src=${WeatherWidget.IMAGE_SUNNY_URL}
        />
      </div>
      <div class="time-location-container">
        <h4>Date Today</h4>
        <h1>99:99</h1>
      </div>
      <div class="current-weather-container">
        <h1>99&#176;</h1>
        <h4>00~99&#176;</h4>
      </div>
      <div class="future-weather-container">
        <div class="future-weather-day">
          <h4>DAY</h4>
          <img src=${WeatherWidget.IMAGE_SUNNY_URL} />
          <h4>00~99&#176;</h4>
        </div>
        <div class="future-weather-day">
          <h4>DAY</h4>
          <img src=${WeatherWidget.IMAGE_SUNNY_URL} />
          <h4>00~99&#176;</h4>
        </div>
        <div class="future-weather-day">
          <h4>DAY</h4>
          <img src=${WeatherWidget.IMAGE_SUNNY_URL} />
          <h4>00~99&#176;</h4>
        </div>
      </div>
    </div>`;
  }
  //---------------------------------------------------------------------------------------------------------------------------------------------

  render() {
    return html`${this._widget()}`;
  }
}

customElements.define("weather-widget", WeatherWidget);
