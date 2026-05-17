document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     HAMBURGER MENU TOGGLE
  ========================== */
  window.toggleMenu = function () {
    const menu = document.getElementById("navMenu");

    if (!menu) return;

    if (menu.classList.contains("nav-show")) {
      menu.classList.remove("nav-show");
      menu.classList.add("nav-hidden");
    } else {
      menu.classList.remove("nav-hidden");
      menu.classList.add("nav-show");
    }
  };

  /* =========================
     CLOSE MENU WHEN CLICKING OUTSIDE
  ========================== */
  document.addEventListener("click", function (event) {
    const menu = document.getElementById("navMenu");
    const icon = document.querySelector(".menu-icon");

    if (!menu || !icon) return;

    const clickedInsideMenu = menu.contains(event.target);
    const clickedIcon = icon.contains(event.target);

    if (!clickedInsideMenu && !clickedIcon) {
      menu.classList.remove("nav-show");
      menu.classList.add("nav-hidden");
    }
  });

  /* =========================
     LUXURY PAGE FADE IN
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

});
