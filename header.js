const container = document.querySelector(".site-header");

if (container) {
  container.innerHTML = `
  
  <header style="
    background:#0b0b0b;
    border-bottom:1px solid #222;
    font-family:Arial, sans-serif;
  ">

    <!-- TOP ROW (LOGO) -->
    <div style="
      display:flex;
      justify-content:center;
      padding:18px 0 8px 0;
    ">
      <img 
        src="9468D5BC-D608-461F-8FD0-D934C8A0A490.png"
        style="
          height:55px;
          max-width:180px;
          object-fit:contain;
        "
      >
    </div>

    <!-- NAV ROW -->
    <nav style="
      display:flex;
      justify-content:center;
      gap:28px;
      padding:12px 10px 18px 10px;
      flex-wrap:wrap;
    ">

      <a href="index.html" style="color:#fff;text-decoration:none;font-size:14px;opacity:0.8;">Home</a>
      <a href="plans.html" style="color:#fff;text-decoration:none;font-size:14px;opacity:0.8;">Plans</a>
      <a href="dashboard.html" style="color:#fff;text-decoration:none;font-size:14px;opacity:0.8;">Dashboard</a>
      <a href="account.html" style="color:#fff;text-decoration:none;font-size:14px;opacity:0.8;">Account</a>
      <a href="login.html" style="color:#b08d2a;text-decoration:none;font-size:14px;">Login</a>

    </nav>

  </header>
  `;
}