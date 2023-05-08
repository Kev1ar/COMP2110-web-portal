/**
 * A Blog widget that displays blog posts pulled from
 * an API
 *
 * <blog-block></blog-block>
 */

import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { BASE_URL } from "../config.js";

class BlockBlock extends LitElement {
  static properties = {
    _posts: { state: true },
    isDarkMode: { type: Boolean },
  };

  static styles = css`
    :host {
    }

    .blogpost {
      text-align: left;

      flex-basis: 40%;
      flex-grow: 1;
      min-width: 500px;
      min-height: 200px;
    }

    .blogpost-light {
      background-color: white;
      color: black;

      box-shadow: 0px 5px 5px black;
    }

    .blogpost-dark {
      background-color: rgb(51, 51, 51); /*light grey*/
    }

    .blogpost h2 {
      margin: 0;

      text-align: left;
      padding: 10px;
      text-transform: capitalize;
    }

    .h2-light {
    }

    .h2-dark {
      background-color: rgb(0, 80, 60); /* Green / test-colour */
    }

    .empty-content {
      font-style: italic;
      color: lightgray;
    }

    .blogpost h3 {
      text-align: justify;

      margin: 0px;
      margin-left: 10px;
      margin-right: 10px;
      padding: 0px;
      margin-top: 5px;
    }
    .blogpost p {
      text-align: justify;

      margin: 0px;
      padding: 10px;
    }
  `;

  constructor() {
    super();
    this.isDarkMode = false;
    //count is number of posts
    const url = `${BASE_URL}blog?count=20`;
    fetch(url)
      .then((response) => response.json())
      .then((posts) => {
        this._posts = posts.posts;
      });
  }

  _toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  _addNewBlog(newBlog, author) {
    const blog = {
      title: newBlog.title,
      content: newBlog.content,
      name: author,
    };
    console.log(blog);
    const tempList = [blog];
    this._posts.forEach((post) => tempList.push(post));
    this._posts = tempList;
  }

  _fetchAgain() {
    //count is number of posts
    const url = `${BASE_URL}blog?count=20&start=` + (this._posts.length + 1);
    fetch(url)
      .then((response) => response.json())
      .then((posts) => {
        const tempList = this._posts.slice();
        posts.posts.forEach((element) => {
          tempList.push(element);
        });
        this._posts = tempList;
      });
  }

  // A simple formatter that just splits text into paragraphs and
  // wraps each in a <p> tag
  // a fancier version could use markdown and a third party markdown
  // formatting library
  static formatBody(text) {
    if (!text) {
      return html`<p class="empty-content">No Content</p>`;
    }
    const paragraphs = text.split("\r\n");
    return paragraphs.map((paragraph) => html`<p>${paragraph}</p>`);
  }

  render() {
    if (!this._posts) return html`Loading...`;

    return html`
      ${this._posts.map((post) => {
        return html`<div
          class="blogpost ${this.isDarkMode
            ? "blogpost-dark"
            : "blogpost-light"}"
        >
          <h2
            class=" ${this.isDarkMode ? "h2-dark" : "h2-light"} ${post.title
              ? ""
              : "empty-content"}"
          >
            ${post.title ? post.title : "No Title"}
          </h2>
          <h3>By ${post.name}</h3>
          ${BlockBlock.formatBody(post.content)}
        </div>`;
      })}
    `;
  }
}

customElements.define("blog-block", BlockBlock);
