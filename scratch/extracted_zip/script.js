/* =========================================================
   PRAVAAH — KAIROS: Worlds Unbound
   Edit CONFIG below to change the fest date.
   ========================================================= */
const CONFIG = {
  // Placeholder date — replace with the real fest start (local time).
  festDate: '2027-02-20T09:00:00',
};

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- Preloader ---------- */
(function loader() {
  const el = $('#loader');
  const pct = $('#loaderPct');
  document.body.classList.add('loading');
  let n = 0;
  const tick = setInterval(() => {
    n = Math.min(100, n + Math.ceil(Math.random() * 9));
    pct.textContent = n;
    if (n >= 100) {
      clearInterval(tick);
      setTimeout(() => {
        el.classList.add('done');
        document.body.classList.remove('loading');
      }, 250);
    }
  }, reduced ? 5 : 45);
})();

/* ---------- Custom cursor ---------- */
if (finePointer) {
  document.body.classList.add('has-cursor');
  const ring = $('#cursor');
  const dot = $('#cursorDot');
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
  });
  (function loop() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    requestAnimationFrame(loop);
  })();
  $$('a, button, .panel').forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('hot'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hot'));
  });
}

/* ---------- Nav, progress, mobile drawer ---------- */
const nav = $('#nav');
const progress = $('#progress');
const burger = $('#burger');
const drawer = $('#drawer');

function onScroll() {
  const y = scrollY;
  nav.classList.toggle('solid', y > 40);
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  scrollSpeedTarget = Math.min(Math.abs(y - lastY) * 0.35, 14);
  lastY = y;
}
let lastY = scrollY;
let scrollSpeedTarget = 0;
addEventListener('scroll', onScroll, { passive: true });

function setDrawer(open) {
  drawer.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.style.overflow = open ? 'hidden' : '';
}
burger.addEventListener('click', () => setDrawer(!drawer.classList.contains('open')));
$$('a', drawer).forEach((a) => a.addEventListener('click', () => setDrawer(false)));
addEventListener('keydown', (e) => { if (e.key === 'Escape') setDrawer(false); });

/* ---------- Warp-speed starfield (hero) ---------- */
(function warp() {
  const canvas = $('#warp');
  const ctx = canvas.getContext('2d');
  const colors = ['#35e8ff', '#ff3d9a', '#ffb53d', '#ffffff', '#ffffff', '#b9a8ff'];
  let w, h, cx, cy, stars = [], dpr = 1;
  let speed = reduced ? 0.4 : 2;
  let boost = 0;
  let px = 0, py = 0; // parallax target
  let sx = 0, sy = 0;
  let visible = true;

  const COUNT = () => Math.min(520, Math.floor((innerWidth * innerHeight) / 3200));

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = w / 2; cy = h / 2;
    stars = Array.from({ length: COUNT() }, () => spawn(true));
  }
  function spawn(initial) {
    return {
      x: (Math.random() - 0.5) * w * 2.2,
      y: (Math.random() - 0.5) * h * 2.2,
      z: initial ? Math.random() * w : w,
      pz: 0,
      c: colors[(Math.random() * colors.length) | 0],
    };
  }

  addEventListener('resize', resize);
  addEventListener('mousemove', (e) => {
    px = (e.clientX / innerWidth - 0.5) * 2;
    py = (e.clientY / innerHeight - 0.5) * 2;
  });
  // Hold anywhere on the hero to jump to hyperspace
  const hero = $('#hero');
  const down = () => { boost = 26; };
  const up = () => { boost = 0; };
  hero.addEventListener('pointerdown', down);
  addEventListener('pointerup', up);
  addEventListener('pointercancel', up);

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);

  function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;
    const target = (reduced ? 0.4 : 2) + scrollSpeedTarget + boost;
    speed += (target - speed) * 0.06;
    sx += (px * 60 - sx) * 0.05;
    sy += (py * 40 - sy) * 0.05;

    ctx.fillStyle = `rgba(7, 5, 15, ${boost ? 0.18 : 0.32})`;
    ctx.fillRect(0, 0, w, h);

    for (const s of stars) {
      s.pz = s.z;
      s.z -= speed;
      if (s.z < 1) { Object.assign(s, spawn(false)); s.pz = s.z; continue; }
      const k = 220 / s.z, pk = 220 / s.pz;
      const x = cx + sx + s.x * k, y = cy + sy + s.y * k;
      const ox = cx + sx + s.x * pk, oy = cy + sy + s.y * pk;
      if (x < -50 || x > w + 50 || y < -50 || y > h + 50) { Object.assign(s, spawn(false)); continue; }
      const size = Math.max(0.4, (1 - s.z / w) * 2.6);
      ctx.strokeStyle = s.c;
      ctx.globalAlpha = Math.min(1, (1 - s.z / w) * 1.4 + 0.1);
      ctx.lineWidth = size;
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
  resize();
  ctx.fillStyle = '#07050f';
  ctx.fillRect(0, 0, w, h);
  frame();
})();

