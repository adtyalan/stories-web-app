import { LitElement, html } from "lit";
import bgAboutUs from "../../public/bg-about-us.jpg";

class AboutUs extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <header class="bg-white sticky-top">
        <nav-bar></nav-bar>
      </header>
      <main>
        <div
          class="bg-image d-flex flex-column justify-content-start align-items-start p-5"
          style="background-image: url(${bgAboutUs});
  height: 100vh; background-size: cover;
          background-position: center;
  "
        >
          <h1 class="text-white ">Tentang saya</h1>
          <p class="text-white ">Halo!</p>
          <div class="bg-light rounded-4 p-3 mb-5">
            <p class="text-dark  col-md-12 col-sm-10">
              Aku Alan kreator web cerita sederhana ini. Seorang mahasiswa
              semester 4 di Universitas Negeri Semarang mengambil program studi
              Teknik Informatika. Aku membangun web ini sebagai latihan
              menerapkan aplikasi frontend dengan fitur CRUD dan Auth dari kelas
              Toolset FE Dicoding. Seperti terlihat di background, aku fans BMTH
              sejak album CYB sampe Nex Gen yang banyak pro kontranya. Salken
              brok!
            </p>
          </div>
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
        <p>© 2025 Story App</p>
      </footer>
    `;
  }

  handleButtonClick() {
    window.location.href = "https://www.instagram.com/adtyalan";
  }
}

customElements.define("about-us", AboutUs);
