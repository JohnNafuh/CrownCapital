document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     NAV ACTIVE SYSTEM
  ========================= */
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

  /* =========================
     📈 START LIVE MARKET
  ========================= */
  startLiveMarket();
});

/* =========================
   LIVE MARKET ENGINE
========================= */
function startLiveMarket() {

  let price = 1000;

  setInterval(() => {

    const change = (Math.random() * 20 - 10); // random -10 to +10
    price += change;

    if (price < 200) price = 200; // safety floor

    const priceEl = document.getElementById("price");
    const profitEl = document.getElementById("profit");
    const lossEl = document.getElementById("loss");

    if (!priceEl) return;

    /* PRICE UPDATE */
    priceEl.innerText = "$" + price.toFixed(2);
    priceEl.style.color = change >= 0 ? "#16c784" : "#ea3943";

    /* PROFIT UPDATE */
    if (profitEl) {
      const profit = change >= 0 ? change * 10 : 0;
      profitEl.innerText = "+" + "$" + profit.toFixed(2);
      profitEl.style.color = "#16c784";
    }

    /* LOSS UPDATE */
    if (lossEl) {
      const loss = change < 0 ? Math.abs(change * 10) : 0;
      lossEl.innerText = "-" + "$" + loss.toFixed(2);
      lossEl.style.color = "#ea3943";
    }

  }, 2500);
}
