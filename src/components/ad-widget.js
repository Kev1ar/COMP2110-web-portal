import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL } from '../config.js';

class AdWidget extends LitElement {
  static properties = {
    adUrl: { type: String },
  }

  static styles = css`
    :host {
        display: block;
        width: 125px;
        height: 125px;
        background-color: azure;
    }
    
    img {
      width: 100%;
      height: 100%;
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
  </div>
    `;
  }
}

customElements.define('ad-widget',  AdWidget);