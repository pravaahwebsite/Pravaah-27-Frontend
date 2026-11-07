/* PRAVAAH | Kairos: Worlds Unbound
   Scroll = travel through time. Amber -> cyan -> violet tunnel, a working 3D clock beside the calendar,
   and a draggable carousel ring of photo cards around a wireframe globe for the highlights. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;


  // Photos are loaded from your current site. Copy them into your project and change BASE to e.g. 'img/'.
  var BASE = 'https://pravaahweb1.vercel.app/';
  var PHOTOS = [
    ['StarNight_gallery.jpg', 'Star Night'],
    ['fashionshow_gallery.jpg', 'Fashion Show'],
    ['StreetDanceBattle_gallery.jpg', 'Street Dance Battle'],
    ['Classical_Inaugural.jpg', 'Classical Inaugural'],
    ['Tamasha_gallery.jpg', 'Tamasha'],
    ['shirtpaint.png', 'Shirt Painting'],
    ['informal night.JPG', 'Informal Night'],
    ['RoboRace.jpg', 'Robo Race'],
    ['robo soccor.JPG', 'Robo Soccer'],
    ['RoboWars_gallery.jpg', 'Robo Wars'],
    ['ISRO Exhibition.JPG', 'ISRO Exhibition'],
    ['Trekkon_events.JPG', 'Trekkon'],
    ['Innovation Expo_gallery.JPG', 'Innovation Expo'],
    ['Guest Talk.JPG', 'Guest Talk'],
    ['Marcatus.JPG', 'Marcatus']
  ];
  var openPhoto = function () {};
  var dateHandDeg = 0;   // angle (deg, clockwise from 12 o'clock) the clock's long hand points at; set by the calendar ring

  initNav();
  initCalendar();
  initHighlights();
  initScene();

  /* =========================================================
     Nav, title tilt, timeline rail
     ========================================================= */
  var globeScreenPos = null; // set by initScene: where the photo globe sits on screen right now

  function initNav() {
    var nav = document.getElementById('nav');
    var toggle = nav.querySelector('.nav-toggle');
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('#nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Title tilts and its 3D extrusion shifts with the pointer
    var title = document.getElementById('title');
    if (!reduceMotion && finePointer) {
      window.addEventListener('pointermove', function (e) {
        var nx = e.clientX / window.innerWidth * 2 - 1;
        var ny = e.clientY / window.innerHeight * 2 - 1;
        title.style.setProperty('--ry', (nx * 9).toFixed(2) + 'deg');
        title.style.setProperty('--rx', (-ny * 6).toFixed(2) + 'deg');
        title.style.setProperty('--dx', (-nx * 3.5).toFixed(2));
        title.style.setProperty('--dy', (3 - ny * 2.5).toFixed(2));
      });
    }

    // Rail: highlight the section nearest the middle of the screen
    var sections = ['home', 'calendar', 'highlights'].map(function (id) { return document.getElementById(id); });
    var links = Array.prototype.slice.call(document.querySelectorAll('.rail a'));
    function markActive() {
      var mid = window.innerHeight / 2, best = 0, bestDist = Infinity;
      sections.forEach(function (s, i) {
        var r = s.getBoundingClientRect();
        var d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      links.forEach(function (l, i) { l.classList.toggle('active', i === best); });
    }
    window.addEventListener('scroll', markActive, { passive: true });
    markActive();
  }

  /* =========================================================
     Fest calendar
     ========================================================= */
  function initCalendar() {
    // EDIT THIS: year, months, and event dates (key format YYYY-MM-DD).
    // A value is either just the event name, or { name, time, venue, about } (all but name optional).
    var CAL_YEAR = 2026;
    var MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];
    var FULL = ['January', 'February', 'March', 'April', 'May', 'June'];
    var EVENTS = {
      '2026-01-15': 'Event name goes here',
      '2026-01-26': 'Event name goes here'
    };

    var tabs = document.getElementById('tabs');
    var tabGlow = document.getElementById('tab-glow');
    var cal = document.getElementById('cal');
    var dial = document.getElementById('dial');
    var daysEl = document.getElementById('days');
    var hud = document.getElementById('hud');
    var hudTag = document.getElementById('hud-tag');
    var hudDate = document.getElementById('hud-date');
    var hudName = document.getElementById('hud-name');
    var hudMeta = document.getElementById('hud-meta');

    /* Two angles drive everything (degrees, clockwise from 12 o'clock):
       rot  = how far the ring of dates has been spun
       hand = where the clock's long hand points (the sun never moves)
       The selected date is whichever node the hand is pointing at. */
    var monthIdx = 0, count = 31, step = 360 / 31;
    var rot = 0, rotTarget = null, hand = 0, handTarget = null;
    var nodes = [], lastSel = 0, hasEvents = false, preview = null, raf = 0;
    var down = false, dragging = false, moved = false, startX = 0, startY = 0, lastA = 0;

    function pad(n) { return n < 10 ? '0' + n : String(n); }
    function info(d) {
      var v = EVENTS[CAL_YEAR + '-' + pad(monthIdx + 1) + '-' + pad(d)];
      return v ? (typeof v === 'string' ? { name: v } : v) : null;
    }
    function dayAt(angle) {      // which date sits at this angle of the ring
      var i = Math.round((angle - rot) / step);
      return ((i % count) + count) % count + 1;
    }
    function nodeAngle(d) { return (d - 1) * step + rot; }
    function nearest(t, ref) { return t + Math.round((ref - t) / 360) * 360; }   // same angle, closest turn to ref

    function showHud(d, animate) {
      var ev = info(d);
      hud.classList.toggle('event', !!ev);
      hudTag.textContent = ev ? 'Target locked' : 'Scanning';
      hudDate.textContent = d + ' ' + MONTHS[monthIdx] + ' ' + CAL_YEAR;
      if (ev) {
        hudName.textContent = ev.name;
        hudMeta.textContent = [ev.time, ev.venue].filter(Boolean).join('  \u00B7  ') || ev.about || 'Details coming soon';
      } else {
        hudName.textContent = hasEvents ? 'No event on this date' : 'No events announced for this month yet.';
        hudMeta.textContent = hasEvents ? 'Spin the ring to find the glowing dates.' : '';
      }
      if (animate && !reduceMotion) {
        hud.classList.remove('swap');
        void hud.offsetWidth; // restart the fade-in
        hud.classList.add('swap');
      }
    }

    // lay the dates out on the ring, aim the 3D hand, and update the selection
    function place() {
      for (var i = 0; i < nodes.length; i++) {
        var th = nodeAngle(nodes[i].d) * Math.PI / 180;
        nodes[i].el.style.left = (50 + 41 * Math.sin(th)).toFixed(2) + '%';
        nodes[i].el.style.top = (50 - 41 * Math.cos(th)).toFixed(2) + '%';
      }
      dateHandDeg = hand;
      var sel = dayAt(hand);
      if (sel !== lastSel) {
        if (lastSel && nodes[lastSel - 1]) nodes[lastSel - 1].el.classList.remove('on');
        nodes[sel - 1].el.classList.add('on');
        lastSel = sel;
        if (preview === null) showHud(sel, false);
      }
    }

    function run() {
      if (reduceMotion) {
        if (rotTarget !== null) { rot = rotTarget; rotTarget = null; }
        if (handTarget !== null) { hand = handTarget; handTarget = null; }
        place();
        if (preview === null) showHud(dayAt(hand), false);
        return;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function tick() {
      raf = 0;
      if (dragging) return;
      var busy = false;
      if (rotTarget !== null) {
        rot += (rotTarget - rot) * 0.16;
        if (Math.abs(rotTarget - rot) < 0.04) { rot = rotTarget; rotTarget = null; } else busy = true;
      }
      if (handTarget !== null) {
        hand += (handTarget - hand) * 0.14;
        if (Math.abs(handTarget - hand) < 0.04) { hand = handTarget; handTarget = null; } else busy = true;
      }
      place();
      if (busy) raf = requestAnimationFrame(tick);
      else if (preview === null) showHud(dayAt(hand), true);
    }

    // aim the hand at a date (the ring stays where it is)
    function selectDay(d) {
      rotTarget = null;
      handTarget = nearest(nodeAngle(d), hand);
      run();
    }
    function stepBy(n) {
      var cur = dayAt(handTarget !== null ? handTarget : hand);
      selectDay(((cur - 1 + n) % count + count) % count + 1);
    }

    // Drag the ring by angle around its centre; the hand stays put, so dates sweep under it
    function angleAt(e) {
      var r = dial.getBoundingClientRect();
      return Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180 / Math.PI;
    }
    dial.addEventListener('pointerdown', function (e) {
      if (e.button > 0) return;
      down = true; moved = false; startX = e.clientX; startY = e.clientY; lastA = angleAt(e);
      rotTarget = null; handTarget = null;
    });
    dial.addEventListener('pointermove', function (e) {
      if (!down) return;
      if (!moved) {
        if (Math.hypot(e.clientX - startX, e.clientY - startY) < 6) return;
        moved = true; dragging = true;
        dial.classList.add('drag');
        dial.setPointerCapture(e.pointerId);
        lastA = angleAt(e);
      }
      var a = angleAt(e), da = a - lastA;
      if (da > 180) da -= 360;
      if (da < -180) da += 360;
      rot += da; lastA = a;
      place();
    });
    function endDrag() {
      if (!down) return;
      down = false;
      if (dragging) {
        dragging = false;
        dial.classList.remove('drag');
        var sel = dayAt(hand);                       // lock onto the date under the hand
        rotTarget = nearest(hand - (sel - 1) * step, rot);
        run();
      }
    }
    dial.addEventListener('pointerup', endDrag);
    dial.addEventListener('pointercancel', endDrag);
    dial.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); stepBy(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); stepBy(1); }
    });
    document.getElementById('cal-prev').addEventListener('click', function () { stepBy(-1); });
    document.getElementById('cal-next').addEventListener('click', function () { stepBy(1); });

    function moveGlow() {
      var sel = tabs.querySelector('.tab[aria-selected="true"]');
      if (!sel) return;
      tabGlow.style.width = sel.offsetWidth + 'px';
      tabGlow.style.transform = 'translateX(' + sel.offsetLeft + 'px)';
    }

    function render(mi, animate) {
      monthIdx = mi;
      count = new Date(CAL_YEAR, mi + 1, 0).getDate();
      step = 360 / count;
      Array.prototype.forEach.call(tabs.querySelectorAll('.tab'), function (b) {
        b.setAttribute('aria-selected', String(b.dataset.m === String(mi)));
      });
      moveGlow();

      daysEl.innerHTML = '';
      nodes = [];
      lastSel = 0;
      preview = null;
      var firstEvent = 0;
      for (var d = 1; d <= count; d++) {
        var ev = info(d);
        var el = document.createElement('button');
        el.type = 'button';
        el.className = 'node' + (ev ? ' event' : '');
        el.setAttribute('aria-label', d + ' ' + FULL[mi] + (ev ? ': ' + ev.name : ''));
        if (!ev) el.tabIndex = -1;
        else if (!firstEvent) firstEvent = d;
        var sp = document.createElement('span');
        sp.style.setProperty('--i', String(d));
        sp.textContent = d;
        el.appendChild(sp);
        (function (day, isEvent) {
          if (isEvent) {
            el.addEventListener('mouseenter', function () { preview = day; showHud(day, true); });
            el.addEventListener('focus', function () { preview = day; showHud(day, true); });
            var leave = function () { preview = null; showHud(dayAt(hand), true); };
            el.addEventListener('mouseleave', leave);
            el.addEventListener('blur', leave);
          }
          el.addEventListener('click', function () { if (!moved) { preview = null; selectDay(day); } });
        })(d, !!ev);
        daysEl.appendChild(el);
        nodes.push({ d: d, el: el });
      }
      hasEvents = firstEvent > 0;

      rot = 0; rotTarget = null; hand = 0; handTarget = null;
      place();
      if (firstEvent > 1) selectDay(firstEvent);   // the hand sweeps round to the first event of the month

      if (animate && !reduceMotion) {
        cal.classList.remove('flip');
        void cal.offsetWidth; // restart the flip animation
        cal.classList.add('flip');
      }
    }

    MONTHS.forEach(function (m, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'tab';
      b.setAttribute('role', 'tab');
      b.dataset.m = String(i);
      b.textContent = m;
      b.addEventListener('click', function () { render(i, true); });
      tabs.appendChild(b);
    });
    window.addEventListener('resize', moveGlow);
    window.addEventListener('load', moveGlow);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveGlow);
    render(0, false);
  }

  /* =========================================================
     Highlights: 3D photo ring (CSS 3D, drag / swipe / scroll / arrows)
     ========================================================= */
  function initHighlights() {
    // Heading flies out of the photo globe and opens from its centre each time the section scrolls into view
    (function () {
      var h = document.getElementById('hl-heading');
      if (!h) return;
      function play() {
        var hr = h.getBoundingClientRect();
        var p = globeScreenPos ? globeScreenPos() : null;
        var ox = p ? p.x - (hr.left + hr.width / 2) : 0;
        var oy = p ? p.y - (hr.top + hr.height / 2) : 0;
        h.style.setProperty('--ox', ox.toFixed(1) + 'px');
        h.style.setProperty('--oy', oy.toFixed(1) + 'px');
        h.classList.remove('open'); void h.offsetWidth; h.classList.add('open');
      }
      if (!('IntersectionObserver' in window)) { h.classList.add('open'); return; }
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) play(); else h.classList.remove('open');
        });
      }, { threshold: 0.35 }).observe(document.getElementById('highlights'));
    })();
    var stage = document.getElementById('stage');
    var lb = document.getElementById('lightbox');
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('figcaption');

    openPhoto = function (i) {
      lbImg.src = BASE + encodeURIComponent(PHOTOS[i][0]);
      lbImg.alt = PHOTOS[i][1];
      lbCap.textContent = PHOTOS[i][1];
      lb.hidden = false;
    };
    function close() { lb.hidden = true; lbImg.removeAttribute('src'); }
    lb.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lb.hidden) close(); });

    // Without Three.js, show a plain photo grid instead of the 3D orbit
    if (!window.THREE) {
      stage.classList.add('fallback');
      PHOTOS.forEach(function (p, i) {
        var img = document.createElement('img');
        img.src = BASE + encodeURIComponent(p[0]);
        img.alt = p[1];
        img.loading = 'lazy';
        img.addEventListener('click', function () { openPhoto(i); });
        stage.appendChild(img);
      });
    }
  }

  /* =========================================================
     3D scene: time tunnel + working clock
     ========================================================= */
  function initScene() {
    if (!window.THREE) return;

    var canvas = document.getElementById('scene');
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, powerPreference: 'high-performance' });
    } catch (err) { return; }

    var mobile = window.innerWidth < 800;
    var TOTAL = 300;
    var TAU = Math.PI * 2;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
    renderer.setClearColor(0x05030f, 1);

    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05030f, 0.010);
    var camera = new THREE.PerspectiveCamera(60, 1, 0.1, 900);

    var STOPS = [new THREE.Color('#ffb347'), new THREE.Color('#22d3ee'), new THREE.Color('#b57bff')];
    function colorAt(t) {
      t = Math.min(Math.max(t, 0), 1) * 2;
      var i = Math.min(Math.floor(t), 1);
      return STOPS[i].clone().lerp(STOPS[i + 1], t - i);
    }
    function makeSpriteTexture() {
      var c = document.createElement('canvas');
      c.width = c.height = 64;
      var g = c.getContext('2d');
      var gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      gr.addColorStop(0, 'rgba(255,255,255,1)');
      gr.addColorStop(0.4, 'rgba(255,255,255,0.35)');
      gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gr;
      g.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    }
    var dotTex = makeSpriteTexture();
    function glowSprite(color, size, opacity) {
      var s = new THREE.Sprite(new THREE.SpriteMaterial({
        map: dotTex, color: color, transparent: true, opacity: opacity,
        blending: THREE.AdditiveBlending, depthWrite: false
      }));
      s.scale.set(size, size, 1);
      return s;
    }

    /* ---------- tunnel ---------- */
    var tunnel = new THREE.Group();
    scene.add(tunnel);
    var RINGS = 74, GAP = 4.5, rings = [];
    for (var i = 0; i < RINGS; i++) {
      var hex = i % 3 === 0;
      var ring = new THREE.Mesh(
        new THREE.TorusGeometry(10 + (i % 2) * 1.2, hex ? 0.07 : 0.04, hex ? 6 : 8, hex ? 6 : 72),
        new THREE.MeshBasicMaterial({
          color: colorAt(i * GAP / TOTAL), transparent: true, opacity: hex ? 0.9 : 0.5,
          blending: THREE.AdditiveBlending, depthWrite: false
        })
      );
      ring.position.z = -i * GAP;
      ring.rotation.z = i * 0.21;
      ring.userData.hex = hex;
      ring.userData.dir = i % 2 ? 1 : -1;
      tunnel.add(ring);
      rings.push(ring);
    }
    for (var k = 0; k < 8; k++) {
      var a = k / 8 * TAU, x = Math.cos(a) * 10.6, y = Math.sin(a) * 10.6;
      var lg = new THREE.BufferGeometry();
      lg.setAttribute('position', new THREE.Float32BufferAttribute([x, y, 20, x, y, -340], 3));
      var c0 = colorAt(0), c1 = colorAt(1);
      lg.setAttribute('color', new THREE.Float32BufferAttribute([c0.r, c0.g, c0.b, c1.r, c1.g, c1.b], 3));
      tunnel.add(new THREE.Line(lg, new THREE.LineBasicMaterial({
        vertexColors: true, transparent: true, opacity: 0.28,
        blending: THREE.AdditiveBlending, depthWrite: false
      })));
    }

    /* ---------- particles ---------- */
    var N = mobile ? 1400 : 3200;
    var pPos = new Float32Array(N * 3), pCol = new Float32Array(N * 3);
    var white = new THREE.Color(1, 1, 1);
    for (var n = 0; n < N; n++) {
      var ang = Math.random() * TAU;
      var rad = 2.5 + Math.pow(Math.random(), 0.6) * 48;
      var zz = 20 - Math.random() * (TOTAL + 120);
      pPos[n * 3] = Math.cos(ang) * rad;
      pPos[n * 3 + 1] = Math.sin(ang) * rad;
      pPos[n * 3 + 2] = zz;
      var col = colorAt(-zz / TOTAL).lerp(white, Math.random() * 0.5);
      pCol[n * 3] = col.r; pCol[n * 3 + 1] = col.g; pCol[n * 3 + 2] = col.b;
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
      size: 0.55, map: dotTex, vertexColors: true, transparent: true,
      depthWrite: false, blending: THREE.AdditiveBlending
    })));

    var BG = mobile ? 700 : 1500, bgPos = new Float32Array(BG * 3);
    for (var b = 0; b < BG; b++) {
      var u = Math.random() * 2 - 1, th = Math.random() * TAU, rr = Math.sqrt(1 - u * u);
      bgPos[b * 3] = Math.cos(th) * rr * 400;
      bgPos[b * 3 + 1] = u * 400;
      bgPos[b * 3 + 2] = Math.sin(th) * rr * 400;
    }
    var bgGeo = new THREE.BufferGeometry();
    bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
    var bgStars = new THREE.Points(bgGeo, new THREE.PointsMaterial({
      size: 1.6, map: dotTex, color: 0xbfc8ff, transparent: true, opacity: 0.8,
      sizeAttenuation: false, fog: false, depthWrite: false
    }));
    scene.add(bgStars);

    var vanish = glowSprite(0x7a5cff, 110, 0.4);
    vanish.position.z = -TOTAL - 60;
    scene.add(vanish);

    /* ---------- highlights: photo cubes orbiting a wireframe globe ---------- */
    var D = 34;
    var stageEl = document.getElementById('stage');
    var orbit = new THREE.Group();
    var spin = new THREE.Group();
    globeScreenPos = function () {
      var v = new THREE.Vector3();
      orbit.getWorldPosition(v);
      v.project(camera);
      return { x: (v.x * 0.5 + 0.5) * window.innerWidth, y: (-v.y * 0.5 + 0.5) * window.innerHeight };
    };
    orbit.add(spin);
    scene.add(orbit);

    var globeWire = new THREE.Mesh(new THREE.IcosahedronGeometry(5.5, 1),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.6 }));
    var globeCore = new THREE.Mesh(new THREE.IcosahedronGeometry(3, 0),
      new THREE.MeshBasicMaterial({ color: 0x0e7490, transparent: true, opacity: 0.35 }));
    var globeEdges = new THREE.LineSegments(new THREE.EdgesGeometry(globeCore.geometry),
      new THREE.LineBasicMaterial({ color: 0xcffafe }));
    spin.add(globeWire, globeCore, globeEdges, glowSprite(0x22d3ee, 32, 0.45));

    // Small wireframe cubes drifting close to the globe
    var debris = [];
    for (var q = 0; q < 14; q++) {
      var ds = 0.35 + Math.random() * 0.35;
      var dm = new THREE.Mesh(new THREE.BoxGeometry(ds, ds, ds),
        new THREE.MeshBasicMaterial({ color: q % 3 ? 0x67e8f9 : 0xffd37a, wireframe: true }));
      dm.userData = { r: 6.6 + Math.random() * 2, sp: 0.25 + Math.random() * 0.45, ph: Math.random() * TAU };
      spin.add(dm);
      debris.push(dm);
    }

    /* Photo cards stand in a ring around the globe, facing outward (like a carousel).
       The card at the front is enlarged and glows; its name sits under it. */
    var CARD_W = 5.6, CARD_H = 4.0, CARD_ASPECT = CARD_W / CARD_H;
    var RING_R = 18, N = PHOTOS.length, STEP = TAU / N, AUTO = 0.12;

    function placeholderTex(label) {
      var c = document.createElement('canvas');
      c.width = 358; c.height = 256;
      var g = c.getContext('2d');
      var gr = g.createLinearGradient(0, 0, 358, 256);
      gr.addColorStop(0, '#0b2a3a');
      gr.addColorStop(1, '#2a0f55');
      g.fillStyle = gr;
      g.fillRect(0, 0, 358, 256);
      g.fillStyle = '#e8fbff';
      g.font = '600 24px sans-serif';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText(label, 179, 128);
      return new THREE.CanvasTexture(c);
    }
    var loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    function loadPhoto(mesh, idx) {
      loader.load(BASE + encodeURIComponent(PHOTOS[idx][0]), function (tex) {
        // cover-crop to the card shape so photos are never stretched
        var a = tex.image.width / tex.image.height;
        if (a > CARD_ASPECT) { tex.repeat.set(CARD_ASPECT / a, 1); tex.offset.set((1 - CARD_ASPECT / a) / 2, 0); }
        else { tex.repeat.set(1, a / CARD_ASPECT); tex.offset.set(0, (1 - a / CARD_ASPECT) / 2); }
        mesh.material.map = tex;
        mesh.material.needsUpdate = true;
      }, undefined, function () { /* keep the labelled placeholder */ });
    }

    var ring = new THREE.Group();
    ring.position.y = 1.0;           // lift the ring a little so the big front card clears the hint bar
    ring.rotation.x = 0.2;           // slight tilt so the far side rises behind the globe
    orbit.add(ring);

    // faint guide circle the cards travel on
    var guide = [];
    for (var gs = 0; gs <= 120; gs++) {
      var ga = gs / 120 * TAU;
      guide.push(new THREE.Vector3(Math.sin(ga) * RING_R, -CARD_H * 0.62, Math.cos(ga) * RING_R));
    }
    ring.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(guide),
      new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.25 })));

    var cardGeo = new THREE.PlaneGeometry(CARD_W, CARD_H);
    var edgeGeo = new THREE.EdgesGeometry(cardGeo);
    var cards = [];
    PHOTOS.forEach(function (p, idx) {
      var mesh = new THREE.Mesh(cardGeo,
        new THREE.MeshBasicMaterial({ map: placeholderTex(p[1]), side: THREE.DoubleSide }));
      var edge = new THREE.LineSegments(edgeGeo,
        new THREE.LineBasicMaterial({ color: 0x7ff3ff, transparent: true, opacity: 0.6 }));
      edge.position.z = 0.01;
      var glow = new THREE.Mesh(cardGeo, new THREE.MeshBasicMaterial({
        color: 0x22d3ee, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false
      }));
      glow.position.z = -0.04;
      glow.scale.setScalar(1.14);
      mesh.add(edge, glow);
      mesh.userData = { idx: idx, s: 1, edge: edge, glow: glow };
      ring.add(mesh);
      cards.push(mesh);
      loadPhoto(mesh, idx);
    });

    var nameEl = document.getElementById('hl-name');
    var prevBtn = document.getElementById('hl-prev');
    var nextBtn = document.getElementById('hl-next');

    // Ring state: ang = ring rotation (card i sits at ang + i*STEP, 0 = front)
    var ang = 0, vel = 0, snap = null, idle = 0, needSnap = false, auto = 0;
    var ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
    var overStage = false, dragging = false, dragMoved = false, downX = 0, lastX = 0, lastT = 0;
    var pcx = 0, pcy = 0;
    var hoverCube = -1, timeScale = 1, spinBoost = 0, lastY = window.scrollY, excess = 0;

    function wrap(a) {
      a = a % TAU;
      if (a > Math.PI) a -= TAU;
      if (a < -Math.PI) a += TAU;
      return a;
    }
    function frontIndex() { return ((Math.round(-ang / STEP) % N) + N) % N; }
    function snapBase() { return snap !== null ? snap : Math.round(ang / STEP) * STEP; }
    function stepBy(dir) { snap = snapBase() - dir * STEP; vel = 0; idle = 0; needSnap = false; }
    function goTo(i) {
      var t = -i * STEP;
      t += Math.round((ang - t) / TAU) * TAU;   // shortest way round
      snap = t; vel = 0; idle = 0; needSnap = false;
    }
    function pick(cx, cy) {
      ndc.set(cx / window.innerWidth * 2 - 1, -((cy + excess) / window.innerHeight * 2 - 1));
      ray.setFromCamera(ndc, camera);
      var hits = ray.intersectObjects(cards, false);
      return hits.length ? hits[0].object.userData.idx : -1;
    }
    function setHover(i) {
      if (i === hoverCube) return;
      hoverCube = i;
      stageEl.classList.toggle('hot', i >= 0);
    }

    // Pointer: hover to read a name, click a card to bring it round (click the front card to enlarge), drag to spin
    stageEl.addEventListener('pointermove', function (e) {
      pcx = e.clientX; pcy = e.clientY;
      overStage = true;
      if (dragging) {
        var now = performance.now(), dx = e.clientX - lastX;
        if (Math.abs(e.clientX - downX) > 4) dragMoved = true;
        ang += dx * 0.005;
        var dts = Math.max((now - lastT) / 1000, 0.008);
        vel += (dx * 0.005 / dts - vel) * 0.4;
        lastX = e.clientX; lastT = now;
      }
    });
    stageEl.addEventListener('pointerleave', function () { overStage = false; });
    stageEl.addEventListener('pointerdown', function (e) {
      if (e.target.closest && e.target.closest('.hl-arrow')) return;
      dragging = true; dragMoved = false; downX = lastX = e.clientX; lastT = performance.now();
      vel = 0; snap = null; idle = 0;
      stageEl.classList.add('drag');
      stageEl.setPointerCapture(e.pointerId);
    });
    function endDrag() {
      if (!dragging) return;
      dragging = false; needSnap = true; idle = 0;
      vel = Math.max(-4, Math.min(4, vel));
      stageEl.classList.remove('drag');
    }
    stageEl.addEventListener('pointerup', endDrag);
    stageEl.addEventListener('pointercancel', endDrag);
    stageEl.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.hl-arrow')) return;
      if (dragMoved) return;
      var i = pick(e.clientX, e.clientY);
      if (i < 0) return;
      if (i === frontIndex()) openPhoto(i); else goTo(i);
    });
    ['pointerdown', 'pointerup'].forEach(function (ev) {
      prevBtn.addEventListener(ev, function (e) { e.stopPropagation(); });
      nextBtn.addEventListener(ev, function (e) { e.stopPropagation(); });
    });
    prevBtn.addEventListener('click', function (e) { e.stopPropagation(); stepBy(-1); });
    nextBtn.addEventListener('click', function (e) { e.stopPropagation(); stepBy(1); });
    stageEl.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') stepBy(-1);
      if (e.key === 'ArrowRight') stepBy(1);
    });

    // Mouse wheel / trackpad over a photo spins the ring instead of the page
    // (only once the camera has arrived; anywhere off the photos the page scrolls as normal)
    stageEl.addEventListener('wheel', function (e) {
      if (cur < 0.95 || Math.abs(target - cur) > 0.03) return;
      if (pick(e.clientX, e.clientY) < 0) return;
      e.preventDefault();
      var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (e.deltaMode === 1) d *= 33; else if (e.deltaMode === 2) d *= 600;
      snap = null; needSnap = true; idle = 0;
      vel = Math.max(-5, Math.min(5, vel - d * 0.012));
    }, { passive: false });

    // Scrolling the page gives the ring (and everything else) a push
    window.addEventListener('scroll', function () {
      var y = window.scrollY, dy = y - lastY;
      spinBoost = Math.min(spinBoost + Math.abs(dy) * 0.003, 4);
      if (!dragging && Math.abs(dy) > 0) {
        snap = null; needSnap = true; idle = 0;
        vel = Math.max(-2.5, Math.min(2.5, vel - dy * 0.004));
      }
      lastY = y;
    }, { passive: true });

    function updateOrbit(dt, ease) {
      var ms = reduceMotion ? 0 : 1;
      spinBoost *= Math.pow(0.1, dt);

      if (overStage && !dragging) setHover(pick(pcx, pcy));
      else if (!overStage && hoverCube !== -1) setHover(-1);

      timeScale += ((hoverCube >= 0 ? 0.15 : 1) - timeScale) * ease;
      var k = dt * timeScale * (1 + spinBoost) * ms;

      // globe and drifting debris keep their own slow spin
      spin.rotation.y += 0.05 * k;
      globeWire.rotation.y += 0.2 * k;
      globeWire.rotation.x += 0.08 * k;
      globeCore.rotation.y -= 0.3 * k;
      globeEdges.rotation.copy(globeCore.rotation);
      for (var n2 = 0; n2 < debris.length; n2++) {
        var db = debris[n2], u = db.userData;
        u.ph += u.sp * k;
        db.position.set(Math.cos(u.ph) * u.r, Math.sin(u.ph * 0.7) * u.r * 0.5, Math.sin(u.ph) * u.r * 0.6);
        db.rotation.x = u.ph;
        db.rotation.y = u.ph * 1.3;
      }

      // ring motion: drag > inertia > snap to nearest card > gentle auto-spin when left alone
      if (dragging) {
        auto = 0;
      } else if (snap !== null) {
        ang += (snap - ang) * Math.min(1, ease * 1.6);
        if (Math.abs(snap - ang) < 0.0015) { ang = snap; snap = null; idle = 0; }
      } else if (Math.abs(vel) > 0.05) {
        ang += vel * dt;
        vel *= Math.pow(0.04, dt);
        idle = 0; needSnap = true;
      } else {
        vel = 0;
        if (needSnap) { snap = Math.round(ang / STEP) * STEP; needSnap = false; }
        else {
          idle += dt;
          auto += ((idle > 2 && hoverCube < 0 ? AUTO : 0) - auto) * ease;
          ang -= auto * dt * ms * (1 + spinBoost);
        }
      }

      for (var i = 0; i < cards.length; i++) {
        var m = cards[i], d = m.userData;
        var th = ang + i * STEP, c = Math.cos(th);
        var near = Math.max(0, 1 - Math.abs(wrap(th)) / (STEP * 0.8));    // 1 = front and centre
        var ns = near * near * (3 - 2 * near);                             // smooth 0..1
        m.position.set(Math.sin(th) * (RING_R + 1.4 * ns), 0, c * (RING_R + 1.4 * ns));
        m.rotation.y = th;
        var ts = 0.92 + 0.6 * ns + (i === hoverCube ? 0.06 : 0);          // centre card is clearly the biggest
        d.s += (ts - d.s) * ease;
        m.scale.setScalar(d.s);
        var b = 0.28 + 0.72 * Math.pow((c + 1) / 2, 1.6);                  // far side is dimmer
        m.material.color.setScalar(b);
        d.glow.material.opacity += (0.75 * ns - d.glow.material.opacity) * ease;
        d.edge.material.opacity = 0.5 + 0.5 * near;
        d.edge.material.color.setHex(near > 0.6 ? 0xcffafe : 0x7ff3ff);
      }
    }

    // Name label sits under the front card (or the hovered one)
    var tmpV = new THREE.Vector3();
    function updateLabel(travel) {
      var i = hoverCube >= 0 ? hoverCube : frontIndex();
      var m = cards[i];
      tmpV.set(0, -CARD_H / 2, 0);
      m.localToWorld(tmpV);
      tmpV.project(camera);
      var sr = stageEl.getBoundingClientRect();
      var x = (tmpV.x + 1) / 2 * window.innerWidth;
      var y = (1 - tmpV.y) / 2 * window.innerHeight - excess - sr.top;
      if (nameEl.textContent !== PHOTOS[i][1]) nameEl.textContent = PHOTOS[i][1];
      nameEl.style.transform = 'translate(' + x.toFixed(1) + 'px,' + (y + 8).toFixed(1) + 'px) translateX(-50%)';
      nameEl.style.opacity = Math.max(0, Math.min(1, (travel - 0.9) / 0.08)).toFixed(2);
    }

    /* ---------- the clock: a retro sun that tells your real local time ---------- */
    var clock3d = new THREE.Group();
    var sunMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader:
        'varying vec3 vP; uniform float uTime;' +
        'void main(){' +
        '  float y = (vP.y / 4.0) * 0.5 + 0.5;' +
        '  vec3 c = mix(vec3(1.0, 0.27, 0.66), vec3(0.58, 0.4, 1.0), y);' +
        '  if (y < 0.55 && fract(vP.y * 1.6 - uTime * 0.15) < (0.55 - y) * 1.2) discard;' +
        '  gl_FragColor = vec4(c, 1.0);' +
        '}'
    });
    clock3d.add(new THREE.Mesh(new THREE.SphereGeometry(4, 48, 32), sunMat));
    clock3d.add(glowSprite(0xb04dff, 22, 0.55));

    var tp = [];
    for (var t = 0; t < 60; t++) {
      var an = t / 60 * TAU, r1 = t % 5 === 0 ? 6.0 : 6.5, r2 = 7.0;
      tp.push(Math.sin(an) * r1, Math.cos(an) * r1, 0, Math.sin(an) * r2, Math.cos(an) * r2, 0);
    }
    var tg = new THREE.BufferGeometry();
    tg.setAttribute('position', new THREE.Float32BufferAttribute(tp, 3));
    var ticks = new THREE.LineSegments(tg, new THREE.LineBasicMaterial({ color: 0xc4b2ff, transparent: true, opacity: 1 }));
    clock3d.add(ticks);

    // Hands sit in front of the sun's surface. Every hand gets a soft additive halo so it
    // glows against the dark tunnel: lavender hour hand, pale-violet minute hand, magenta date hand (Nebula Violet).
    var hands = new THREE.Group();
    hands.position.z = 4.15;
    clock3d.add(hands);
    function halo(mesh, color, widen, opacity) {
      var g = new THREE.Mesh(mesh.geometry, new THREE.MeshBasicMaterial({
        color: color, transparent: true, opacity: opacity, blending: THREE.AdditiveBlending, depthWrite: false
      }));
      g.scale.x = widen;
      mesh.add(g);
    }
    function makeHand(len, wid, color, glow) {
      var geo = new THREE.BoxGeometry(wid, len, 0.03);
      geo.translate(0, len / 2 - 0.3, 0);
      var m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: color }));
      halo(m, glow, 3.2, 0.34);
      halo(m, glow, 7, 0.14);
      var tip = glowSprite(glow, Math.max(1.4, wid * 11), 0.9);
      tip.position.set(0, len - 0.3, 0.05);
      m.add(tip);
      hands.add(m);
      return m;
    }
    var hourHand = makeHand(3.4, 0.28, 0xd9c9ff, 0x7c4dff);
    var minHand = makeHand(5.6, 0.16, 0xf6efff, 0xb57bff);
    // the long "date hand": reaches out to the ring of dates and points at the selected one
    var DATE_HAND = 11;
    var secHand = makeHand(DATE_HAND, 0.14, 0xff7ad9, 0xd500f9);
    // centre pivot
    hands.add(new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffffff })));
    var pivotGlow = glowSprite(0xb57bff, 2.6, 0.85);
    pivotGlow.position.z = 0.05;
    hands.add(pivotGlow);
    scene.add(clock3d);

    // The sun is locked to the centre of the calendar ring: each frame its 3D position and size
    // are recomputed from where the ring sits on screen, so the two always line up.
    var dialEl = document.getElementById('dial'), sunV = new THREE.Vector3();
    var SUN_DIST = 22;
    function placeSun() {
      var r = dialEl.getBoundingClientRect(), w = window.innerWidth, h = window.innerHeight;
      var vis = r.width > 0 && r.bottom > -60 && r.top < h + 60;
      clock3d.visible = vis;
      if (!vis) return;
      var cx = r.left + r.width / 2, cy = r.top + r.height / 2 + excess;
      var halfH = Math.tan(camera.fov * Math.PI / 360) * SUN_DIST;
      sunV.set((cx / w * 2 - 1) * halfH * camera.aspect, -(cy / h * 2 - 1) * halfH, -SUN_DIST);
      clock3d.position.copy(camera.localToWorld(sunV));
      clock3d.quaternion.copy(camera.quaternion);
      // sun radius (4 units) should span 13.4% of the ring's width on screen
      clock3d.scale.setScalar((r.width * 0.134 / 4) / (h / (2 * halfH)));
    }

    function updateClock(t) {
      var now = new Date();
      var s = now.getSeconds() + now.getMilliseconds() / 1000;
      var m = now.getMinutes() + s / 60;
      var h = (now.getHours() % 12) + m / 60;
      secHand.rotation.z = -dateHandDeg * Math.PI / 180;
      minHand.rotation.z = -m / 60 * TAU;
      hourHand.rotation.z = -h / 12 * TAU;
      sunMat.uniforms.uTime.value = t;
    }

    /* ---------- layout ----------
       Camera travel (0 to 1) ends when the highlights stage is centred on screen, so the globe
       and its orbiting photos are parked right there. The clock sits beside the calendar on the way. */
    var calEl = document.getElementById('calendar');
    function layout() {
      var w = window.innerWidth, h = window.innerHeight, aspect = w / h;
      var sr = stageEl.getBoundingClientRect();
      var sc = Math.max(1, sr.top + window.scrollY + sr.height / 2 - h / 2);
      var p = Math.min(0.95, (calEl.offsetTop + calEl.offsetHeight / 2 - h / 2) / sc);
      var narrow = aspect < 0.95;


      orbit.position.set(0, 0, -TOTAL - D);
      orbit.scale.setScalar(narrow ? 0.6 : 1);
      return sc;
    }

    var docRange = 1, target = 0, cur = 0, mx = 0, my = 0, tmx = 0, tmy = 0, fov = 60;
    function readScroll() { target = Math.min(1, Math.max(0, window.scrollY / docRange)); }
    function resize() {
      var w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      docRange = layout();
      readScroll();
    }
    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('resize', resize);
    window.addEventListener('load', resize);
    if (window.ResizeObserver) new ResizeObserver(function () { docRange = layout(); readScroll(); }).observe(document.body);
    if (!reduceMotion) {
      window.addEventListener('pointermove', function (e) {
        tmx = e.clientX / window.innerWidth * 2 - 1;
        tmy = e.clientY / window.innerHeight * 2 - 1;
      });
    }
    resize();
    cur = target;

    var clock = new THREE.Clock();
    function frame() {
      requestAnimationFrame(frame);
      var dt = Math.min(clock.getDelta(), 0.05);
      var t = reduceMotion ? 0 : clock.elapsedTime;
      var ease = reduceMotion ? 1 : 1 - Math.pow(0.02, dt);

      cur += (target - cur) * ease;
      mx += (tmx - mx) * ease;
      my += (tmy - my) * ease;

      camera.position.set(mx * 1.4, -my * 0.9, -cur * TOTAL);
      camera.rotation.set(-my * 0.035, -mx * 0.05, 0);

      var targetFov = 60 + Math.min(Math.abs(target - cur) * TOTAL * 1.2, 16);
      fov += (targetFov - fov) * ease;
      if (Math.abs(camera.fov - fov) > 0.01) { camera.fov = fov; camera.updateProjectionMatrix(); }

      tunnel.rotation.z = t * 0.04 + cur * 3.0;
      for (var i = 0; i < rings.length; i++) {
        var r = rings[i];
        if (r.userData.hex) r.rotation.z = i * 0.21 + t * 0.15 * r.userData.dir;
      }
      // once the camera has arrived, scroll the whole scene up with the page so the footer sits below it
      excess = Math.max(0, window.scrollY - docRange);
      canvas.style.transform = excess > 0 ? 'translate3d(0,' + (-excess).toFixed(1) + 'px,0)' : '';
      bgStars.position.z = camera.position.z;
      bgStars.rotation.y = t * 0.005;
      ticks.rotation.z = 0;

      camera.updateMatrixWorld();
      placeSun();
      updateClock(t);
      updateOrbit(dt, ease);
      renderer.render(scene, camera);
      updateLabel(cur);
    }
    frame();
  }
})();
