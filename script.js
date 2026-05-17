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
     SMOOTH PAGE TRANSITION
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

  /* =========================
     AUTO ACTIVE NAVIGATION
  ========================== */
  const navLinks = document.querySelectorAll("nav a");
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

});
