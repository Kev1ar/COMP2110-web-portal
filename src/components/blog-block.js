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
  };

  static styles = css`
    :host {
    }
    
    .blogpost {
      text-align: left;
      border-radius: 15px;
      border: 1px solid black;
      background-color: rgb(51, 51, 51); /*light grey*/

      flex-basis: 40%;
      flex-grow: 1;
      min-width: 500px;
      min-height: 200px;
    }
    .blogpost h2 {
      background-color: rgb(0, 80, 60); /* Green / test-colour */
      margin: 0;
     
      text-align: left 1.5%;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      padding: 10px;
      text-transform: capitalize;
    }
    .empty-content {
      font-style: italic;
      color: lightgray;
    }

    .blogpost p, h3{
      text-align: left;
      margin-left: 1.5%;
    }
  `;

  constructor() {
    super();

    //count is number of posts
    const url = `${BASE_URL}blog?count=20`;
    fetch(url)
      .then((response) => response.json())
      .then((posts) => {
        this._posts = posts.posts;
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
        return html`<div class="blogpost">
          <h2>${post.title}</h2>
          <h3>By ${post.name}</h3>
          ${BlockBlock.formatBody(post.content)}
        </div>`;
      })}
    `;
  }
}

customElements.define("blog-block", BlockBlock);
