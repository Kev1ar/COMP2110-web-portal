import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import "./components/widget-block.js";
import "./components/blog-block.js";
import "./components/widget-column.js";
import "./components/ad-widget.js";
import "./components/login-widget.js";

import "./components/blog-form.js";

import "./components/holiday-widget.js";
import "./components/weather-widget.js";
import "./components/exchange-widget.js";

class Comp2110Portal extends LitElement {
  static properties = {
    header: { type: String },
  };

  static styles = css`
    :host {
      min-height: 100vh;
      font-size: 14pt;
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: lightgoldenrodyellow;

      margin: 0px;
      padding: 0px;
    }

    header {
      background-color: red;
      position: fixed;

      display: flex;
      flex-direction: row;

      width: 100%;
      height: 100px;

      justify-content: space-around;
      align-items: center;

      box-shadow: 0px 5px 5px;
    }

    header h1 {
      margin: 0px;
      padding: 0px;
    }

    .login {
      margin: 0px;
      padding: 0px;
      margin-top: 15px;
    }

    main {
      display: flex;
      flex-direction: column;

      padding-top: 150px;
    }

    .widget-container {
      display: flex;
      flex-wrap: wrap;
      gap: 25px;

      margin: 0px;
      padding: 0px;
      margin-left: 15px;
      margin-right: 15px;

      justify-content: space-evenly;
      align-self: center;
    }

    .widget {
      flex-grow: 1;
      justify-content: center;
    }

    .weather {
      display: flex;
    }

    .blog-container {
      margin: 0px;
      padding: 0px;
      margin-top: 50px;
      margin-left: 15px;
      margin-right: 15px;
    }

    .blogs {
      display: flex;
      flex-wrap: wrap;
      gap: 25px;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  constructor() {
    super();
    this.header = "COMP2110 Portal";
  }

  render() {
    return html`
      <header>
        <h1>${this.header}</h1>
        <login-widget class="login"></login-widget>
        <blog-form></blog-form>
      </header>

      <main>
        <div class="widget-container">
          <weather-widget class="widget weather"></weather-widget>
          <widget-block class="widget" header="Second Widget"></widget-block>
          <holiday-widget class="widget"></holiday-widget>
          <exchange-widget class="widget"></exchange-widget>
        </div>

        <div class="blog-container">
          <blog-block class="blogs"></blog-block>
        </div>
      </main>

      <p class="app-footer">
        A product of the COMP2110 Web Development Collective &copy; 2023
      </p>
    `;
  }
}

customElements.define("comp2110-portal", Comp2110Portal);
