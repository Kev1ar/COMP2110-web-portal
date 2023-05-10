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
    height: 330px;
    width: 330px;
    font-family: mostra nuova, Imperia;
    font-size: 20px;
    border: solid 1px black;
    border-radius: 15px;
    background: url(https://cdn-icons-png.flaticon.com/512/2704/2704312.png) no-repeat;
    background-position:center;
    background-position-y:78%;
    background-size:70%;
    color: white;
    background-color: rgb(51, 51, 51);
  }


  label{
    font-family: mostra nuova;
    font-size: 24px;
    font-weight: bold;
    text-align: left;
    margin: left;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  

  select, input[type="number"]{
    margin-top: 15px;
    padding: 5px;
    font-size: 16px;
    margin-bottom: 5px;
    background-color: rgb(40, 40, 40);
    color: white;
    border-radius: 15px;
    border-top: 2px solid rgb(30, 30, 30);
    border-left: 2px solid rgb(30, 30, 30);
  }

  button {
    background-color: rgb(40, 40, 40);
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 15px;
    color: white;
    border: rgb(0, 80, 60);
    margin-right: 25%;
  }

  button:hover{
    // background: url(https://cdn-icons-png.flaticon.com/512/7429/7429783.png) no-repeat;
    // background-position-x:center;
    // background-size: 50%;
    background-color: rgb(0, 80, 60);
    border: rgb(0, 80, 60);
  }

  label[for="to-output"] {
    flex-wrap: no-wrap;
    max-width:200px;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    background-color: rgb(40, 40, 40);
    padding: 5px;
    color: white;
    border-radius: 15px;
    border-top: 2px solid rgb(30, 30, 30);
    border-left: 2px solid rgb(30, 30, 30);
  }
  
  label[for="to-output"], button{
    display:inline-flex;
    margin-top:120px;
  }

  
  
  h3 {
    font-family: mostra nuova;
    text-align: center;
    font-size: 32px;
    color: white;
    margin: 0;
    padding: 2%;
    background-color: rgb(0, 80, 60);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  
  select[id="from-currency"], select[id="to-currency"]{
    margin-right:5%;
  }

  label[for="from-currency"], label[for="to-currency"], label[for="from-input"] {
    display: inline-block;
  }

`;

  
    constructor() {
      super();
      this.header = 'Currency Exchange';
      this.amount = 0.00;
      this.result = 0.00;
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
        <input id="from-input" type="Number" .value="${this.amount}" @input="${(e) => {this.amount = e.target.value < 0 ? 0 : e.target.value; } }">
        <br>
        <button @click="${this.currencyConverter}"> Convert </button>
        <label for="to-output">Result: ${(this.result || this.result === 0) ? this.result.toFixed(2) : "0.00"}</label>


      `;
    }
  }
  
  customElements.define('exchange-widget', CurrencyExchange);