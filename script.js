document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     ACTIVE NAVIGATION SYSTEM
  ========================= */
  const links = document.querySelectorAll(".nav-links a");
  let currentPage = window.location.pathname.split("/").pop();

  // Fix for GitHub Pages root URL
  if (currentPage === "" || currentPage === "/") {
    currentPage = "index.html";
  }

  links.forEach(link => {
    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  /* =========================
     📊 MARKET ANIMATION
  ========================= */
  animateValue("profit", 0, 12450, 1500);
  animateValue("loss", 0, 320, 1500);
});

/* =========================
   NUMBER COUNTER FUNCTION
========================= */
function animateValue(id, start, end, duration) {
  let obj = document.getElementById(id);
  if (!obj) return;

  let range = end - start;
  let current = start;
  let increment = range / (duration / 16);

  let timer = setInterval(() => {
    current += increment;

    let prefix = id === "growth" ? "+" : "$";
    obj.innerText = prefix + current.toFixed(2);

    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      clearInterval(timer);
      obj.innerText = prefix + end.toFixed(2);
    }
  }, 16);
}
