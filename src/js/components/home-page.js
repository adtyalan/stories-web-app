import { LitElement, html } from "lit";

class HomePage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html` <header>
        <nav-bar></nav-bar>
      </header>
      <main>
        <stories-content></stories-content>
        <modal-page></modal-page>
      </main>
      <footer></footer>`;
  }
}

customElements.define("home-page", HomePage);
