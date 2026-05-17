document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     PAGE FADE-IN (LUXURY LOAD)
  ========================== */
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 0.8s ease-in-out";

  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 100);

  /* =========================
     BUTTON PRESS EFFECT
  ========================== */
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", function () {
      btn.style.transform = "scale(0.95)";

      setTimeout(() => {
        btn.style.transform = "scale(1)";
      }, 150);
    });
  });

  /* =========================
     CARD HOVER LUXURY GLOW
  ========================== */
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 18px 40px rgba(176, 141, 42, 0.25)";
      card.style.borderColor = "#b08d2a";
      card.style.transition = "0.3s ease";
    });

    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
      card.style.borderColor = "#eee3d2";
    });
  });

  /* =========================
     ACTIVE NAV HIGHLIGHT
  ========================== */
  const links = document.querySelectorAll("nav a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.style.color = "#b08d2a";
      link.style.fontWeight = "bold";
    }
  });

  /* =========================
     BRAND CONSOLE MESSAGE
  ========================== */
  console.log(
    "%cCrownCapital Loaded Successfully",
    "color:#b08d2a;font-size:16px;font-weight:bold;"
  );

});
