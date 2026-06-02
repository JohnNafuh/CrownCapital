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
      font-family: Arial, sans-serif;
      background: linear-gradient(180deg, #121212 0%, #0b0b0b 100%);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      position: sticky;
      top: 0;
      z-index: 1000;
    ">

      <!-- LOGO (BIGGER + MORE PREMIUM PRESENCE) -->
      <div style="
        display:flex;
        justify-content:center;
        padding:22px 0 10px 0;
      ">
        <img 
          src="9468D5BC-D608-461F-8FD0-D934C8A0A490.png"
          style="
            height:72px;
            max-width:240px;
            object-fit:contain;
            filter: drop-shadow(0 2px 10px rgba(176,141,42,0.15));
          "
        >
      </div>

      <!-- NAV -->
      <nav style="
        display:flex;
        justify-content:center;
        gap:30px;
        padding:12px 10px 18px 10px;
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

function nav(href,label,current,isAccent=false){

  const active = current === href;

  return `
    <a href="${href}" style="
      text-decoration:none;
      font-size:14px;
      letter-spacing:0.3px;
      padding:8px 12px;
      border-radius:10px;
      transition:0.2s ease;

      color:${
        active ? "#ffffff" : isAccent ? "#b08d2a" : "rgba(255,255,255,0.6)"
      };

      background:${
        active ? "rgba(255,255,255,0.07)" : "transparent"
      };

      border:1px solid ${
        active ? "rgba(255,255,255,0.12)" : "transparent"
      };
    "
    onmouseover="this.style.color='#ffffff'"
    onmouseout="this.style.color='${active ? "#ffffff" : isAccent ? "#b08d2a" : "rgba(255,255,255,0.6)"}'"
    >
      ${label}
    </a>
  `;
}