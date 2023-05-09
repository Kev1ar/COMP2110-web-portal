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
      background-color: red;

      width: 330px;
      height: 330px;

      border-radius: 15px;
      border: 1px solid black;

      color: black;
    }
  `;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  //main code goes here
  render() {
    return html`<div><h1>Random Fact Widget</h1></div>`;
  }
}

customElements.define("random-fact-widget", RandomFactWidget);
