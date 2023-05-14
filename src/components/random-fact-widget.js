import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class RandomFactWidget extends LitElement {

  static properties = {

    _data: {}
  };

  //styling goes here
  //this is just placeholder, but in general the rest of the widgets have similar height/width, and borders
  static styles = css`
    :host {
      display: block;
      background-color: #00FFFF;

      width: 330px;
      height: 330px;

      border-radius: 15px;
      border: 1px solid black;

      color: black;
    }
  `;

  constructor() {
    super();
    var factDiv = document.querySelector("#fact-widget");
    // Get today's date 
    var today = new Date();
    this.month = today.getMonth() + 1;
  //get number of month and day
    this.day = today.getDate();
    console.log(this.month + "." + this.day);
  }

  connectedCallback() {
    super.connectedCallback();
    var url = 'http://numbersapi.com/'.concat(this.month, '/', this.day).concat('/date')

    fetch(url)
    .then(response => response.text())
    .then(data => { 
        this._data = data;
    });
  }



  _facts() {
    return html`
      <h1>Fun Fact About Today</h1>
      
      <h2>${this._data}</h2>
    `
  }

  //main code goes here
  render() {
   
    

    return html`
      ${this._facts()}
  `;
  }


}

customElements.define("random-fact-widget", RandomFactWidget);
