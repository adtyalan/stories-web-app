import { html, LitElement } from "lit";

class RegisterPage extends LitElement {
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
          class="row d-flex flex-column align-items-center g-3 needs-validation my-3"
          novalidate
        >
        ${
          this.isImgLoaded
            ? html`
                <div class="col-auto placeholder-glow">
                  <div
                    class="rounded-pill placeholder"
                    style="width: 200px; height: 200px;"
                  ></div>
                  <img
                    src="https://picsum.photos/200/?random=1"
                    class="img-fluid rounded-pill card-img-top"
                    style="display: none;"
                    alt="placeholder image"
                  />
                </div>
              `
            : html`
                <div class="col-auto">
                  <img
                    src="https://picsum.photos/200/?random=1"
                    class="img-fluid rounded-pill card-img-top"
                    alt="placeholder image"
                  />
                </div>
              `
        }
          <div class="col text-center">
            <h2 class="text-center">Buat Akun Baru</h2>
            <p>
              Buat akun untuk menggunakan story app.
            </p>
          </div>
            <div class="col-8">
              <label for="FormControlInput1" class="form-label">Nama</label>
              <input
                type="text"
                class="form-control"
                id="FormControlInput1"
                placeholder="John Doe"
                required
              />
              <div class="invalid-feedback">Masukan nama!</div>
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
              <div class="col-auto mb-1">
                <span id="passwordHelpInline" class="form-text">
                  Password harus memiliki minimal 8 karakter.
                </span>
              </div>
            </div>
            <div class="col-8">
              <button type="submit" class="btn btn-primary">Buat Akun</button>
            </div>
          </div>
        </form>
        <div class="d-flex flex-row justify-content-center gap-1">
          <p class="fs-6">Sudah punya akun? Silakan</p>
          <a href="#login" class="fs-6">Login</a>
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
        }

        form.classList.add("was-validated");
      },
      false
    );

    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this.validateInput(input);
      });
    });
  }

  validateInput(input) {
    if (input.checkValidity()) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    }
  }

  handleSubmit() {
    const name = this.querySelector("#FormControlInput1").value;
    const email = this.querySelector("#FormControlInput2").value;
    const password = this.querySelector("#FormControlInput3").value;

    console.log(typeof name, typeof email, typeof password);
    console.log(name, email, password);
    // registerUser(name, email, password);
    const alert = document.createElement("div");
    alert.setAttribute("role", "alert");
    alert.classList.add("alert", "alert-success");
    alert.innerHTML = `
      Kamu berhasil membuat akun!
      <a href="#login" class="alert-link">klik disini</a>.
      untuk masuk ke akun kamu.
    `;
    this.prepend(alert);
    // window.location.hash = "#login";
  }
}

customElements.define("register-page", RegisterPage);
