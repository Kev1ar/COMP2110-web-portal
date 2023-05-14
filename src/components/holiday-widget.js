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
    _date: {},
    _countryList: {},
    _data: { },
  }

  /* 
   ** COLOR SCHEME: https://coolors.co/bfbdc1-6d6a75-37323e-deb841-de9e36
   */
  static styles = css`
  
    :host {
        --green: #86C232;
        --darkgreen: #61892F;
        --grey: #6B6E70;
        --darkgrey: #222629;


        display: block;
        width: 300px;
        min-height: 300px;
        height: 300px;
        padding: 15px;

        border: solid 1px black;
        border-radius: 10px;
        
        background-color: var(--darkgrey);
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
      width: 250px;
      text-align: left;
    }
    #date-container h1 {
      margin: 0px;
      color: var(--green);
      font-size: 1.8em;
    }
    #date-container p {
      color: var(--darkgreen);
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
      font-size: 0.8em;
      text
    }
    #country-container select {
      font-size: 1em;
      padding: 8px 6px;
      width: 100%;
      color: #fff;

      background-color: var(--darkgrey);
      border-radius: 10px;
      &:hover {
        opacity: 0.9;
      }
    } 
    #country-container option {
      font-size:
      color: #fff;
    }


    #upcoming-container {
      color: #fff;
      border-radius: 10px;
      margin-top: 10px;
      padding: 5px 10px;
      border: solid 1px grey;
    }
    #upcoming-container h3{

      color: var(--green);
      margin-top: 3px;
      padding-bottom: 5px;
    }
    #upcoming-container ul {
      height: 140px;
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
      width:60px;
      color: var(--green)
    }
    .day {
      width: 210px;
      height: auto;
    }
    
    ::-webkit-scrollbar {
      width: 8px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #fff;
      border-radius: 5px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: var(--green);
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--raisin);
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
      this._todayStatus = (response.status === 204) ? "Today - Just a normal day." : "Today - It's a public holiday!";
    })
  }

/***************************
    Templates Methods 
***************************/

  _countryTemplate(){
    return html`
    <div id="country-container">
      <form title="Select Country" action="/action_page.php">
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
                    ${this._data.map((data) =>
                      html`<li> <div class="date">${this._getDate(data.date)}</div> <div class="day">${data.name}</div > </li>` 
                      )}
                  </ul>
                  
                </div>`;
  }

  _getDate(dateString) {
    const date = new Date(dateString);
    return `${HolidayWidget.MONTH_NAMES[date.getMonth()].slice(0, 3)} ${date.getDate()}`;
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