document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     PAGE FADE IN EFFECT
  ========================== */
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 0.6s ease-in-out";

  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 100);

  /* =========================
     SMOOTH LINK TRANSITION (optional luxury feel)
  ========================== */
  const links = document.querySelectorAll("a");

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");

      // Only apply to internal pages
      if (href && href.endsWith(".html")) {
        e.preventDefault();

        document.body.style.opacity = 0;

        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });

  /* =========================
     BUTTON PRESS ANIMATION
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

});
