const container = document.querySelector(".site-header");

function getCurrentPage() {
  let page = window.location.pathname.split("/").pop();
  if (!page || page === "/") page = "index.html";
  return page;
}

if (container) {

  const currentPage = getCurrentPage();

  container.innerHTML = `
    <header style="
      background: #0b0b0b;
      border-bottom: 1px solid #1c1c1c;
      font-family: Arial, sans-serif;
      position: sticky;
      top: 0;
      z-index: 1000;
    ">

      <!-- LOGO -->
      <div style="
        display:flex;
        justify-content:center;
        padding:18px 0 10px 0;
      ">
        <img 
          src="9468D5BC-D608-461F-8FD0-D934C8A0A490.png"
          style="
            height:55px;
            object-fit:contain;
          "
        >
      </div>

      <!-- NAV -->
      <nav style="
        display:flex;
        justify-content:center;
        gap:28px;
        padding:12px 10px 18px 10px;
        flex-wrap:wrap;
      ">

        ${navLink("index.html", "Home", currentPage)}
        ${navLink("plans.html", "Plans", currentPage)}
        ${navLink("dashboard.html", "Dashboard", currentPage)}
        ${navLink("account.html", "Account", currentPage)}
        ${navLink("login.html", "Login", currentPage, true)}

      </nav>

    </header>
  `;
}

function navLink(href, label, currentPage, isAccent = false) {

  const isActive = currentPage === href;

  return `
    <a href="${href}" style="
      text-decoration:none;
      font-size:14px;
      padding:6px 10px;
      border-radius:6px;
      transition:0.2s;

      color: ${
        isActive 
          ? "#b08d2a" 
          : isAccent 
            ? "#b08d2a" 
            : "#ffffff"
      };

      background: ${
        isActive 
          ? "rgba(176,141,42,0.12)" 
          : "transparent"
      };

      border-bottom: ${
        isActive 
          ? "2px solid #b08d2a"
          : "2px solid transparent"
      };

      opacity:${isActive ? "1" : "0.75"};
    "
    onmouseover="this.style.opacity='1'"
    onmouseout="this.style.opacity='${isActive ? '1' : '0.75'}'"
    >
      ${label}
    </a>
  `;
}