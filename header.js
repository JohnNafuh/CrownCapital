import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const auth = getAuth();

document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector(".site-header");

  if (!container) return;

  container.innerHTML = `
    <div style="
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:15px 20px;
      background:#0b0b0b;
      border-bottom:1px solid #222;
    ">

      <div style="color:#b08d2a;font-weight:bold;">
        CrownCapital
      </div>

      <div style="display:flex;gap:15px;">
        <a href="index.html" style="color:white;">Home</a>
        <a href="plans.html" style="color:white;">Plans</a>
        <a href="dashboard.html" style="color:white;">Dashboard</a>
      </div>

      <div id="authArea">
        <a href="login.html" style="color:#b08d2a;">Login</a>
      </div>

    </div>
  `;

  const authArea = document.getElementById("authArea");

  onAuthStateChanged(auth, (user) => {

    if (user) {

      authArea.innerHTML = `
        <a href="account.html" style="color:#b08d2a;margin-right:10px;">Account</a>
        <button id="logoutBtn" style="
          background:#b08d2a;
          border:none;
          padding:6px 12px;
          cursor:pointer;
        ">Logout</button>
      `;

      document.getElementById("logoutBtn").onclick = () => {
        signOut(auth).then(() => {
          location.href = "index.html";
        });
      };

    } else {
      authArea.innerHTML = `<a href="login.html" style="color:#b08d2a;">Login</a>`;
    }
  });

});