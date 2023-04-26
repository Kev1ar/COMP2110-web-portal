import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { getUser } from "../auth.js";
import { BASE_URL } from "../config.js";

class BlogForm extends LitElement {
  static properties = {
    _title: { type: String },
    _content: { type: String },
    _user: { type: String, state: true },
    _formVisible: { type: Boolean },
  };

  static styles = css`
    :host {
    }

    .open-blog-form-button {
      position: fixed;

      width: 100px;
      height: 100px;

      bottom: 50px;
      right: 50px;
    }
    .open-blog-form-button button {
      width: 100%;
      height: 100%;
    }

    .main-container {
      //   background-color: red;
      background-color: white;
      display: grid;
      grid-template:
        "a a a b" 0.2fr
        "c c c c" 0.8fr;
      gap: 5px;

      position: fixed;
      width: 80%;
      height: 70%;

      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      padding: 10px;

      border-radius: 15px;
      border: 1px solid black;
    }

    h1 {
      //   background-color: white;
      grid-area: a;

      height: 100%;

      margin: 0;
      padding: 0;
    }
    .form-close-button {
      //   background-color: orange;
      grid-area: b;

      height: 100%;

      margin: 0;
      padding: 0;
    }
    .main-form {
      //   background-color: lightblue;
      grid-area: c;
      display: grid;
      grid-template:
        "tl ti ti ti ti" 0.1fr
        "cl ci ci ci ci" 0.8fr
        "empty empty empty empty sb" 0.1fr;
      gap: 5px;

      padding: 10px;
    }
    .main-form-title-label {
      //   background-color: blue;
      grid-area: tl;

      height: 100%;

      margin: 0;
      padding: 0;
    }
    .main-form-title-input {
      //   background-color: violet;
      grid-area: ti;

      height: 55%;

      margin: 0;
      padding: 10px;

      font-size: 20px;
    }
    .main-form-content-label {
      //   background-color: green;
      grid-area: cl;

      height: 100%;

      margin: 0;
      padding: 0;
    }
    .main-form-content-input {
      //   background-color: yellow;
      grid-area: ci;

      height: 95%;

      margin: 0;
      padding: 10px;

      font-size: 20px;
      resize: none;
    }
    .main-form-submit-button {
      //   background-color: pink;
      grid-area: sb;
    }
  `;

  constructor() {
    super();
    this._formVisible = true;
    this._user = getUser();
  }

  _submitBlog(event) {
    event.preventDefault();

    this._title = event.target.title.value;
    this._content = event.target.content.value;

    console.log(this._title);
    console.log(this._content);

    if (this._title.trim().length < 1 || this._content.trim().length < 1) {
      console.log("Need content");

      return;
    }
    const blogURL = BASE_URL + "blog";
    const postBody = {
      title: this._title,
      content: this._content,
    };
    fetch(blogURL, {
      method: "POST",
      headers: {
        Authorization: "Basic " + getUser().token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(postBody),
    });
  }

  _openBlogForm() {
    this._user = getUser();

    return html`<div class="open-blog-form-button"><button @click="${() =>
      (this._formVisible = !this._formVisible)}"">Submit Blog</button></div>`;
  }
  _blogForm() {
    this._user = getUser();

    if (!this._user) {
      return html`<div class="main-container">
        <h1>Please Login before trying to submit a blog</h1>
        <button class="form-close-button" @click="${() =>
          (this._formVisible = !this._formVisible)}"">Close</button>
      </div>`;
    }
    return html`<div class="main-container">
      <h1>Submit a New Vlog</h1>
      <button class="form-close-button" @click="${() =>
        (this._formVisible = !this._formVisible)}"">Close</button>
      <form class="main-form" @submit=${this._submitBlog}>
        <h2 class="main-form-title-label">Title:</h2> 
        <input class="main-form-title-input" name="title" placeholder="Blog Title"/> 
        <h2 class="main-form-content-label">Content:</h2> 
        <textarea class="main-form-content-input" name="content" placeholder="Type something here...."></textarea>
        <input class="main-form-submit-button" type="submit" value="Submit Blog" />
      </form>
    </div>`;
  }

  render() {
    return html`${this._formVisible ? this._openBlogForm() : this._blogForm()}`;
  }
}

customElements.define("blog-form", BlogForm);
