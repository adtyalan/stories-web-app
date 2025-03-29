import "../components/home-page";
import "../components/about-us";
import "../components/add-page";
import "../components/register-page";
import "../components/login-page";
import "../components/detail-story";

// Fungsi untuk merender komponen berdasarkan hash
function renderComponent() {
  let hash = window.location.hash;

  // Jika hash kosong, arahkan ke #home
  if (!hash) {
    hash = "#register";
    window.history.replaceState({}, "", hash);
  }

  const app = document.getElementById("app");
  app.innerHTML = ""; // Kosongkan konten sebelumnya

  switch (true) {
    case hash === "#home":
      app.appendChild(document.createElement("home-page"));
      break;
    case hash === "#about":
      app.appendChild(document.createElement("about-us"));
      break;
    case hash === "#addstory":
      app.appendChild(document.createElement("add-page"));
      break;
    case hash === "#register":
      app.appendChild(document.createElement("register-page"));
      break;
    case hash === "#login":
      app.appendChild(document.createElement("login-page"));
      break;
    case /^#detail\/[\w-]+$/.test(hash): // Perbarui ekspresi reguler untuk mencocokkan ID alfanumerik dan simbol
      const id = hash.split("/")[1];
      const detailStoryElement = document.createElement("detail-story");
      detailStoryElement.storyId = id; // Setel properti storyId langsung
      app.appendChild(detailStoryElement);
      break;
    default:
      app.innerHTML = "<h1>404 - Page Not Found</h1>";
  }
}

// Fungsi untuk mengubah hash dan menggunakan History API
function navigateTo(hash) {
  window.history.pushState({}, "", hash);
  renderComponent();
}

export { renderComponent, navigateTo };
