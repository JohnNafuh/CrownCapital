import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const auth = getAuth();

document.addEventListener("DOMContentLoaded", () => {

  const headerContainer = document.querySelector(".site-header");

  if (!headerContainer) return;

  headerContainer.innerHTML = `
    <div style="
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:15px 20px;
      background:#0b0b0b;
      border-bottom:1px solid rgba(176,141,42,0.2);
    ">

      <div style="color:#b08d2a;font-weight:bold;font-size:18px;">
        CrownCapital
      </div>

      <div class="nav-links" style="display:flex; gap:15px;">
        <a href="index.html">Home</a>
        <a href="plans.html">Plans</a>
        <a href="dashboard.html">Dashboard</a>
      </div>

      <div id="authArea">
        <a href="login.html" id="loginBtn">Login</a>
      </div>

    </div>
  `;

  const authArea = document.getElementById("authArea");
  const loginBtn = document.getElementById("loginBtn");

  onAuthStateChanged(auth, (user) => {

    if (user) {

      authArea.innerHTML = `
        <a href="account.html" style="color:#b08d2a; margin-right:10px;">Account</a>
        <button id="logoutBtn" style="
          background:#b08d2a;
          border:none;
          padding:6px 12px;
          cursor:pointer;
        ">Logout</button>
      `;

      document.getElementById("logoutBtn").onclick = () => {
        auth.signOut().then(() => {
          location.href = "index.html";
        });
      };

    } else {
      authArea.innerHTML = `<a href="login.html">Login</a>`;
    }
  });

});