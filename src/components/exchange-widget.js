import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class CurrencyExchange extends LitElement {
    static properties = {
      header: { type: String },
      fromCurrency: {type: String},
      toCurrency: {type: String},
      amount: {type: Number},
      result: {type: Number},
      currencies: {type: Array}
    }
  
    static styles = css`
      :host {
          display: block;
          width: 250px;
          height: 250px;
          background-color: azure;
          
      }
    `;
  
    constructor() {
      super();
      this.header = 'Currency Exchange';
      this.amount = 0;
      this.result = 0;
      this.fromCurrency = 'USD';
      this.toCurrency = 'AUD';
      this.currencies = [];
    }


    
    requestCurrencyArray(){
      const ARRAY_URL = 'https://api.exchangerate.host/latest';
      const request = new XMLHttpRequest();
      request.open('GET', this.ARRAY_URL);
      request.responseType = 'json';
      request.send();
      request.onload = () => {
        const response = request.response;
        this.currencies = Object.keys(response.rates);
        this.resultUpdate();
      }
    }

    currencyConverter(){
      

    }
  
    render() {
      return html`
        <label>From:</label>
        <select @change="${(e) => this.fromCurrency = e.target.value}> 
          ${this.currencies.map(currency => html` <option value="${currency}"> ${currency} </option>`)}
        </select>

       

        <br>
        <input id="from-input" type="number" .value="${this.amount}" @input="${(e) => this.amount = e.target.value}">
        <button @click="${this.currencyConverter}"> Convert </button>
        <br>


      `;
    }
  }
  
  customElements.define('exchange-widget', CurrencyExchange);