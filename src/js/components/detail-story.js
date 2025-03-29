import { LitElement, html } from "lit";
import { detailStory } from "../utils/api-request";

class DetailStory extends LitElement {
  static properties = {
    storyId: { type: String },
    story: { type: Object },
  };

  constructor() {
    super();
    this.storyId = "";
    this.story = null;
  }

  async updated(changedProperties) {
    if (changedProperties.has("storyId") && this.storyId) {
      this.story = await detailStory(this.storyId);
      this.requestUpdate();
    }
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <header class="bg-white sticky-top">
        <nav-bar></nav-bar>
      </header>
      <main>
        <div class="container mt-5">
          ${this.story
            ? html`
                <div class="card text-bg-light mb-3" style="max-width: 18rem;">
                  <div class="card-header">Detail Cerita</div>
                  <img
                    src="${this.story.photoUrl}"
                    class="card-img-top"
                    alt="${this.story.name}"
                  />
                  <div class="card-body">
                    <h5 class="card-title">${this.story.name}</h5>
                    <p class="card-text">${this.story.description}</p>
                  </div>
                  <div class="card-footer text-body-secondary">
                    ${new Date(this.story.createdAt).toLocaleDateString(
                      "id-ID",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </div>
                </div>
              `
            : html`<p>Loading...</p>`}
        </div>
      </main>
      <footer>
        <p>© 2025 Story App</p>
      </footer>
    `;
  }
}

customElements.define("detail-story", DetailStory);
