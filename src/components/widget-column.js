import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetColumn extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`

  `;

  constructor() {
    super();
    this.header = 'Widgets';
  }

  render() {
    return html`
      <div>
        <h2>${this.header}</h2>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('widget-column', WidgetColumn);