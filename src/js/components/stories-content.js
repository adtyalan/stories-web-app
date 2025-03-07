import { LitElement, html } from "lit";
import data from "../data/DATA.json";

class StoriesContent extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html` <div class="container-fluid mt-2">
      <div class="row row-cols-1 row-cols-md-3 g-4 mb-2">
        ${data.listStory.map(
          (story) => html` <div class="col">
            <div class="card h-100">
              <img src="${story.photoUrl}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${story.name}</h5>
                <p class="card-text">${story.description}</p>
              </div>
              <div class="card-footer">
                <small class="text-body-secondary"
                  >${new Date(story.createdAt).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</small
                >
              </div>
            </div>
          </div>`
        )}
      </div>
    </div>`;
  }
}

customElements.define("stories-content", StoriesContent);
