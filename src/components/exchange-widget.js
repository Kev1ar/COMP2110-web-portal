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
      this.amount = 0.01;
      this.result = 0.01;
      this.fromCurrency = 'AED';
      this.toCurrency = 'AED';
      this.currencies = [];
      this.requestCurrencyArray();
    }


    
    requestCurrencyArray(){
      const requestURL  = 'https://api.exchangerate.host/latest';
      const request = new XMLHttpRequest();
      request.open('GET', requestURL);
      request.responseType = 'json';
      request.send();
      request.onload = () => {
        const response = request.response;
        this.currencies = Object.keys(response.rates);
        this.requestUpdate();
      }
    }

    connectedCallBack(){
      super.connectedCallBack()
      requestCurrencyArray();
      currencyConverter();
    }

     
      
    currencyConverter(){
      const requestURL = `https://api.exchangerate.host/convert?from=${this.fromCurrency}&to=${this.toCurrency}&amount=${this.amount}`;
      const request = new XMLHttpRequest();
      request.open('GET', requestURL);
      request.responseType = 'json';
      request.send();
      request.onload = () => {
        this.result = request.response.result;
        this.requestUpdate();
      }
    }
  
    render() {
      return html`
        <h3>${this.header}</h3>
        <label for="from-currency">From:</label>
        <select id="from-currency" @change="${(e) => this.fromCurrency = e.target.value}"> 
          ${this.currencies.map(currency => html`<option value="${currency}"> ${currency} </option>`)}
        </select>


        <label for="to-currency">To:</label>
        <select id="to-currency" @change="${(e) => this.toCurrency = e.target.value}"> 
          ${this.currencies.map(currency => html`<option value="${currency}"> ${currency} </option>`)}
        </select>
        <input id="from-input" type="Number" .value="${this.amount}" @input="${(e) => this.amount = e.target.value}">
        <br>

        <label for="to-output">Result:</label>
        <button @click="${this.currencyConverter}"> Convert </button>
        <br>
        <div class="result">${this.result.toFixed(2)}</div>
      `;
    }
  }
  
  customElements.define('exchange-widget', CurrencyExchange);