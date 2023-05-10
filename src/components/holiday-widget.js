import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class HolidayWidget extends LitElement {

  static COUNTRY_URL = "https://date.nager.at/api/v3/AvailableCountries";
  static HOLIDAY_URL = "https://date.nager.at/api/v3/NextPublicHolidays/";
  static TODAY_URL = "https://date.nager.at/api/v3/IsTodayPublicHoliday/";
  static MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  
  static properties = {

    country: {},
    _todayStatus: {},
    _date: { state: false},
    _countryList: { state: false},
    _data: { },
  }

  static styles = css`
    :host {
        display: block;
        width: 300px;
        min-height: 300px;
        height: 300px;
        padding: 15px;

        border: solid 1px black;
        border-radius: 10px;
        
        background-color: #553E4C;
        color: #fff;
        font-size: 16px;
        text-align: left;
        font-family: "Roboto";
    }
    :host * {
      padding: 0;
      margin: 0;
    }
    

    #header-container {
      display: flex;
      justify-content: space-between
    }
    #date-container {
      width: 180px;
      text-align: left;
    }
    #date-container h1 {
      margin: 0px;
      font-size: 1.8em;
    }
    #date-container p {
      font-weight: bold;
      font-size: 0.9em;
    }
    img {
      height: 50px;
    }
    
    #country-container {
      align-self: center;
      margin-top: 10px;
    }
    #country-container label {
      color: #fff;
      margin: 0 0 0 4px;
      font-size: 0.8em;
    }
    #country-container select {
      font-size: 1.1em;
      padding: 8px 6px;
      width: 300px;
      color: black;

      background-color: #BAA6B2;
      border: solid 1px black;
      border-radius: 10px;
    }
    #country-container option {
      background-color: #BAA6B2;
      color: #black;
    }


    #upcoming-container {
      background-color: #BAA6B2;
      border: 1px solid black;
      color: black;
      border-radius: 10px;
      margin-top: 10px;
      padding: 4px;
    }
    #upcoming-container h3{
      margin-top: 3px;
      padding-bottom: 10px;
    }
    #upcoming-container ul {
      height: 130px;
      overflow-x: hidden;
      overflow-y: auto;
      text-align:justify
      list-style: none;
    }
    #upcoming-container li {
      padding: 2px 0 2px 0;
      display:flex;
    }
    .date {
      width:100px;
      font-weight:bold;
    }
    .day {
      width: 210px;
      height: autopx;
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

  _fetchToday () {
    fetch(HolidayWidget.TODAY_URL + this.country.toLowerCase())
    .then(response => {
      this._todayStatus = (response.status === 204) ? "Public Holiday: No" : "Public Holiday: Yes";
    })
  }

/***************************
    Templates Methods 
***************************/

  _countryTemplate(){
    return html`
    <div id="country-container">
      <form action="/action_page.php">
        <label for="countries">Select your country below: </label>
        <select id="countries" name="countries" @change=${this._updateHolidays}>
          <option value="" selected disabled hidden>Australia</option>
        ${Object.keys(this._countryList).map((country) => 
          html`<option value="${this._countryList[country].countryCode}">
                ${this._countryList[country].name}
                </option>`)}
        </select>
      </form>
      

    </div>`;
  }

  _updateHolidays(e) {
    console.log(e.target.value);
    // re-rendering
    this.country = e.target.value;
    this._fetchHolidays();
    this._fetchToday();
  }

  _upcomingHolidaysTemplate() {
    return html`
                <div id="upcoming-container">
                  <h3>Upcoming Public Holidays</h3>
                  <ul>
                    <li> <div class="date">${this._data[0].date}</div> <div class="day">${this._data[0].name}</div > </li>
                    <li> <div class="date">${this._data[1].date}</div> <div class="day">${this._data[1].name}</div > </li>
                    <li> <div class="date">${this._data[2].date}</div> <div class="day">${this._data[2].name}</div > </li>
                    <li> <div class="date">${this._data[3].date}</div> <div class="day">${this._data[3].name}</div > </li>
                    <li> <div class="date">${this._data[4].date}</div> <div class="day">${this._data[4].name}</div > </li>
                  </ul
                  
                </div>`;
  }

  _dateTemplate() {
    return html`
    <div id= header-container>
      <div id="date-container">
        <h1>${this._date.getDate().toString().padStart(2, '0')} 
        ${HolidayWidget.MONTH_NAMES[this._date.getMonth()]} 
        ${this._date.getFullYear()}</h3>
        <p>${this._todayStatus}</p>
      </div>
      <img src="https://flagcdn.com/h160/${this.country.toLowerCase()}.png"/>
    </div>
    `;
  }
 

  render() {
    if(this._data) {
      return html`
      
        ${this._fetchToday()}
        ${this._dateTemplate()}
        ${this._countryTemplate()}
        ${this._upcomingHolidaysTemplate()}
        
      `;
    }

    return html`
    <h3 id="loading-message">Loading widget...</h3>
    `;
  }
}

customElements.define('holiday-widget', HolidayWidget);