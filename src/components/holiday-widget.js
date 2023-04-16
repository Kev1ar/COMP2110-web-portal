import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class HolidayWidget extends LitElement {


  static HOLIDAY_URL = "https://date.nager.at/api/v3/publicholidays/2023/AU";

  static properties = {

    header: { type: String },
    country: {},
    date: {},

    _data: {state: true},
    
  }

  static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: red;
    }
  `;

  constructor() {
    super();
    this.date = new Date();
    this.header = 'Widget';
   
  }


  connectedCallback() {
    super.connectedCallback();
    this._fetch();
    
  }

  _fetch () {
    fetch(HolidayWidget.HOLIDAY_URL)
    .then(response => response.json())
    .then(data => { 
        this._data = data;
    });
  }

  render() {
    if(this._data) {
      return html`
      <h1>WORKING ${this.date.getMonth()}</h1>
      `;
    }
    else{
      return html`
      <h3>NOT WORKING</h3>
      `;
    }
  }
}

customElements.define('holiday-widget', HolidayWidget);