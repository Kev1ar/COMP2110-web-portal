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
    width: 300px;
    min-height: 300px;;
    background-color: rgb(51, 51, 51);
    font-family: mostra nuova, Imperia;
    font-size: 20px;
    
    border: solid 1px black;
    border-radius: 15px;
  }

  label{
    font-family: mostra nuova;
    font-size: 24px;
    font-weight: bold;
    text-align: left;
    margin-right: 5px;
    margin: left;
    
  }

  

  select, input[type="number"]{
    padding: 5px;
    font-size: 16px;
    margin-bottom: 15px;
    colour: rgb(30, 30, 30);
    background-color: rgb(40, 40, 40);
    border-radius: 15px;
    border-top: 2px solid rgb(30, 30, 30);;
    border-left: 2px solid rgb(30, 30, 30);;
    
  }

  button {
    padding: 15px;
    font-size: 20px;
    background-color: white;
    border: none;
    color: rgb(37, 37, 38);
    font-weight: bold;
    cursor: pointer;
    border-radius: 15px;
  
  }


  label[for="to-output"] {
    display: block;
    margin-top: 15px;
    font-family: mostra nuova;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
  }

  button:hover{
    background-color: rgb(0, 80, 60);
  }
  
  h3 {
    font-family: mostra nuova;
    text-align: center;
    font-size: 32px;
    color: white;
    margin: 0;
    padding: 3%;
    background-color: rgb(0, 80, 60);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    margin-bottom: 25px;
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
        <br>
        <label for="from-input">Amount:</label>
        <input id="from-input" type="Number" .value="${this.amount}" @input="${(e) => this.amount = e.target.value}">
        <br>

        <label for="to-output">Result: ${this.result.toFixed(2)}</label>
        <br>
        <button @click="${this.currencyConverter}"> Convert </button>
      `;
    }
  }
  
  customElements.define('exchange-widget', CurrencyExchange);