/* ---------- Hero title: letters react to the cursor ---------- */
(function titleParallax() {
  if (!finePointer || reduced) return;
  const letters = $$('.ltr');
  const title = $('#heroTitle');
  title.addEventListener('mousemove', (e) => {
    letters.forEach((l) => {
      const r = l.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy);
      const pull = Math.max(0, 1 - d / 280);
      l.style.transform = `translate(${-dx * pull * 0.12}px, ${-dy * pull * 0.2}px) scale(${1 + pull * 0.12})`;
    });
  });
  title.addEventListener('mouseleave', () => letters.forEach((l) => { l.style.transform = ''; }));
})();

/* ---------- Rotating "Unbound" words ---------- */
(function typer() {
  const el = $('#unbound');
  const words = el.dataset.words.split('|');
  if (reduced) return;
  let i = 0, j = words[0].length, deleting = true;
  setTimeout(function step() {
    const word = words[i];
    if (deleting) { j--; } else { j++; }
    el.textContent = word.slice(0, j);
    let delay = deleting ? 45 : 90;
    if (!deleting && j === word.length) { deleting = true; delay = 1800; }
    else if (deleting && j === 0) { deleting = false; i = (i + 1) % words.length; delay = 300; }
    setTimeout(step, delay);
  }, 4200);
})();

/* ---------- Countdown ---------- */
(function countdown() {
  const target = new Date(CONFIG.festDate).getTime();
  const d = $('#cd-d'), h = $('#cd-h'), m = $('#cd-m'), s = $('#cd-s');
  const pad = (n) => String(n).padStart(2, '0');
  function update() {
    let t = Math.max(0, target - Date.now());
    const days = Math.floor(t / 864e5); t -= days * 864e5;
    const hrs = Math.floor(t / 36e5); t -= hrs * 36e5;
    const min = Math.floor(t / 6e4); t -= min * 6e4;
    d.textContent = pad(days); h.textContent = pad(hrs); m.textContent = pad(min); s.textContent = pad(Math.floor(t / 1000));
  }
  update();
  setInterval(update, 1000);
})();

/* ---------- Scroll reveal ---------- */
(function reveal() {
  const items = $$('.reveal');
  items.forEach((el, i) => { el.style.setProperty('--d', `${(i % 4) * 0.08}s`); });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  items.forEach((el) => io.observe(el));
})();

/* ---------- Kairos rings tied to scroll ---------- */
(function rings() {
  if (reduced) return;
  const svg = $('#ringsSvg');
  if (!svg) return;
  const wrap = svg.parentElement;
  addEventListener('scroll', () => {
    const r = wrap.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const p = (innerHeight - r.top) / (innerHeight + r.height);
    svg.style.transform = `rotate(${p * 40 - 20}deg) scale(${0.9 + Math.sin(p * Math.PI) * 0.12})`;
  }, { passive: true });
})();

/* ---------- World panels (hover / focus / tap) ---------- */
(function panels() {
  const list = $$('.panel');
  const open = (p) => list.forEach((x) => x.classList.toggle('active', x === p));
  list.forEach((p) => {
    p.addEventListener('mouseenter', () => { if (finePointer) open(p); });
    p.addEventListener('focus', () => open(p));
    p.addEventListener('click', () => open(p));
  });
})();

/* Code rain flicker for the Tech world */
(function codeRain() {
  const el = $('#codeRain');
  if (!el) return;
  const chars = '01<>{}/=+*#$%';
  function make() {
    let out = '';
    for (let r = 0; r < 7; r++) {
      let line = '';
      for (let c = 0; c < 14; c++) line += chars[(Math.random() * chars.length) | 0];
      out += line + '\n';
    }
    el.textContent = out;
  }
  make();
  if (!reduced) setInterval(make, 380);
})();

/* ---------- Stat counters ---------- */
(function counters() {
  const els = $$('[data-count]');
  const fmt = (n) => n.toLocaleString('en-IN');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target;
      const end = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      if (reduced) { el.textContent = fmt(end) + suffix; return; }
      const dur = 1800, t0 = performance.now();
      (function step(t) {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt(Math.round(end * eased)) + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });
  }, { threshold: 0.6 });
  els.forEach((el) => io.observe(el));
})();

/* ---------- 3D tilt cards with moving glow ---------- */
(function tilt() {
  if (!finePointer || reduced) return;
  $$('.tilt').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.transform = `rotateY(${(x - 0.5) * 14}deg) rotateX(${(0.5 - y) * 14}deg)`;
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

/* ---------- Magnetic buttons ---------- */
(function magnetic() {
  if (!finePointer || reduced) return;
  $$('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      btn.style.transform = `translate(${dx * 0.22}px, ${dy * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();

onScroll();
