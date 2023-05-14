import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class RandomFactWidget extends LitElement {


  static properties = {};

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
    const factDiv = document.querySelector("#fact-widget");
    // Get today's date 
    const today = new Date();
    const month = today.getMonth() + 1;
    // months are zero indexed 
    const day = today.getDate(); // Send API request to numbersapi.com 
  }

  connectedCallback() {
    super.connectedCallback();
  }


  _fenchFacts() {
    fetch(`http://numbersapi.com/${month}/${day}/date`)
      .then(response => response.text())
      .then(data => {
        // Display fact in the widget 
        factDiv.innerHTML = data;
      })
      .catch(error => console.error(error));
  }






  //main code goes here
  render() {
    return html`
    <p>${this._fenchFacts()}</p>
  `;
  }


}

customElements.define("random-fact-widget", RandomFactWidget);
