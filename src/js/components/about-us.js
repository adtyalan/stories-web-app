import { LitElement, html } from "lit";
import bgAboutUs from "../../public/bg-about-us.jpg";

class AboutUs extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <header>
        <nav-bar></nav-bar>
      </header>
      <main>
        <h1 class="pb-3" style="text-align: center;">Tentang Kreator</h1>
        <div
          class="bg-image d-flex flex-column justify-content-start align-items-start p-5"
          style="background-image: url(${bgAboutUs});
  height: 80vh; background-size: cover;
          background-position: center;
  "
        >
          <h2 class="text-white bg-dark">Halo!</h2>
          <p class="text-white bg-dark col-md-6 col-sm-8">
            Aku Alan. Pembuat web sederhana ini. Seorang mahasiswa semester 4 di
            Universitas Negeri Semarang mengambil program studi Teknik
            Informatika. Seperti di background, aku penggemar BMTH
          </p>
          <div>
            <button
              @click=${this.handleButtonClick}
              type="button"
              class="btn btn-secondary"
              target="_blank"
            >
              Hubungi saya
            </button>
          </div>
        </div>
      </main>
      <footer>
        <p>© 2025 Alan Aditya</p>
      </footer>
    `;
  }

  handleButtonClick() {
    window.location.href = "https://www.instagram.com/adtyalan";
  }
}

customElements.define("about-us", AboutUs);
