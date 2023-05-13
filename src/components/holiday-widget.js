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
        --gray: #BFBDC1;
        --dimgray: #6D6A75;
        --raisin: #37323E;
        --gold: #DEB841;
        --yellow: #DE9E36;

        display: block;
        width: 300px;
        min-height: 300px;
        height: 300px;
        padding: 15px;

        border: solid 1px black;
        border-radius: 10px;
        
        background-color: var(--raisin);
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
      font-size: 1.8em;
    }
    #date-container p {
      margin-left: 10px;
      color: var(--gold);
      font-weight: bold;
      font-size: 0.9em;
    }
    img {
      height: 50px;
      border: 2px solid black;
    }
    
    #country-container {
      align-self: center;
    }
    #country-container label {
      color: #fff;
      font-size: 0.8em;
      text
    }
    #country-container select {
      font-weight: bold;
      font-size: 1em;
      padding: 8px 6px;
      width: 100%;
      color: black;

      background-color: var(--gray);
      border: solid 1px black;
      border-radius: 10px;
      &:hover {
        opacity: 0.9;
      }
    } 
    #country-container option {
      font-size:
      background-color: var(--gray);
      color: #000;
    }


    #upcoming-container {
      background-color: var(--gray);
      border: 1px solid black;
      color: #000;
      border-radius: 10px;
      margin-top: 10px;
      padding: 4px;
    }
    #upcoming-container h3{
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
      font-weight:bold;
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
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: var(--yellow);
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