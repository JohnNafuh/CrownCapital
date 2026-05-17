document.addEventListener("DOMContentLoaded", function () {

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

});
