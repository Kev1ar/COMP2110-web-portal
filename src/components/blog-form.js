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
    isDarkMode: { type: Boolean },
  };

  static styles = css`
    :host {
    }

    .open-blog-form-button {
      position: fixed;
      bottom: 15px;
      right: 15px;
      
      width: 100px;
      height: 120px;
    }
    .open-blog-form-button button {
      width: 100%;
      height: 100%;

      font-size: 15px;
    }

    .open-blog-form-button img {
      width: 100%;
      height: auto;
    }

    .main-container {
      z-index: 2;
      // background-color: red;

      display: grid;
      grid-template:
        "a a a a" 0.2fr
        "c c c c" 0.8fr;
      gap: 5px;

      position: fixed;
      width: 80%;
      height: 70%;

      top: 10%;
      bottom: 0;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;

      border-radius: 15px;
      border: 1px solid black;
    }

    .main-light {
      background-color: white;
      color: black;
    }

    .main-dark {
      background-color: rgb(51, 51, 51);
      color: white;
    }

    .header-container {
      grid-area: a;

      display: flex;

      margin: 0;
      padding: 0;

      align-items: center;
      justify-content: center;

      border-top-right-radius: 15px;
      border-top-left-radius: 15px;
    }

    .header-light {
      background-color: rgb(196, 213, 230);
    }

    .header-dark {
      background-color: rgb(0, 80, 60); /* Green / test-colour */
    }

    h1 {
      margin: 0;
      padding: 0;

      font-size: 50px;
    }

    .form-close-button {
      //   background-color: orange;
      position: absolute;
      top: 5px;
      right: 5px;

      margin: 0;
      padding: 0;

      border: none;

      width: 50px;
      height: 50px;

      border-radius: 50%;
      box-shadow: 0px 0px 5px inset;
    }
    .form-close-button img {
      width: 100%;
      height: auto;
    }

    .main-form {
      // background-color: lightblue;
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
      margin-left: 5%;

      text-align: left;
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
      margin-left: 5%;

      text-align: left;
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
    this.isDarkMode = true;
  }

  //dark mode switch
  //---------------------------------------------------------------------------------------------------------------------------------------------
  _toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }
  //---------------------------------------------------------------------------------------------------------------------------------------------

  //Blog Submission
  //---------------------------------------------------------------------------------------------------------------------------------------------
  _submitBlog(event) {
    event.preventDefault();

    //user needs to be signed in
    if (!getUser()) {
      alert("Please Login before trying to Submit a Blog");
      return;
    }

    this._title = event.target.title.value;
    this._content = event.target.content.value;

    //title and content cannot be blank
    if (this._title.trim().length < 1 || this._content.trim().length < 1) {
      alert(
        "Blog cannot be submitted without a Title and Content. Please fill in the fields and try again"
      );

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
    //close the blog form after
    this._formVisible = !this._formVisible;

    //add it the to the current list of blogs at the top
    //that way no refresh is needed for new blog to show up
    var el = document
      .getElementsByTagName("comp2110-portal")[0]
      .shadowRoot.getElementById("blogs");
    el._addNewBlog(postBody, this._user.name);
  }
  //---------------------------------------------------------------------------------------------------------------------------------------------

  //Main components
  //---------------------------------------------------------------------------------------------------------------------------------------------
  _openBlogForm() {
    return html`<div class="open-blog-form-button">
      <button
        @click="${() =>
          getUser()
            ? (this._formVisible = !this._formVisible)
            : alert("Please Login before trying to Submit a Blog")}"
      >
        <img src="https://cdn-icons-png.flaticon.com/512/3573/3573196.png" />
        Submit Blog
      </button>
    </div>`;
  }
  _blogForm() {
    this._user = getUser();

    return html`<div class="main-container ${
      this.isDarkMode ? "main-dark" : "main-light"
    }">
      <div class="header-container ${
        this.isDarkMode ? "header-dark" : "header-light"
      }"><h1>Submit a New Blog</h1></div>
      <button class="form-close-button" @click="${() =>
        (this._formVisible =
          !this
            ._formVisible)}""><img src="https://cdn-icons-png.flaticon.com/512/9974/9974058.png"/></button>
      <form class="main-form" @submit=${this._submitBlog}>
        <h2 class="main-form-title-label">Title:</h2> 
        <input class="main-form-title-input" name="title" placeholder="Blog Title"/> 
        <h2 class="main-form-content-label">Content:</h2> 
        <textarea class="main-form-content-input" name="content" placeholder="Type something here...."></textarea>
        <input class="main-form-submit-button" type="submit" value="Submit Blog" />
      </form>
    </div>`;
  }
  //---------------------------------------------------------------------------------------------------------------------------------------------
  render() {
    return html`${this._openBlogForm()}
    ${this._formVisible ? null : this._blogForm()}`;
  }
}

customElements.define("blog-form", BlogForm);
