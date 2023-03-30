import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser, storeUser, deleteUser} from '../auth.js';
import { BASE_URL } from '../config.js';

class LoginWidget extends LitElement {
  static properties = {
    loginUrl: { type: String },
    user: {type: String, state: true }
  }

  static styles = css`
    :host {
        display: block;
    }`;

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
        method: 'post',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'}
    }).then(result => result.json()).then(response => {
        this.user = response;
        storeUser(response);
    })
  }

  logout() {
    deleteUser();
    this.user = null;
  }

  render() {
    if (this.user) {
        return html`<p>Logged in as ${this.user.name}</p><button @click=${this.logout}>Logout</button>`
    } 
    return html`
      <form @submit=${this.submitForm}>
          Username: <input name="username">
          Password: <input type="password" name="password">
          <input type='submit' value='Login'>
      </form>`;
    
  }
}

customElements.define('login-widget',  LoginWidget);