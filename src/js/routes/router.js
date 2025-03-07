import "../components/home-page";
import "../components/about-us";
import "../components/add-page";

// Fungsi untuk merender komponen berdasarkan hash
function renderComponent() {
  let hash = window.location.hash;

  // Jika hash kosong, arahkan ke #home
  if (!hash) {
    hash = "#home";
    window.history.replaceState({}, "", hash);
  }

  const app = document.getElementById("app");
  app.innerHTML = ""; // Kosongkan konten sebelumnya

  switch (hash) {
    case "#home":
      app.appendChild(document.createElement("home-page"));
      break;
    case "#about":
      app.appendChild(document.createElement("about-us"));
      break;
    case "#addstory":
      app.appendChild(document.createElement("add-page"));
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
