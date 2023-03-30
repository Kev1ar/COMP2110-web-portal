import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL } from '../config.js';

class AdWidget extends LitElement {
  static properties = {
    adUrl: { type: String },
  }

  static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: azure;
    }
    :host p {
      position: relative;
      top: -50px;
      text-align: right;
      padding-right: 10px;
      z-index: 0;
      color: white;
    }
  `;

  constructor() {
    super();
    this.adUrl = `${BASE_URL}adserver`;
  }

  render() {
    return html`
  <div>
        <img src=${this.adUrl} alt="Advertisment">
        <p>Advertisment</p>
  </div>
    `;
  }
}

customElements.define('ad-widget',  AdWidget);