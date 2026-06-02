// header.js (WORKING SIMPLE VERSION - GITHUB PAGES SAFE)

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".site-header");

  if (!container) return;

  container.innerHTML = `
    <header style="
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:15px 20px;
      background:#0b0b0b;
      border-bottom:1px solid #222;
      font-family:Arial, sans-serif;
    ">

      <div style="color:#b08d2a;font-weight:bold;font-size:18px;">
        CrownCapital
      </div>

      <nav style="display:flex;gap:15px;">
        <a href="index.html" style="color:white;text-decoration:none;">Home</a>
        <a href="plans.html" style="color:white;text-decoration:none;">Plans</a>
        <a href="dashboard.html" style="color:white;text-decoration:none;">Dashboard</a>
        <a href="account.html" style="color:white;text-decoration:none;">Account</a>
      </nav>

      <div>
        <a href="login.html" style="
          color:#b08d2a;
          text-decoration:none;
          font-weight:bold;
        ">
          Login
        </a>
      </div>

    </header>
  `;
});