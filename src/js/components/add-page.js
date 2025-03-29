import { LitElement, html } from "lit";
import { createGuestStory, createStory } from "../utils/api-request";

class AddPage extends LitElement {
  static properties = {
    description: { type: String },
    file: { type: Object },
    location: { type: Object },
  };

  constructor() {
    super();
    this.description = "";
    this.file = null;
    this.location = { lat: null, lon: null };
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    this.getLocation();
  }

  async getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.location = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
        },
        (error) => {
          console.error("Error getting location:", error);
          this.location = { lat: null, lon: null };
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      this.location = { lat: null, lon: null };
    }
  }

  render() {
    return html`
      <header>
        <nav-bar></nav-bar>
      </header>
      <main class="container mt-3">
        <form
          class="row g-3 needs-validation"
          novalidate
          @submit="${this.handleSubmit}"
        >
          <div class="mb-3">
            <label for="formFile" class="form-label">Photo</label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              required
              accept=".jpg, .jpeg, .png"
              @change="${this.handleFileChange}"
            />
            <div class="invalid-feedback"></div>
            <div class="valid-feedback">Foto sudah bagus!</div>
            <div class="col-auto mb-1">
              <span id="passwordHelpInline" class="form-text">
                Gunakan file berekstensi .jpg, .jpeg, atau .png dengan ukuran
                maksimal 1MB.
              </span>
            </div>
          </div>
          <div class="col-md-12">
            <label for="description" class="form-label">Description:</label>
            <input
              type="text"
              class="form-control"
              id="description"
              required
              .value="${this.description}"
              @input="${(e) => (this.description = e.target.value)}"
            />
            <div class="invalid-feedback">Deskripsi wajib ditambahkan!</div>
            <div class="valid-feedback">Deskripsi sudah bagus!</div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary" type="submit">Submit</button>
          </div>
        </form>
      </main>
    `;
  }

  handleFileChange(event) {
    const fileInput = event.target; // Ambil elemen input file
    const invalidFeedback = fileInput.nextElementSibling; // Ambil elemen invalid-feedback berikutnya
    const file = fileInput.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 1048576; // 1MB in bytes

    if (file && allowedTypes.includes(file.type) && file.size <= maxSize) {
      this.file = file;
      fileInput.classList.remove("is-invalid");
      fileInput.classList.add("is-valid");
      fileInput.setCustomValidity(""); // Reset pesan validasi
      if (invalidFeedback) invalidFeedback.textContent = ""; // Kosongkan pesan kesalahan
    } else {
      this.file = null;
      fileInput.classList.remove("is-valid");
      fileInput.classList.add("is-invalid");

      if (!allowedTypes.includes(file.type)) {
        fileInput.setCustomValidity("File harus berupa .jpg, .jpeg, atau .png");
        if (invalidFeedback)
          invalidFeedback.textContent =
            "File harus berupa .jpg, .jpeg, atau .png";
      } else if (file.size > maxSize) {
        fileInput.setCustomValidity("Ukuran file tidak boleh lebih dari 1MB");
        if (invalidFeedback)
          invalidFeedback.textContent =
            "Ukuran file tidak boleh lebih dari 1MB";
      }
    }
  }

  async handleSubmit(event) {
    event.preventDefault(); // Mencegah perilaku default form

    if (!this.description || !this.file) {
      alert("Deskripsi dan file harus diisi!");
      return;
    }

    if (localStorage.getItem("token") === null) {
      try {
        const formData = new FormData();
        formData.append("description", this.description);
        formData.append("photo", this.file);
        if (this.location.lat !== null && this.location.lon !== null) {
          formData.append("lat", this.location.lat);
          formData.append("lon", this.location.lon);
        }

        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
        console.log("File type: ", typeof this.file);

        await createGuestStory(formData);

        alert("Story berhasil ditambahkan!");
      } catch (error) {
        console.error("Gagal menambahkan story:", error);
        alert("Gagal menambahkan story. Pastikan semua data sudah benar.");
      }
    } else if (localStorage.getItem("token") !== null) {
      try {
        const formData = new FormData();
        formData.append("description", this.description);
        formData.append("photo", this.file);
        formData.append("lat", this.location.lat);
        formData.append("lon", this.location.lon);

        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
        console.log("File type: ", typeof this.file);

        await createStory(formData);

        alert("Story berhasil ditambahkan!");
      } catch (error) {
        console.error("Gagal menambahkan story:", error);
        alert("Gagal menambahkan story. Pastikan semua data sudah benar.");
      }
    }
  }
}

customElements.define("add-page", AddPage);
