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
import "./components/task-widget.js";

import "./components/blog-form.js";

import "./components/holiday-widget.js";
import "./components/weather-widget.js";
import "./components/exchange-widget.js";
import "./components/random-fact-widget.js";

class Comp2110Portal extends LitElement {
  static properties = {
    header: { type: String },
    isDarkMode: { type: Boolean },
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
      color: rgb(192, 192, 192);
    }

    header {
      position: fixed;
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100px;
      justify-content: space-around;
      align-items: center;
      z-index: 2;
    }

    .header-light {
      background-color: #323c49;
      box-shadow: 0px 5px 5px black;
    }

    .header-dark {
      background-color: rgb(30, 30, 30); /*dark grey*/
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

    .theme-toggle {
      background: none;
      border: none;

      width: 75px;
      height: 75px;

      border-radius: 50%;
      box-shadow: 0px 0px 5px inset;
    }

    .theme-toggle-light:hover {
      background-color: #c4d5e6;
    }

    .theme-toggle-dark:hover {
      background-color: rgb(51, 51, 51);
    }

    .theme-toggle:active {
      box-shadow: 0px 0px 15px inset;
    }

    .theme-toggle img {
      width: 100%;
      height: auto;
    }

    main {
      display: flex;
      flex-direction: column;
      padding-top: 150px;
    }

    .main-light {
      background-color: #c4d5e6;
    }

    .main-dark {
      background-color: rgb(37, 37, 38); /*mid grey*/
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

    .load-blog-btn {
      margin: 0px;
      margin-top: 15px;
      margin-bottom: 15px;
      padding: 10px 30px;

      font-size: 20px;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      display: flex;

      height: 300px;

      align-items: center;
      justify-content: space-evenly;

      margin: 0px;
      padding: 15px 15px;
    }

    .footer-light {
      background-color: #323c49;
      box-shadow: 0px 5px 5px black;
    }

    .footer-dark {
      background-color: rgb(30, 30, 30); /*dark grey*/
      box-shadow: 0px 5px 5px;
    }

    .app-footer a {
      margin-left: 5px;
    }

  `;

  constructor() {
    super();
    this.header = "COMP2110 Portal";
    this.isDarkMode = false;
  }

  _toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    var el = document
      .getElementsByTagName("comp2110-portal")[0]
      .shadowRoot.getElementById("blogs");
    el._toggleTheme();

    var el2 = document
      .getElementsByTagName("comp2110-portal")[0]
      .shadowRoot.getElementById("blog-form");
    el2._toggleTheme();
  }

  _loadMoreBlogs() {
    var el = document
      .getElementsByTagName("comp2110-portal")[0]
      .shadowRoot.getElementById("blogs");
    el._fetchAgain();
  }

  render() {
    return html`
      <header class="${this.isDarkMode ? "header-dark" : "header-light"}">
        <h1>${this.header}</h1>
        <login-widget class="login"></login-widget>

        <button
          class="theme-toggle ${this.isDarkMode
            ? "theme-toggle-dark"
            : "theme-toggle-light"}"
          @click="${this._toggleTheme}"
        >
          <img src="https://cdn-icons-png.flaticon.com/512/8338/8338708.png" />
        </button>
      </header>
      <blog-form id="blog-form"></blog-form>
      <main class="${this.isDarkMode ? "main-dark" : "main-light"}">
        <div class="widget-container">
          <weather-widget class="widget weather"></weather-widget>
          <exchange-widget class="widget"></exchange-widget>
          <holiday-widget class="widget"></holiday-widget>
          <random-fact-widget class="widget"></random-fact-widget>
          <task-widget class="widget"></task-widget>
        </div>

        <div class="blog-container">
          <blog-block class="blogs" id="blogs"></blog-block>
          <button class="load-blog-btn" @click="${this._loadMoreBlogs}">
            Load More...
          </button>
        </div>
      </main>

      <p class="app-footer ${this.isDarkMode ? "footer-dark" : "footer-light"}">
        <ad-widget></ad-widget>
        A product of the COMP2110 Web Development Collective &copy; 2023
      </p>
    `;
  }
}

customElements.define("comp2110-portal", Comp2110Portal);
