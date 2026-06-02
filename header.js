const container = document.querySelector(".site-header");

function getPage() {
  let page = window.location.pathname.split("/").pop();
  if (!page || page === "/") page = "index.html";
  return page;
}

if (container) {

  const current = getPage();

  container.innerHTML = `
    <header style="
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      background: rgba(255,255,255,0.85);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid rgba(0,0,0,0.06);
      position: sticky;
      top: 0;
      z-index: 1000;
    ">

      <!-- LOGO -->
      <div style="
        display:flex;
        justify-content:center;
        padding:20px 0 8px 0;
      ">
        <img 
          src="9468D5BC-D608-461F-8FD0-D934C8A0A490.png"
          style="
            height:64px;
            object-fit:contain;
          "
        >
      </div>

      <!-- NAV -->
      <nav style="
        display:flex;
        justify-content:center;
        gap:26px;
        padding:10px 10px 16px 10px;
        flex-wrap:wrap;
      ">

        ${nav("index.html","Home",current)}
        ${nav("plans.html","Plans",current)}
        ${nav("dashboard.html","Dashboard",current)}
        ${nav("account.html","Account",current)}
        ${nav("login.html","Login",current,true)}

      </nav>

    </header>
  `;
}

function nav(href, label, current, accent = false) {

  const active = current === href;

  return `
    <a href="${href}" style="
      text-decoration:none;
      font-size:14px;
      font-weight:500;
      letter-spacing:0.2px;
      padding:6px 10px;
      border-radius:8px;
      transition:0.2s ease;

      color:${
        active ? "#111" : accent ? "#007aff" : "rgba(0,0,0,0.55)"
      };

      background:${
        active ? "rgba(0,0,0,0.05)" : "transparent"
      };
    "
    onmouseover="this.style.color='#111'"
    onmouseout="this.style.color='${active ? "#111" : accent ? "#007aff" : "rgba(0,0,0,0.55)"}'"
    >
      ${label}
    </a>
  `;
}