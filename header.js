import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDtE70AdxT2k3hVzwxA4MlDM5pvSNJS6Y8",
  authDomain: "crowncapital-invest.firebaseapp.com",
  projectId: "crowncapital-invest",
  storageBucket: "crowncapital-invest.firebasestorage.app",
  messagingSenderId: "9373579357",
  appId: "1:9373579357:web:6c86ceeb96d4273137b5b4"
};

// Reuse the app if the page already started one (dashboard, account, login do)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

/* =========================
   FONTS (so every page gets them)
========================= */
if (!document.querySelector('link[data-cc-fonts]')) {
  const pre = document.createElement("link");
  pre.rel = "preconnect";
  pre.href = "https://fonts.gstatic.com";
  pre.crossOrigin = "";
  const fonts = document.createElement("link");
  fonts.rel = "stylesheet";
  fonts.dataset.ccFonts = "";
  fonts.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap";
  document.head.append(pre, fonts);
}

/* =========================
   CURRENT PAGE
========================= */
let current = window.location.pathname.split("/").pop();
if (!current) current = "index.html";

const links = [
  ["index.html", "Home"],
  ["plans.html", "Plans"],
  ["dashboard.html", "Dashboard"]
];

const navLinks = links.map(([href, label]) => `
  <a class="cc-nav__link${current === href ? " is-active" : ""}" href="${href}"
     ${current === href ? 'aria-current="page"' : ""}>${label}</a>
`).join("");

/* =========================
   HEADER MARKUP
========================= */
const container = document.querySelector(".site-header");

container.innerHTML = `
<header class="cc-header">
  <div class="wrap cc-header__inner">
    <a class="cc-brand" href="index.html" aria-label="Crown Capital home">
      <img src="logo-mark.png" alt="" width="45" height="34">
      <span>Crown Capital</span>
    </a>

    <button class="cc-menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="ccNav">
      <span></span>
    </button>

    <nav class="cc-nav" id="ccNav" aria-label="Main">
      ${navLinks}
      <a id="authLink" class="cc-nav__link cc-nav__auth is-loading" href="login.html">Login</a>
      <a id="startLink" class="btn" href="login.html">Get started</a>
    </nav>
  </div>
</header>
`;

/* =========================
   MOBILE MENU
========================= */
const header = container.querySelector(".cc-header");
const menuBtn = container.querySelector(".cc-menu-btn");

menuBtn.addEventListener("click", () => {
  const open = header.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

container.querySelectorAll(".cc-nav a").forEach(a =>
  a.addEventListener("click", () => {
    header.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

/* =========================
   AUTH STATE
========================= */
const authLink = document.getElementById("authLink");
const startLink = document.getElementById("startLink");

onAuthStateChanged(auth, (user) => {
  authLink.classList.remove("is-loading");

  if (user) {
    authLink.textContent = "Account";
    authLink.href = "account.html";
    authLink.classList.toggle("is-active", current === "account.html");
    startLink.textContent = "Invest now";
    startLink.href = "plans.html";
  } else {
    authLink.textContent = "Login";
    authLink.href = "login.html";
    authLink.classList.toggle("is-active", current === "login.html");
    startLink.textContent = "Get started";
    startLink.href = "login.html";
  }
});
