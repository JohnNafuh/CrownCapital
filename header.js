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

function nav(href, label, current) {
  const active = current === href;

  return `
    <a href="${href}" style="
      text-decoration:none;
      font-size:14px;
      letter-spacing:0.3px;
      padding:8px 14px;
      border-radius:10px;
      transition:0.25s ease;

      color:${active ? "#ffffff" : "rgba(255,255,255,0.65)"};

      background:${active ? "rgba(255,255,255,0.06)" : "transparent"};

      border:1px solid ${active ? "rgba(255,255,255,0.12)" : "transparent"};

      box-shadow:${active ? "0 0 0 1px rgba(176,141,42,0.15)" : "none"};
    ">
      ${label}
    </a>
  `;
}

if (container) {

  const current = getPage();

  function renderHeader(isLoggedIn) {
    return `
      <header style="
        font-family: Arial, sans-serif;
        background: linear-gradient(180deg, #0f0f0f 0%, #0b0b0b 100%);
        border-bottom: 1px solid rgba(255,255,255,0.06);
        position: sticky;
        top: 0;
        z-index: 1000;
      ">

        <!-- LOGO -->
        <div style="
          display:flex;
          justify-content:center;
          padding:22px 0 10px 0;
        ">
          <img 
            src="9468D5BC-D608-461F-8FD0-D934C8A0A490.png"
            style="
              height:82px;
              object-fit:contain;
              filter: drop-shadow(0 6px 18px rgba(176,141,42,0.18));
            "
          >
        </div>

        <!-- NAV -->
        <nav style="
          display:flex;
          justify-content:center;
          gap:30px;
          padding:12px 10px 18px 10px;
          flex-wrap:wrap;
        ">

          ${nav("index.html","Home",current)}
          ${nav("plans.html","Plans",current)}
          ${nav("dashboard.html","Dashboard",current)}

          ${
            isLoggedIn
              ? nav("account.html","Account",current)
              : nav("login.html","Login",current)
          }

        </nav>

      </header>
    `;
  }

  // auth state
  onAuthStateChanged(auth, (user) => {
    container.innerHTML = renderHeader(!!user);
  });
}