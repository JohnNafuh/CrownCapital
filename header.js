const container = document.querySelector(".site-header");

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDtE70AdxT2k3hVzwxA4MlDM5pvSNJS6Y8",
  authDomain: "crowncapital-invest.firebaseapp.com",
  projectId: "crowncapital-invest",
  storageBucket: "crowncapital-invest.firebasestorage.app",
  messagingSenderId: "9373579357",
  appId: "1:9373579357:web:6c86ceeb96d4273137b5b4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function getPage() {
  let page = window.location.pathname.split("/").pop();
  if (!page || page === "/") page = "index.html";
  return page;
}

const current = getPage();

/* =========================
   1. RENDER STATIC SHELL ONLY ONCE
========================= */
container.innerHTML = `
<header style="
  font-family: Arial, sans-serif;
  background: linear-gradient(180deg, #0f0f0f 0%, #0b0b0b 100%);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  position: sticky;
  top: 0;
  z-index: 1000;
">

  <!-- LOGO -->
  <div style="display:flex;justify-content:center;padding:22px 0 10px;">
    <img 
      src="9468D5BC-D608-461F-8FD0-D934C8A0A490.png"
      style="height:82px;object-fit:contain;
      filter: drop-shadow(0 6px 18px rgba(176,141,42,0.18));"
    >
  </div>

  <!-- NAV -->
  <nav style="
    display:flex;
    justify-content:center;
    gap:30px;
    padding:12px 10px 18px;
    flex-wrap:wrap;
  ">

    ${nav("index.html","Home")}
    ${nav("plans.html","Plans")}
    ${nav("dashboard.html","Dashboard")}

    <!-- AUTH BUTTON (ONLY DYNAMIC PART) -->
    <a id="authLink" href="#" style="
      text-decoration:none;
      font-size:14px;
      padding:8px 14px;
      border-radius:10px;
      transition:0.25s ease;
      color:rgba(255,255,255,0.45);
      border:1px solid rgba(255,255,255,0.06);
      pointer-events:none;
      opacity:0.5;
    ">
      Loading...
    </a>

  </nav>

</header>
`;

function nav(href, label) {
  const active = current === href;

  return `
    <a href="${href}" style="
      text-decoration:none;
      font-size:14px;
      padding:8px 14px;
      border-radius:10px;
      transition:0.2s ease;

      color:${active ? "#ffffff" : "rgba(255,255,255,0.65)"};
      background:${active ? "rgba(255,255,255,0.06)" : "transparent"};
      border:1px solid ${active ? "rgba(255,255,255,0.12)" : "transparent"};
    ">
      ${label}
    </a>
  `;
}

/* =========================
   2. FIREBASE STATE HANDLER
   (NO DOM REBUILD = NO FLICKER)
========================= */

const authLink = document.getElementById("authLink");

onAuthStateChanged(auth, (user) => {

  if (user === undefined) return; // still loading (true loading state)

  if (user) {
    authLink.textContent = "Account";
    authLink.href = "account.html";

    authLink.style.color = "#ffffff";
    authLink.style.border = "1px solid rgba(255,255,255,0.12)";
    authLink.style.background = "rgba(255,255,255,0.06)";
    authLink.style.pointerEvents = "auto";
    authLink.style.opacity = "1";
  } else {
    authLink.textContent = "Login";
    authLink.href = "login.html";

    authLink.style.color = "rgba(255,255,255,0.65)";
    authLink.style.border = "1px solid rgba(255,255,255,0.06)";
    authLink.style.background = "transparent";
    authLink.style.pointerEvents = "auto";
    authLink.style.opacity = "1";
  }

});