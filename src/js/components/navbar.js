import { LitElement, html } from "lit";

class NavBar extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    const isLoggedIn = !!localStorage.getItem("token");

    return html`
      <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div class="container-fluid gap-3">
          <a class="navbar-brand" href="#home">Story App</a>
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
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div class="d-flex justify-content-between">
              <div class="navbar-nav">
                <a class="nav-link" href="#home">Beranda</a>
                <a class="nav-link" href="#addstory">Tambah</a>
                <a class="nav-link" href="#about">Tentang</a>
              </div>
              <div class="dropdown btn-group">
                <button
                  class="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fa-solid fa-user"></i>
                </button>
                ${isLoggedIn
                  ? html`
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                          <a class="dropdown-item" @click="${this.handleLogout}"
                            >Logout</a
                          >
                        </li>
                      </ul>
                    `
                  : html`
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                          <a class="dropdown-item" href="#register">Register</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#login">Login</a>
                        </li>
                      </ul>
                    `}
              </div>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  handleLogout() {
    localStorage.removeItem("token");
    window.location.hash = "#home";
    window.location.reload();
  }
}

customElements.define("nav-bar", NavBar);
