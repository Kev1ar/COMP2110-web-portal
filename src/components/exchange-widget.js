import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class CurrencyExchange extends LitElement {
    static properties = {
      header: { type: String },
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
    }
  
    render() {
      return html`
        <div>
            <h3>${this.header}</h3>
            <slot></slot>
        </div>      
      `;
    }
  }
  
  customElements.define('exchange-widget', CurrencyExchange);