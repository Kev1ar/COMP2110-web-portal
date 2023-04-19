import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class HolidayWidget extends LitElement {


  static COUNTRY_URL = "https://date.nager.at/api/v3/AvailableCountries";
  static HOLIDAY_URL = "https://date.nager.at/api/v3/NextPublicHolidays/";
  static MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  
  static properties = {

    country: {},
    _date: { state: false},
    _countryList: { state: false},
    _data: { state: false},
  }

  static styles = css`
    :host {
        display: block;
        width: 300px;
        height: auto;
        padding: 5px;

        background-color: #2F4858;
        color: #fff;
        font-size: 20px;

    }
    
    ul {
      margin: 0;
      list-style: none;
      padding-inline-start: 0;
    }
  `;

  constructor() {
    super();
    this._date = new Date();
    if(!this.country) {
      this.country = 'AU';
    };
    this._fetchCountries();
  }

  connectedCallback() {
    super.connectedCallback();
    this._fetchHolidays();
  }


/***************************
        Fetch Methods
****************************/

  _fetchCountries () {
    fetch(HolidayWidget.COUNTRY_URL)
    .then(response => response.json())
    .then(data => {
          this._countryList = data;
      });
  }

  _fetchHolidays () {
    fetch(HolidayWidget.HOLIDAY_URL + this.country)
    .then(response => response.json())
    .then(data => { 
        this._data = data;
    });
  }

/***************************
      Templates Methods 
***************************/

  _countryTemplate(){
    return html`
    <form action="/action_page.php">
      <label for="countries"></label>
      <select id="countries" name="countries" @change=${this._updateHolidays}>
        <option value="" selected disabled hidden>Select Country</option>
       ${Object.keys(this._countryList).map((country) => 
        html`<option value="${this._countryList[country].countryCode}">
              ${this._countryList[country].name}
              </option>`)}
      </select>
    </form>`;
  }

  _updateHolidays(e) {
    this._data = undefined;
    console.log(e.target.value);
    this.country = e.target.value;
    this._fetchHolidays();
  }

  _upcomingHolidaysTemplate() {
    return html`<ul>
                    <li>${this._data[0].date} : ${this._data[0].name}</li>
                    <li>${this._data[1].date} : ${this._data[1].name}</li>
                    <li>${this._data[2].date} : ${this._data[2].name}</li>
                    <li>${this._data[3].date} : ${this._data[3].name}</li>
                    <li>${this._data[4].date} : ${this._data[4].name}</li>
                </ul>`;
  }

  _dateTemplate() {
    return html`
    <h3>Date: ${this._date.getDate().toString().padStart(2, '0')} 
    ${HolidayWidget.MONTH_NAMES[this._date.getMonth()]} 
    ${this._date.getFullYear()}</h3>
    `;
  }



  render() {
    if(this._data) {
      return html`
        <h4>Upcoming Public Holidays</h4>
        ${this._countryTemplate()}
        <p>Region: ${this.country}</p>
        ${this._upcomingHolidaysTemplate()}
        ${this._dateTemplate()}
      `;
    }
    else{
      return html`
      <h3>Loading widget...</h3>
      `;
    }
  }
}

customElements.define('holiday-widget', HolidayWidget);