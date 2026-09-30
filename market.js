/* =========================================================
   CROWN CAPITAL — HOMEPAGE LIVE ENGINE
   Edit the SETTINGS block to rebrand or retune.
========================================================= */
const SETTINGS = {
  portfolio: {
    value: 125000,        // what the card shows right now
    openedAt: 123480,     // value at today's open (sets today's change)
    tickMs: 1500,         // how often it moves
    drift: 0.00004,       // slight upward pull per tick
    volatility: 0.00032,  // size of each random move
    points: 60            // points on the chart
  },
  ticker: [
    { sym: "S&P 500", px: 5781.3, dp: 2, vol: 0.00015 },
    { sym: "NASDAQ", px: 18422.7, dp: 2, vol: 0.0002 },
    { sym: "DOW JONES", px: 42313.0, dp: 2, vol: 0.00012 },
    { sym: "FTSE 100", px: 8284.9, dp: 2, vol: 0.00012 },
    { sym: "GOLD", px: 2641.8, dp: 2, vol: 0.00015 },
    { sym: "CRUDE OIL", px: 74.21, dp: 2, vol: 0.0003 },
    { sym: "EUR/USD", px: 1.0845, dp: 4, vol: 0.0001 },
    { sym: "GBP/USD", px: 1.3012, dp: 4, vol: 0.0001 },
    { sym: "US 10Y", px: 4.126, dp: 3, vol: 0.0004 }
  ]
};

const money = (v, dp = 2) =>
  v.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });

// Normal-ish random number (smoother than Math.random alone)
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

/* =========================
   PORTFOLIO CARD
========================= */
(function portfolio() {
  const P = SETTINGS.portfolio;
  const el = {
    price: document.getElementById("priceValue"),
    change: document.getElementById("dayChange"),
    growth: document.getElementById("growth"),
    profit: document.getElementById("profit"),
    loss: document.getElementById("loss"),
    line: document.getElementById("chartLine"),
    area: document.getElementById("chartArea")
  };
  if (!el.price) return;

  // Build a believable history that ends at the current value
  const history = [];
  let v = P.openedAt;
  for (let i = 0; i < P.points - 1; i++) {
    const pull = (P.value - v) / (P.points - i);
    v += pull + v * P.volatility * gauss() * 3.2;
    history.push(v);
  }
  history.push(P.value);
  let value = P.value;

  function render() {
    const diff = value - P.openedAt;
    const pct = (diff / P.openedAt) * 100;
    const up = diff >= 0;
    const sign = up ? "+" : "-";

    el.price.textContent = money(value);

    el.change.textContent = `${sign}$${money(Math.abs(diff))} (${sign}${Math.abs(pct).toFixed(2)}%) today`;
    el.change.className = "market-sub num " + (up ? "up" : "down");

    el.growth.textContent = `${sign}${Math.abs(pct).toFixed(2)}%`;
    el.growth.className = up ? "up" : "down";

    el.profit.textContent = up ? `+$${money(diff)}` : "$0.00";
    el.profit.className = up ? "up" : "muted";

    el.loss.textContent = up ? "$0.00" : `-$${money(Math.abs(diff))}`;
    el.loss.className = up ? "muted" : "down";

    // Chart
    const min = Math.min(...history);
    const max = Math.max(...history);
    const span = max - min || 1;
    const pts = history.map((p, i) => {
      const x = (i / (history.length - 1)) * 300;
      const y = 8 + (1 - (p - min) / span) * 84;
      return [x.toFixed(1), y.toFixed(1)];
    });
    el.line.setAttribute("points", pts.map(p => p.join(",")).join(" "));
    el.area.setAttribute("d", `M0,100 L${pts.map(p => p.join(",")).join(" L")} L300,100 Z`);
  }

  function tick() {
    value += value * (P.drift + P.volatility * gauss());
    history.push(value);
    if (history.length > P.points) history.shift();
    render();
  }

  render();
  setInterval(tick, P.tickMs);
})();

/* =========================
   PRICE TICKER
========================= */
(function ticker() {
  const track = document.getElementById("tickerTrack");
  if (!track) return;

  const items = SETTINGS.ticker.map(t => ({ ...t, open: t.px }));

  const itemHTML = (t, i) => `
    <span class="ticker__item">
      <span class="ticker__sym">${t.sym}</span>
      <span class="ticker__px num" data-i="${i}">${money(t.px, t.dp)}</span>
      <span class="ticker__chg num" data-c="${i}"></span>
    </span>`;

  // Two copies back to back so the scroll loops seamlessly
  const once = items.map(itemHTML).join("");
  track.innerHTML = once + once;

  const pxEls = track.querySelectorAll(".ticker__px");
  const chgEls = track.querySelectorAll(".ticker__chg");

  function paint(i, dir) {
    const t = items[i];
    const pct = ((t.px - t.open) / t.open) * 100 + t.base;
    pxEls.forEach(e => {
      if (+e.dataset.i !== i) return;
      e.textContent = money(t.px, t.dp);
      if (dir) {
        e.classList.remove("flash-up", "flash-down");
        e.classList.add(dir > 0 ? "flash-up" : "flash-down");
        setTimeout(() => e.classList.remove("flash-up", "flash-down"), 700);
      }
    });
    chgEls.forEach(e => {
      if (+e.dataset.c !== i) return;
      e.textContent = (pct >= 0 ? "+" : "") + pct.toFixed(2) + "%";
      e.className = "ticker__chg num " + (pct >= 0 ? "up" : "down");
    });
  }

  // Give each asset a starting day change so it isn't all 0.00%
  items.forEach((t, i) => { t.base = gauss() * 0.6; paint(i); });

  setInterval(() => {
    const i = Math.floor(Math.random() * items.length);
    const t = items[i];
    const move = t.px * t.vol * gauss();
    t.px += move;
    paint(i, Math.sign(move));
  }, 2200);
})();

/* =========================
   STAT COUNTERS + SPARKLINES
========================= */
(function stats() {
  const stats = document.querySelectorAll("[data-count]");
  if (!stats.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const format = (el, n) => {
    const d = +(el.dataset.decimals || 0);
    return (el.dataset.prefix || "") + money(n, d) + (el.dataset.suffix || "");
  };

  const run = el => {
    const target = +el.dataset.count;
    if (reduce) { el.textContent = format(el, target); return; }
    const start = performance.now();
    const dur = 1600;
    const step = now => {
      const k = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = format(el, target * eased);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  stats.forEach(el => (el.textContent = format(el, 0)));

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  stats.forEach(el => io.observe(el));

  // Rising sparklines under each stat
  document.querySelectorAll(".spark").forEach((svg, n) => {
    let y = 34;
    const pts = [];
    for (let i = 0; i <= 24; i++) {
      y -= 1 + gauss() * 2.4;
      y = Math.max(4, Math.min(38, y));
      pts.push(`${(i / 24) * 200},${y.toFixed(1)}`);
    }
    const id = "sg" + n;
    svg.innerHTML = `
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#D4AF37" stop-opacity="0.28"/>
        <stop offset="1" stop-color="#D4AF37" stop-opacity="0"/>
      </linearGradient></defs>
      <path d="M0,42 L${pts.join(" L")} L200,42 Z" fill="url(#${id})"/>
      <polyline points="${pts.join(" ")}" fill="none" stroke="#D4AF37" stroke-width="1.6"
        stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>`;
  });
})();
