document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".site-header").innerHTML = `
    <header class="top-header">

     <div class="logo" onclick="location.href='index.html'">
  <img src="9468D5BC-D608-461F-8FD0-D934C8A0A490.png" alt="CrownCapital Logo">
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
