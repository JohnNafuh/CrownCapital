// CrownCapital HEADER (RESTORED STYLE)

const container = document.querySelector(".site-header");

if (container) {
  container.innerHTML = `
    
    <div style="
      background:#0b0b0b;
      border-bottom:1px solid #222;
      font-family:Arial;
      padding:15px 10px;
      text-align:center;
    ">

<div>
  <img src="9468D5BC-D608-461F-8FD0-D934C8A0A490.png" style="height:40px;">
</div>

      <!-- NAV TABS (BOTTOM) -->
      <div style="
        display:flex;
        justify-content:center;
        gap:20px;
        flex-wrap:wrap;
      ">

        <a href="index.html" style="color:white;text-decoration:none;">Home</a>
        <a href="plans.html" style="color:white;text-decoration:none;">Plans</a>
        <a href="dashboard.html" style="color:white;text-decoration:none;">Dashboard</a>
        <a href="account.html" style="color:white;text-decoration:none;">Account</a>
        <a href="login.html" style="color:#b08d2a;text-decoration:none;">Login</a>

      </div>

    </div>
  `;
}