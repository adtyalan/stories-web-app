import { LitElement, html } from "lit";

class HomePage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    const isLoggedin = !!localStorage.getItem("token");

    return html`
      <header class="bg-white sticky-top">
        <nav-bar></nav-bar>
      </header>
      <main>
        ${isLoggedin
          ? html` <stories-content></stories-content> `
          : html`
              <h1
                class="text-center font-monospace vh-100 d-flex justify-content-center align-items-center"
              >
                Login terlebih dahulu untuk melihat cerita
              </h1>
            `}
      </main>
      <footer>
        <p>© 2025 Story App</p>
      </footer>
    `;
  }
}

customElements.define("home-page", HomePage);
