import { html, LitElement } from "lit";
import { loginUser } from "../utils/api-request";

class LoginPage extends LitElement {
  static properties = {
    isImgLoaded: { type: Boolean },
  };

  constructor() {
    super();
    this.isImgLoaded = true;
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    const img = this.querySelector("img");
    img.addEventListener("load", () => {
      this.isImgLoaded = false;
    });
    this.validateForm();
  }

  render() {
    return html`
      <div class="container">
        <form
          class="row d-flex flex-column align-items-center g-3 needs-validation my-5"
          novalidate
        >
          ${this.isImgLoaded
            ? html`
                <div class="col-auto placeholder-glow">
                  <div
                    class="rounded-pill placeholder"
                    style="width: 200px; height: 200px;"
                  ></div>
                  <img
                    src="https://picsum.photos/200/?random=1"
                    class="img-fluid rounded-pill"
                    style="display: none;"
                    alt="placeholder image"
                  />
                </div>
              `
            : html`
                <div class="col-auto">
                  <img
                    src="https://picsum.photos/200/?random=1"
                    class="img-fluid rounded-pill"
                    alt="placeholder image"
                  />
                </div>
              `}
          <div class="col">
            <h2 class="text-center">Login ke StoryApp</h2>
          </div>
          <div class="col-8">
            <label for="FormControlInput2" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="FormControlInput2"
              placeholder="name@example.com"
              required
            />
            <div class="invalid-feedback">Masukkan email!</div>
          </div>
          <div class="col-8">
            <label for="FormControlInput3" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="FormControlInput3"
              placeholder=""
              required
            />
            <div class="invalid-feedback">Masukkan password!</div>
            <div class="col-8">
              <span id="passwordHelpInline" class="form-text">
                Masukkan password yang sesuai.
              </span>
            </div>
          </div>
          <div class="col-8">
            <button id="submitBtn" type="submit" class="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <div class="d-flex flex-row justify-content-center gap-1">
          <p class="fs-6">Belum punya akun? Silakan</p>
          <a class="fs-6" href="#register">Daftar</a>
        </div>
        <div class="d-flex flex-row justify-content-center gap-1">
          <p class="fs-6">Masuk sebagai tamu?</p>
          <a href="#home" class="fs-6">Jelajah</a>
        </div>
      </div>
    `;
  }

  validateForm() {
    const form = this.querySelector("form");

    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault(); // Prevent default submit behavior
          this.handleSubmit();
          this.showLoading();
        }
      },
      false
    );
  }

  async handleSubmit() {
    const email = this.querySelector("#FormControlInput2").value;
    const password = this.querySelector("#FormControlInput3").value;

    try {
      await loginUser(email, password);

      if (localStorage.getItem("token")) {
        window.location.hash = "#home";
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  showLoading() {
    const btn = document.getElementById("submitBtn");
    btn.innerHTML = `
      <button class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span role="status">Loading...</span>
      </button>
    `;
  }
}

customElements.define("login-page", LoginPage);
