import { LitElement, html } from "lit";
import { getAllStories } from "../utils/api-request";

class StoriesContent extends LitElement {
  static properties = {
    stories: { type: Array },
    isLoading: { type: Boolean },
  };

  constructor() {
    super();
    this.stories = [];
    this.isLoading = true;
  }

  createRenderRoot() {
    return this;
  }

  async firstUpdated() {
    this.isLoading = true;
    const stories = await getAllStories();
    if (stories) {
      this.stories = stories;
    }
    this.isLoading = false;
  }

  async moveToDetail(id) {
    window.location.href = `#detail/${id}`;
  }

  render() {
    return html`
      <div class="container-fluid mt-2">
        ${this.isLoading
          ? html`
              <div class="row row-cols-1 row-cols-md-3 g-4 mb-2">
                ${[1, 2, 3, 4, 5, 6].map(
                  () => html`
                    <div class="col">
                      <div class="card h-100" aria-hidden="true">
                        <img
                          src="..."
                          style="aspect-ratio: 16/9;"
                          class="card-img-top placeholder"
                          alt="..."
                        />
                        <div class="card-body">
                          <h5 class="card-title placeholder-glow">
                            <span class="placeholder col-6"></span>
                          </h5>
                          <p class="card-text placeholder-glow">
                            <span class="placeholder col-7"></span>
                            <span class="placeholder col-4"></span>
                            <span class="placeholder col-4"></span>
                            <span class="placeholder col-6"></span>
                            <span class="placeholder col-8"></span>
                          </p>
                          <a
                            class="btn btn-primary disabled placeholder col-6"
                            aria-disabled="true"
                          ></a>
                        </div>
                      </div>
                    </div>
                  `
                )}
              </div>
            `
          : html`
              <div class="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4 mb-2">
                ${this.stories.map(
                  (story) => html`
                    <div class="col">
                      <div class="card h-100">
                        <img
                          src="${story.photoUrl}"
                          class="card-img-top"
                          alt="..."
                        />
                        <div
                          class="card-body"
                          @click="${() => this.moveToDetail(story.id)}"
                          style="cursor: pointer;"
                        >
                          <h5 class="card-title">${story.name}</h5>
                          <p class="card-text">${story.description}</p>
                        </div>
                        <div class="card-footer">
                          <small class="text-body-secondary">
                            ${new Date(story.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </small>
                        </div>
                      </div>
                    </div>
                  `
                )}
              </div>
            `}
      </div>
    `;
  }
}

customElements.define("stories-content", StoriesContent);
