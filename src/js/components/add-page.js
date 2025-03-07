import { LitElement, html } from "lit";

class AddPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    this.validateForm();
  }

  render() {
    return html`
      <header>
        <nav-bar></nav-bar>
      </header>
      <main class="container">
        <form class="row g-3 requires-validation" novalidate>
          <div class="mb-3">
            <label for="formFile" class="form-label">Photo</label>
            <input class="form-control" type="file" id="formFile" required />
            <div class="valid-feedback">Photo looks good!</div>
            <div class="invalid-feedback">Photo is required!</div>
          </div>
          <div class="col-md-12">
            <label for="description" class="form-label">Description:</label>
            <input type="text" class="form-control" id="description" required />
            <div class="valid-feedback">Description looks good!</div>
            <div class="invalid-feedback">Description is required!</div>
          </div>
          <div class="col-12">
            <button
              class="btn btn-primary"
              type="submit"
              data-bs-toggle="modal"
              data-bs-target="#modelSuccess"
            >
              Submit
            </button>
          </div>
          <div
            class="modal"
            id="modelSuccess"
            tabindex="-1"
            aria-labelledby="modelSuccess"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Sukses!</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <p>Story berhasil ditambahkan.</p>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
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
          const myModal = new bootstrap.Modal(
            document.getElementsByClassName("modal"),
            options
          );
          myModal.show();
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

    // Tambahkan event listener khusus untuk input file
    const fileInput = form.querySelector("#formFile");
    fileInput.addEventListener("change", () => {
      this.validateInput(fileInput);
    });
  }

  validateInput(input) {
    if (input.type === "file") {
      if (input.files.length > 0) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
      }
    } else {
      if (input.checkValidity()) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
      }
    }
  }
}

customElements.define("add-page", AddPage);
