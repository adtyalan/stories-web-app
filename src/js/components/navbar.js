import { LitElement, html } from "lit";

class NavBar extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="#home">Stories</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link" href="#home">Beranda</a>
              <a class="nav-link" href="#addstory">Tambah</a>
              <a class="nav-link" href="#about">Tentang</a>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define("nav-bar", NavBar);
