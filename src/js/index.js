// Import our custom CSS
import "../sass/main.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// Import our custom components
import NavBar from "./components/navbar";
import StoriesContent from "./components/stories-content";
import HomePage from "./components/home-page";
import AboutUs from "./components/about-us";
import AddPage from "./components/add-page";
import RegisterPage from "./components/register-page";
import LoginPage from "./components/login-page";
import DetailStory from "./components/detail-story";

import { renderComponent, navigateTo } from "./routes/router";

// Event listener untuk hashchange dan popstate
window.addEventListener("hashchange", renderComponent);
window.addEventListener("popstate", renderComponent);

// Panggil fungsi renderComponent saat halaman pertama kali dimuat
window.addEventListener("load", renderComponent);

// Penggunaan navigateTo untuk navigasi
document.querySelectorAll("a").forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    event.preventDefault();
    const targetHash = event.target.getAttribute("href");
    navigateTo(targetHash);
  });
});
