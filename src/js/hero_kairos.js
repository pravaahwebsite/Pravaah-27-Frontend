/* =========================================================
   PRAVAAH — KAIROS: Worlds Unbound
   Hero Section Controller (Scoped to #splash-screen)
   ========================================================= */

(function initKairosHero() {
  const CONFIG = {
    // Pravaah fest start date
    festDate: '2027-02-20T09:00:00',
  };

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Quick, Energetic Warp-speed Starfield Canvas ---------- */
  (function warp() {
    const canvas = document.getElementById('warp');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const colors = ['#35e8ff', '#ff3d9a', '#ffb53d', '#ffffff', '#ffffff', '#c4b5fd', '#a855f7'];
    let w, h, cx, cy, stars = [], dpr = 1;
    // Energetic, quicker cosmic warp motion
    let speed = reduced ? 1.0 : 8.2;
    let boost = 0;
    let px = 0, py = 0; // parallax target
    let sx = 0, sy = 0;
    let visible = true;

    const COUNT = () => Math.min(680, Math.floor((innerWidth * innerHeight) / 2400));

    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth || innerWidth;
      h = canvas.clientHeight || innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2;
      cy = h / 2;
      stars = Array.from({ length: COUNT() }, () => spawn(true));
    }
    window.resizeHeroWarp = resize;

    function spawn(initial) {
      return {
        x: (Math.random() - 0.5) * w * 2.2,
        y: (Math.random() - 0.5) * h * 2.2,
        z: initial ? Math.random() * w : w,
        pz: 0,
        c: colors[(Math.random() * colors.length) | 0],
      };
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      px = (e.clientX / innerWidth - 0.5) * 1.8;
      py = (e.clientY / innerHeight - 0.5) * 1.8;
    });

    // Hold anywhere on the hero section to jump to hyperdrive warp speed
    const hero = document.getElementById('splash-screen');
    if (hero) {
      const down = (e) => {
        if (e.target.closest('a, button, [role="button"]')) return;
        boost = 30;
      };
      const up = () => { boost = 0; };
      hero.addEventListener('pointerdown', down);
      window.addEventListener('pointerup', up);
      window.addEventListener('pointercancel', up);

      if (window.IntersectionObserver) {
        new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);
      }
    }

    function frame() {
      requestAnimationFrame(frame);
      if (!visible) return;
      const target = (reduced ? 1.0 : 8.2) + boost;
      speed += (target - speed) * 0.08;
      sx += (px * 70 - sx) * 0.08;
      sy += (py * 45 - sy) * 0.08;

      // Dark cosmic motion blur trail
      ctx.fillStyle = `rgba(7, 5, 15, ${boost ? 0.14 : 0.22})`;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        s.pz = s.z;
        s.z -= speed;
        if (s.z < 1) {
          Object.assign(s, spawn(false));
          s.pz = s.z;
          continue;
        }

        // Extended laser tails for quick, vivid cosmic streaks
        const tail = Math.max(3.2, speed * 2.8);
        const pz = Math.min(w * 1.5, s.z + tail);
        const k = 260 / s.z;
        const pk = 260 / pz;
        const x = cx + sx + s.x * k;
        const y = cy + sy + s.y * k;
        const ox = cx + sx + s.x * pk;
        const oy = cy + sy + s.y * pk;

        if (x < -80 || x > w + 80 || y < -80 || y > h + 80) {
          Object.assign(s, spawn(false));
          continue;
        }

        const size = Math.max(1.0, (1 - s.z / w) * 3.6);
        ctx.strokeStyle = s.c;
        ctx.globalAlpha = Math.min(1, (1 - s.z / (w * 1.1)) * 1.8 + 0.35);
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Glowing core head for close stars
        if (s.z < w * 0.38) {
          ctx.fillStyle = s.c;
          ctx.beginPath();
          ctx.arc(x, y, size * 0.85, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    resize();
    ctx.fillStyle = '#07050f';
    ctx.fillRect(0, 0, w, h);
    frame();
  })();

  /* ---------- Hero title: interactive 3D magnetic pull on letters ---------- */
  (function titleParallax() {
    const title = document.getElementById('heroTitle');
    if (!title) return;
    const letters = title.querySelectorAll('.ltr');

    if (finePointer && !reduced && letters.length) {
      title.addEventListener('mousemove', (e) => {
        letters.forEach((l) => {
          const r = l.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const d = Math.hypot(dx, dy);
          const pull = Math.max(0, 1 - d / 320);
          l.style.transform = `translate(${-dx * pull * 0.18}px, ${-dy * pull * 0.28}px) scale(${1 + pull * 0.15})`;
        });
      });
      title.addEventListener('mouseleave', () => {
        letters.forEach((l) => { l.style.transform = ''; });
      });
    }
  })();

  /* ---------- Rotating "Unbound" typewriter words ---------- */
  (function typer() {
    const el = document.getElementById('unbound');
    if (!el || !el.dataset.words) return;
    const words = el.dataset.words.split('|');
    if (reduced) return;
    let i = 0, j = words[0].length, deleting = true;
    setTimeout(function step() {
      const word = words[i];
      if (deleting) { j--; } else { j++; }
      el.textContent = word.slice(0, j);
      let delay = deleting ? 45 : 90;
      if (!deleting && j === word.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && j === 0) {
        deleting = false;
        i = (i + 1) % words.length;
        delay = 300;
      }
      setTimeout(step, delay);
    }, 2800);
  })();

  /* ---------- Real-time Countdown ---------- */
  (function countdown() {
    const target = new Date(CONFIG.festDate).getTime();
    const d = document.getElementById('cd-d');
    const h = document.getElementById('cd-h');
    const m = document.getElementById('cd-m');
    const s = document.getElementById('cd-s');
    if (!d || !h || !m || !s) return;

    const pad = (n) => String(n).padStart(2, '0');
    function update() {
      let t = Math.max(0, target - Date.now());
      const days = Math.floor(t / 864e5); t -= days * 864e5;
      const hrs = Math.floor(t / 36e5); t -= hrs * 36e5;
      const min = Math.floor(t / 6e4); t -= min * 6e4;
      const sec = Math.floor(t / 1000);
      d.textContent = pad(days);
      h.textContent = pad(hrs);
      m.textContent = pad(min);
      s.textContent = pad(sec);
    }
    update();
    setInterval(update, 1000);
  })();

  /* ---------- Click triggers for "Scroll to Next Page", "Step through portal", "Explore Worlds" ---------- */
  (function scrollTriggers() {
    function triggerEnter(e) {
      if (e) e.preventDefault();
      if (window.launchPortalVideo && !window.portalHasEntered) {
        window.launchPortalVideo();
      } else {
        const about = document.getElementById('about-page');
        if (about) {
          about.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }

    const scrollCue = document.getElementById('scroll-to-next-trigger');
    if (scrollCue) {
      scrollCue.addEventListener('click', triggerEnter);
      scrollCue.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          triggerEnter(e);
        }
      });
    }

    const exploreBtn = document.getElementById('explore-worlds-btn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', triggerEnter);
    }

    const portalTrigger = document.getElementById('portal-entry-trigger');
    if (portalTrigger) {
      portalTrigger.addEventListener('click', triggerEnter);
    }
  })();
})();
