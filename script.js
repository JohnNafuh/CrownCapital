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
     ACTIVE NAVIGATION (YOUR ADDITION)
  ========================== */
  const links = document.querySelectorAll(".nav-links a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

});
