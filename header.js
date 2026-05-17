document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".site-header").innerHTML = `
    <header class="top-header">

      <div class="logo" onclick="location.href='index.html'">

        <div class="logo-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M3 7L7 11L12 5L17 11L21 7V18C21 19.1 20.1 20 19 20H5C3.9 20 3 19.1 3 18V7Z"
              stroke="#b08d2a" stroke-width="1.8" stroke-linejoin="round"/>
          </svg>
        </div>

        <div class="logo-text">CrownCapital</div>

      </div>

      <nav class="nav-links">
        <a href="index.html">Home</a>
        <a href="plans.html">Investment Plans</a>
        <a href="dashboard.html">Dashboard</a>
        <a href="wallet.html">Wallet</a>
      </nav>

    </header>
  `;
});
