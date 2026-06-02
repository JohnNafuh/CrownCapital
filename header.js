document.addEventListener("DOMContentLoaded", function () {

  const header = document.querySelector(".site-header");

  if (!header) return;

  header.innerHTML = `
    <header class="topbar">

      <div class="logo" onclick="location.href='index.html'">
        <img src="9468D5BC-D608-461F-8FD0-D934C8A0A490.png" alt="CrownCapital">
      </div>

      <nav class="nav-links">
        <a href="index.html">Home</a>
        <a href="plans.html">Plans</a>
        <a href="dashboard.html">Dashboard</a>
        <a href="wallet.html">Wallet</a>
      </nav>

    </header>
  `;

  // ACTIVE TAB SYSTEM
  const links = document.querySelectorAll(".nav-links a");
  let currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "" || currentPage === "/") {
    currentPage = "index.html";
  }

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

});
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const auth = getAuth();

document.addEventListener("DOMContentLoaded", () => {

  const nav = document.querySelector(".nav-links");

  if (!nav) return;

  const accountBtn = document.createElement("a");
  accountBtn.href = "account.html";
  accountBtn.innerText = "Account";
  accountBtn.style.display = "none"; // hidden until login confirmed

  nav.appendChild(accountBtn);

  onAuthStateChanged(auth, (user) => {

    if (user) {
      accountBtn.style.display = "inline-block";
    } else {
      accountBtn.remove(); // hide completely if not logged in
    }
  });

});