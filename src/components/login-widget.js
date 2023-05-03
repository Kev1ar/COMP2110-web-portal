import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { getUser, storeUser, deleteUser } from "../auth.js";
import { BASE_URL } from "../config.js";

class LoginWidget extends LitElement {
  static properties = {
    loginUrl: { type: String },
    user: { type: String, state: true },
  };

  static styles = css`
    :host {
    }

    form {
      display: grid;
      grid-template:
        "ul uf uf uf" 0.4fr
        "pl pf pf pf" 0.4fr
        "empty empty sb sb" 0.2fr;
      gap: 5px;

      width: auto;
      height: auto;

      margin: 0px;
      padding: 0px;
    }

    .userLabel {
      grid-area: ul;

      width: 150px;
      height: 20px;

      margin: 0px;
      padding: 0px;

      font-size: 20px;
    }
    .userField {
      grid-area: uf;

      width: auto;
      height: 20px;

      margin: 0px;
      padding: 0px;
    }

    .passLabel {
      grid-area: pl;

      width: 150px;
      height: 20px;

      margin: 0px;
      padding: 0px;

      font-size: 20px;
    }
    .passField {
      grid-area: pf;

      width: auto;
      height: 20px;

      margin: 0px;
      padding: 0px;
    }

    .submitBtn {
      grid-area: sb;

      width: auto;
      height: 20px;

      margin: 0px;
      padding: 0px;
    }
  `;

  constructor() {
    super();
    this.loginUrl = `${BASE_URL}users/login`;
    this.user = getUser();
  }

  submitForm(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    fetch(this.loginUrl, {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((response) => {
        this.user = response;
        storeUser(response);
      });
  }

  logout() {
    deleteUser();
    this.user = null;
  }

  render() {
    if (this.user) {
      return html`<p>Logged in as ${this.user.name}</p>
        <button @click=${this.logout}>Logout</button>`;
    }
    return html` <form @submit=${this.submitForm}>
      <h1 class="userLabel">Username:</h1>
      <input class="userField" name="username" />
      <h1 class="passLabel">Password:</h1>
      <input class="passField" type="password" name="password" />
      <input class="submitBtn" type="submit" value="Login" />
    </form>`;
  }
}

customElements.define("login-widget", LoginWidget);
