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

const navLinks = links.map(([href, label, show]) => `
  <a class="cc-nav__link${current === href ? " is-active" : ""}" href="${href}"
     ${current === href ? 'aria-current="page"' : ""}${show ? ` data-show="${show}"` : ""}>${label}</a>
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
      <a id="startLink" class="btn" href="signup.html" hidden>Get started</a>
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
   FOOTER (any page with .site-footer-slot)
   Items marked data-show="in" / "out" only appear
   when the visitor is logged in / logged out.
========================= */
const footerSlot = document.querySelector(".site-footer-slot");

// Footer never links to the page you're already on
function footerLink(href, label, show) {
  if (href === current) return "";
  return `<a href="${href}"${show ? ` data-show="${show}"` : ""}>${label}</a>`;
}

if (footerSlot) {
  footerSlot.outerHTML = `
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-top">
      <a class="cc-brand" href="index.html" aria-label="Crown Capital home">
        <img src="logo-mark.png" alt="" width="45" height="34">
        <span>Crown Capital</span>
      </a>

      <nav class="footer-links" aria-label="Footer">
        ${footerLink("index.html", "Home")}
        ${footerLink("plans.html", "Plans")}
        ${footerLink("dashboard.html", "Dashboard")}
        ${footerLink("account.html", "Account", "in")}
        ${footerLink("login.html", "Login", "out")}
        <a href="mailto:support@crowncapital.com">Support</a>
      </nav>
    </div>

    <div class="footer-legal">
      <p class="footer-bottom">© ${new Date().getFullYear()} CrownCapital. All rights reserved.</p>
      <nav aria-label="Legal">
        ${footerLink("terms.html", "Terms")}
        ${footerLink("privacy.html", "Privacy")}
      </nav>
    </div>
  </div>
</footer>`;
}

/* =========================
   AUTH STATE
========================= */
const authLink = document.getElementById("authLink");
const startLink = document.getElementById("startLink");

onAuthStateChanged(auth, (user) => {
  authLink.classList.remove("is-loading");

  // Lets any page show/hide [data-show="in"] and [data-show="out"]
  document.documentElement.dataset.auth = user ? "in" : "out";

  if (user) {
    authLink.textContent = "Account";
    authLink.href = "account.html";
    authLink.classList.toggle("is-active", current === "account.html");
    startLink.hidden = true;
  } else {
    authLink.textContent = "Login";
    authLink.href = "login.html";
    authLink.classList.toggle("is-active", current === "login.html");
    startLink.hidden = false;
    startLink.textContent = "Get started";
    startLink.href = "signup.html";
  }
});
