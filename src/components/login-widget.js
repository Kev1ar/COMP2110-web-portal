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
      --green: #86C232;
      --darkgreen: #61892F;
      --grey: #6B6E70;
      --darkgrey: #222629;
      width: auto;
      font-size: 14px;
      color: lightgrey;
    }

    form {
      display: grid;
      grid-template-columns: auto auto;
      grid-template-rows: 20px 30px;
      grid-template-areas:
        "a b"
        "c c";

        column-gap: 5px;
        row-gap: 0px;

      width: auto;
      height: auto;
    
      margin: 0px;
      padding: 0px;
    }

    .field {
      border: none;
      border-radius: 3px;
      padding: 2px; 4px;
    }

    .submitBtn {
      grid-area: c;
      justify-self: center;
      align-self: center;

      font-weight: bold;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      color: #fff;
      background-color: var(--green);
      width: 100%;
      height: 20px;
      
      margin: 0px;
      padding: 0px;
      &:hover {
        background-color: var(--darkgreen);
      }
      &:focus {
        opacity: 0.8;
      }
    } 

    .logout {
      font-weight: bold;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      color: #fff;
      background-color: var(--green);
      width: 55px;
      height: 25px;
      
      margin: 0px;
      padding: 0px;
      &:hover {
        background-color: var(--darkgreen);
      }
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
        if(response.error === "login incorrect"){
          console.log("Login Invalid");
          return;
        }
        else {
          this.user = response;
          storeUser(response);
        }
        
      });
  }

  logout() {
    deleteUser();
    this.user = null;
  }

  render() {
    if (this.user) {
      return html`<p>Logged in as ${this.user.name}</p>
        <button class="logout" @click=${this.logout}>Logout</button>`;
    }
    return html` 
    <form @submit=${this.submitForm}>
      <input class="userField field" placeholder="username" name="username" />
      <input class="passField field" placeholder="password" type="password" name="password" />
      <input class="submitBtn" type="submit" value="Login" />
    </form>`;
  }
}

customElements.define("login-widget", LoginWidget);
