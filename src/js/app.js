document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('starfield-canvas');
    const splashScreen = document.getElementById('splash-screen');
    const loaderScreen = document.getElementById('loader-screen');
    const mainScrollContainer = document.getElementById('main-scroll-container');
    const calendarPage = document.getElementById('calendar-page');
    const universePage = document.getElementById('universe-page');

    const portalVideo = document.getElementById('portal-video');
    const portalFlashOverlay = document.getElementById('portal-flash-overlay');
    const portalEntryTrigger = document.getElementById('portal-entry-trigger');
    const portalSkipBtn = document.getElementById('portal-skip-btn');
    const portalAudioBtn = document.getElementById('portal-audio-btn');
    const iconSoundOff = document.getElementById('icon-sound-off');
    const iconSoundOn = document.getElementById('icon-sound-on');
    const portalLoaderBar = document.querySelector('.portal-loader-bar');

    let hasAlreadyEnteredPortal = false;
    try {
        if (new URLSearchParams(window.location.search).get('firsttime') === 'true' || new URLSearchParams(window.location.search).get('replay') === 'true') {
            sessionStorage.removeItem('portalEntered');
            hasAlreadyEnteredPortal = false;
        } else {
            hasAlreadyEnteredPortal = (sessionStorage.getItem('portalEntered') === 'true') || (new URLSearchParams(window.location.search).get('skipintro') === 'true');
        }
    } catch (e) {}
    let portalPlaybackActive = false;
    let portalHasEntered = hasAlreadyEnteredPortal;
    let flashTriggered = false;
    let splashAnimFrameId = null;
    let cyberAudioInstance = null;

    const swipeTrigger = document.getElementById('swipe-trigger');
    const enterBtn = document.getElementById('enter-btn');
    const loaderPercentage = document.getElementById('loader-percentage');
    const terminalLogs = document.getElementById('terminal-logs');

    const calendarCubeViewport = document.getElementById('calendar-cube-viewport');
    const calendarCube = document.getElementById('calendar-cube');
    const calendarLayoutContainer = document.getElementById('calendar-layout-container');
    const faceJan = document.getElementById('face-jan');
    const faceFeb = document.getElementById('face-feb');
    const faceMar = document.getElementById('face-mar');
    const faceApr = document.getElementById('face-apr');
    const faceMay = document.getElementById('face-may');
    const faceJun = document.getElementById('face-jun');
    const cubeBtnPrev = document.getElementById('cube-btn-prev');
    const cubeBtnNext = document.getElementById('cube-btn-next');
    const cubeMonthTracker = document.getElementById('cube-month-tracker');

    const dayEventsPanel = document.getElementById('day-events-panel');
    const backToCubeBtn = document.getElementById('back-to-cube-btn');
    const calendarPanelTitle = document.getElementById('calendar-panel-title');
    const calendarPanelDate = document.getElementById('calendar-panel-date');
    const calendarEventsList = document.getElementById('calendar-events-list');

    const eventModal = document.getElementById('event-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalVerseBadge = document.getElementById('modal-verse-badge');
    const modalVerseTitle = document.getElementById('modal-verse-title');
    const modalVerseDesc = document.getElementById('modal-verse-desc');
    const eventsGrid = document.getElementById('events-grid');
    const toast = document.getElementById('toast-notification');

    const verseData = {
        tech: {
            title: "TECH VERSE",
            badge: "TECH VERSE",
            color: "var(--tech-color)",
            glow: "var(--tech-glow)",
            desc: "The dimensional portal of extreme machines, complex algorithm craft, and futuristic technology.",
            events: [
                { name: "Robo Soccer", desc: "Build a customized autonomous or manual robot to play in a futuristic arena and claim the championship.", date: "Oct 15, 10:00 AM", venue: "Robotics Bay A" },
                { name: "Code-A-Thon", desc: "A grueling 24-hour sprint where developer teams solve complex cosmic algorithms under pressure.", date: "Oct 16, 09:00 AM", venue: "Matrix Lab 3" },
                { name: "AI Odyssey", desc: "Design a deep learning model to navigate, classify, and solve anomalies in generative datasets.", date: "Oct 17, 11:30 AM", venue: "Neuromorphic Hall" },
                { name: "WebCraft", desc: "Create stunning, high-performance web systems using cutting-edge interactive elements and APIs.", date: "Oct 15, 02:00 PM", venue: "Cyber Center 1" },
                { name: "Mech-trix", desc: "A robotics CAD design challenge to construct virtual spaceships and drone frameworks.", date: "Oct 17, 03:00 PM", venue: "Simulation Annex" }
            ]
        },
        cult: {
            title: "CULT VERSE",
            badge: "CULT VERSE",
            color: "var(--cult-color)",
            glow: "var(--cult-glow)",
            desc: "Step through the portal of pure artistic expression, dynamic dance, dramatic stages, and melodic sounds.",
            events: [
                { name: "Step Up", desc: "Show off street dance battles or classical choreography in a high-octane group dance showdown.", date: "Oct 16, 06:00 PM", venue: "Main Arena Gate 1" },
                { name: "Symphony", desc: "The ultimate rock and fusion band championship. Feel the acoustics shake the multiverse.", date: "Oct 17, 07:00 PM", venue: "The Amphitheater" },
                { name: "Dramatics", desc: "A street play competition addressing contemporary topics across multidimensional realities.", date: "Oct 15, 12:00 PM", venue: "Central Plaza" },
                { name: "Voice of Pravaah", desc: "Solo singing competition for vocalists representing classical, western, and contemporary genres.", date: "Oct 16, 02:00 PM", venue: "Auditorium Prime" },
                { name: "Vogue", desc: "Cosmic fashion show reflecting themes of cyberpunk, retro-futurism, and sustainability.", date: "Oct 18, 08:00 PM", venue: "The Galaxy Runway" }
            ]
        },
        game: {
            title: "GAME VERSE",
            badge: "GAME VERSE",
            color: "var(--game-color)",
            glow: "var(--game-glow)",
            desc: "Enter the cybernetic arena where only players with the fastest reflexes and strategies survive.",
            events: [
                { name: "Valorant Showdown", desc: "Tactical 5v5 shooter tournament. Coordinate utilities and execute sites with flawless precision.", date: "Oct 15-16, All Day", venue: "Esports Lounge A" },
                { name: "BGMI Arena", desc: "Squad survival battles in a massive battle royale. Drop, loot, rotate, and secure the chicken dinner.", date: "Oct 16-17, All Day", venue: "Esports Lounge B" },
                { name: "FIFA Cup", desc: "Classic virtual soccer tournament on consoles. Put your tactical setups and finger agility to the test.", date: "Oct 15, 01:00 PM", venue: "Console Zone 1" },
                { name: "Retro Arcade", desc: "Compete in high-score challenges on Pacman, Tetris, and Pinball systems in our retro lounge.", date: "Oct 17, 10:00 AM", venue: "Nostalgia Arcade" },
                { name: "Chess Grandmaster", desc: "Bullet and blitz tournament requiring lightning-fast computation under tight time controls.", date: "Oct 18, 10:00 AM", venue: "Silence Lounge" }
            ]
        },
        ent: {
            title: "ENTREPRENEUR VERSE",
            badge: "ENTREPRENEUR VERSE",
            color: "var(--ent-color)",
            glow: "var(--ent-glow)",
            desc: "The hub of business design, creative marketing pitch strategies, and capital management simulations.",
            events: [
                { name: "Pitchers", desc: "Pitch your startup concepts to industry venture capitalists. Acquire funding options.", date: "Oct 16, 11:00 AM", venue: "Incubation Incubator" },
                { name: "B-Plan Showdown", desc: "Submit a full corporate business plan outlining feasibility, unit economics, and growth maps.", date: "Oct 15, 03:00 PM", venue: "Seminar Room C" },
                { name: "Crypto Quest", desc: "Live mock market trading platform. Buy, sell, short, and leverage virtual crypto coins.", date: "Oct 17, 10:00 AM", venue: "Finance Lab B" },
                { name: "Ad-Mad", desc: "Conceptualize, shoot, and present a funny or striking advertisement for an arbitrary wacky product.", date: "Oct 15, 11:00 AM", venue: "Media Auditorium" },
                { name: "Shark Tank Junior", desc: "High-school level pitching arena for young innovators to showcase early-stage products.", date: "Oct 18, 02:00 PM", venue: "Incubation Incubator" }
            ]
        },
        social: {
            title: "SOCIAL VERSE",
            badge: "SOCIAL VERSE",
            color: "var(--social-color)",
            glow: "var(--social-glow)",
            desc: "Dedicated to local community care, eco-initiatives, and tech deployments for public good.",
            events: [
                { name: "Green Horizon", desc: "Eco-innovations and design ideas for solid waste management and carbon footprint reduction.", date: "Oct 15, 10:00 AM", venue: "Botanical Annex" },
                { name: "Blood Donation Camp", desc: "A drive to support local health clinics. Give the gift of life. Certified donor program.", date: "Oct 16, 09:00 AM", venue: "Medical Room 1" },
                { name: "Street School", desc: "Interactive teaching workshops for kids from local orphanages and shelter societies.", date: "Oct 17, 09:30 AM", venue: "Main Plaza Lawn" },
                { name: "Tech for Good", desc: "Hackathon dedicated to developing digital solutions for accessibility and public health.", date: "Oct 17, 02:00 PM", venue: "Cyber Center 2" },
                { name: "Nukkad Natak", desc: "Street plays focused on spreading awareness about clean water, mental health, and child education.", date: "Oct 16, 04:00 PM", venue: "Open Air Stage B" }
            ]
        }
    };

    const verses = [
        { key: 'tech', label: 'TECH VERSE', color: 'var(--tech-color)', angle: -90 },
        { key: 'cult', label: 'CULT VERSE', color: 'var(--cult-color)', angle: -18 },
        { key: 'game', label: 'GAME VERSE', color: 'var(--game-color)', angle: 54 },
        { key: 'ent', label: 'ENTRE VERSE', color: 'var(--ent-color)', angle: 126 },
        { key: 'social', label: 'SOCIAL VERSE', color: 'var(--social-color)', angle: 198 }
    ];

    function getRegistrationLink(eventName) {
        return `https://docs.google.com/forms/d/e/1FAIpQLScJp86gL9E-Pravaah2026MockForm/viewform?usp=pp_url&entry.18473822=${encodeURIComponent(eventName)}`;
    }

    function initPortalSimulation() {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Normalized mouse offsets (-1.0 to +1.0) with smooth damping
        let normX = 0;
        let normY = 0;
        let targetNormX = 0;
        let targetNormY = 0;
        let cursorClientX = width * 0.5;
        let cursorClientY = height * 0.5;
        let hasMouseMoved = false;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);

        window.addEventListener('mousemove', (e) => {
            hasMouseMoved = true;
            cursorClientX = e.clientX;
            cursorClientY = e.clientY;
            targetNormX = (e.clientX - width * 0.5) / (width * 0.5);
            targetNormY = (e.clientY - height * 0.5) / (height * 0.5);
            spawnCursorSpark(e.clientX, e.clientY);
        });
        window.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches[0]) {
                hasMouseMoved = true;
                cursorClientX = e.touches[0].clientX;
                cursorClientY = e.touches[0].clientY;
                targetNormX = ((e.touches[0].clientX - width * 0.5) / (width * 0.5)) * 0.6;
                targetNormY = ((e.touches[0].clientY - height * 0.5) / (height * 0.5)) * 0.6;
            }
        }, { passive: true });

        const colors = [
            [0, 210, 255],   // Tech Cyan
            [230, 38, 120],  // Neon Magenta
            [255, 42, 75],   // Crimson Red
            [255, 170, 0],   // Solar Gold
            [255, 255, 255]  // Starlight White
        ];

        // 1. SPARSE AMBIENT TWINKLING STARS ACROSS THE WIDE SKY
        const numAmbient = 100;
        const ambientStars = [];
        for (let i = 0; i < numAmbient; i++) {
            ambientStars.push({
                x: Math.random() * 2600,
                y: Math.random() * 1800,
                size: 0.5 + Math.random() * 1.4,
                depth: 0.15 + Math.random() * 0.85,
                twinkle: Math.random() * Math.PI * 2,
                twinkleSpeed: 0.012 + Math.random() * 0.022,
                color: i % 6 === 0 ? 'rgba(0, 210, 255,' : i % 9 === 0 ? 'rgba(230, 38, 120,' : 'rgba(255, 255, 255,'
            });
        }

        // 2. SPARSE COSMIC MOTES (Distributed across entire screen, not clustered at center)
        const numMotes = 32;
        const cosmicMotes = [];
        for (let i = 0; i < numMotes; i++) {
            const c = colors[Math.floor(Math.random() * colors.length)];
            cosmicMotes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.28,
                depth: 0.2 + Math.random() * 0.8,
                size: 0.9 + Math.random() * 1.5,
                alpha: 0.25 + Math.random() * 0.45,
                color: c,
                trail: []
            });
        }

        // 3. AIRY, SUBTLE HEX ENERGY STREAMERS AROUND PORTAL
        const numHex = 7;
        const hexStreamers = [];
        for (let i = 0; i < numHex; i++) {
            const ringScale = 0.85 + (i % 3) * 0.55;
            const c = colors[i % colors.length];
            hexStreamers.push({
                progress: Math.random(),
                speed: 0.0012 + Math.random() * 0.0020,
                ringScale: ringScale,
                color: c,
                size: 1.2 + Math.random() * 1.2,
                trail: []
            });
        }

        // 4. ELEGANT LITTLE COMET (SHOOTING STAR) SYSTEM
        const comets = [];
        let nextCometTime = 0.8; // Pre-spawn first comet shortly after load

        function spawnComet() {
            const cometColors = [
                [0, 235, 255],   // Cyan comet
                [255, 255, 255], // Starlight white comet
                [235, 120, 255], // Violet-pink comet
                [255, 210, 80]   // Golden comet
            ];
            const c = cometColors[Math.floor(Math.random() * cometColors.length)];
            const angle = Math.PI * 0.22 + (Math.random() - 0.5) * 0.25; // Diagonal streak (~30° to 50°)
            comets.push({
                x: Math.random() * (width * 1.1) - width * 0.05,
                y: -30 - Math.random() * 40,
                angle: angle,
                speed: 5.2 + Math.random() * 3.6,
                length: 65 + Math.random() * 85,
                size: 1.6 + Math.random() * 1.2,
                color: c,
                life: 1.0,
                decay: 0.005 + Math.random() * 0.004,
                sparks: []
            });
        }

        // 5. Interactive cursor star stardust (White & Yellow twinkling stars)
        const cursorSparks = [];
        const maxSparks = 45;
        const starColors = [
            [255, 255, 255], // Pure Bright White
            [250, 250, 255], // Crisp Diamond White
            [240, 245, 255], // Cool Starlight White
            [255, 255, 250]  // Soft Luminous White
        ];
        function spawnCursorSpark(x, y) {
            if (cursorSparks.length >= maxSparks) return;
            const c = starColors[Math.floor(Math.random() * starColors.length)];
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.4 + Math.random() * 1.5;
            cursorSparks.push({
                x: x + (Math.random() - 0.5) * 16,
                y: y + (Math.random() - 0.5) * 16,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 0.15,
                size: 2.2 + Math.random() * 2.8,
                rotation: Math.random() * Math.PI,
                rotSpeed: (Math.random() - 0.5) * 0.12,
                alpha: 0.95,
                decay: 0.016 + Math.random() * 0.022,
                points: Math.random() < 0.65 ? 4 : 5,
                color: c
            });
        }

        function getHexCoord(cx, cy, radius, progress) {
            const totalSides = 6;
            const p = ((progress % 1) + 1) % 1;
            const sideFloat = p * totalSides;
            const sideIndex = Math.floor(sideFloat);
            const sideFraction = sideFloat - sideIndex;

            const a1 = (sideIndex * Math.PI) / 3 - Math.PI / 6;
            const a2 = ((sideIndex + 1) * Math.PI) / 3 - Math.PI / 6;

            const x1 = cx + Math.cos(a1) * radius;
            const y1 = cy + Math.sin(a1) * radius;
            const x2 = cx + Math.cos(a2) * radius;
            const y2 = cy + Math.sin(a2) * radius;

            return {
                x: x1 + (x2 - x1) * sideFraction,
                y: y1 + (y2 - y1) * sideFraction
            };
        }

        let time = 0;
        function render() {
            time += 0.016;

            // Smooth interpolation for mouse offsets
            normX += (targetNormX - normX) * 0.065;
            normY += (targetNormY - normY) * 0.065;

            // 1. DYNAMIC BACKGROUND PARALLAX WITH CURSOR + SCROLL
            const globalBg = document.getElementById('global-bg-layer');
            if (globalBg) {
                const curScroll = window.pageYOffset || document.documentElement.scrollTop || 0;
                const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
                const scrollProgress = Math.min(1, Math.max(0, curScroll / maxScroll));

                // Smoothly unroll the extended background for home page, or center for pre-portal
                if (portalHasEntered) {
                    globalBg.style.backgroundPosition = `center ${(scrollProgress * 100).toFixed(2)}%`;
                } else {
                    globalBg.style.backgroundPosition = 'center center';
                }

                // Move background opposite to cursor for deep window depth
                const bgShiftX = -normX * 32;
                const bgShiftY = -normY * 24;
                globalBg.style.transform = `scale(1.08) translate3d(${bgShiftX.toFixed(2)}px, ${bgShiftY.toFixed(2)}px, 0)`;
            }

            // Spawn ambient stardust around cursor when moving
            if (hasMouseMoved && Math.random() < 0.85) {
                spawnCursorSpark(cursorClientX, cursorClientY);
            }

            ctx.clearRect(0, 0, width, height);

            // 2. PARTICLE EFFECT PARALLAX WITH CURSOR
            const portalCx = width * 0.5 + normX * 45;
            const portalCy = height * 0.46 + normY * 35;
            const baseRadius = Math.min(width, height) * 0.24;

            // A. Ambient starfield moving in 3D multi-plane depth across the whole screen
            for (let i = 0; i < numAmbient; i++) {
                const s = ambientStars[i];
                s.twinkle += s.twinkleSpeed;
                const alpha = 0.15 + 0.55 * (0.5 + 0.5 * Math.sin(s.twinkle));
                const shiftX = normX * s.depth * 52;
                const shiftY = normY * s.depth * 40;
                const sx = (s.x + shiftX + width) % width;
                const sy = (s.y + shiftY + height) % height;

                ctx.fillStyle = s.color + alpha + ')';
                ctx.beginPath();
                ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
                ctx.fill();
            }

            // B. Sparse Cosmic Motes wandering gracefully across the entire screen
            for (let i = 0; i < numMotes; i++) {
                const m = cosmicMotes[i];
                m.x += m.vx;
                m.y += m.vy;

                // Screen edge wrapping
                if (m.x < -20) m.x = width + 20;
                if (m.x > width + 20) m.x = -20;
                if (m.y < -20) m.y = height + 20;
                if (m.y > height + 20) m.y = -20;

                const shiftX = normX * m.depth * 38;
                const shiftY = normY * m.depth * 28;
                const mx = m.x + shiftX;
                const my = m.y + shiftY;

                m.trail.push({ x: mx, y: my });
                if (m.trail.length > 4) m.trail.shift();

                if (m.trail.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(m.trail[0].x, m.trail[0].y);
                    for (let k = 1; k < m.trail.length; k++) {
                        ctx.lineTo(m.trail[k].x, m.trail[k].y);
                    }
                    ctx.strokeStyle = `rgba(${m.color[0]}, ${m.color[1]}, ${m.color[2]}, ${(m.alpha * 0.35).toFixed(2)})`;
                    ctx.lineWidth = m.size * 0.7;
                    ctx.stroke();
                }

                ctx.fillStyle = `rgba(${m.color[0]}, ${m.color[1]}, ${m.color[2]}, ${m.alpha.toFixed(2)})`;
                ctx.beginPath();
                ctx.arc(mx, my, m.size, 0, Math.PI * 2);
                ctx.fill();
            }

            // C. Airy, subtle hexagonal portal energy rings
            for (let i = 0; i < numHex; i++) {
                const h = hexStreamers[i];
                h.progress += h.speed;
                const hexRadius = baseRadius * h.ringScale;
                const pos = getHexCoord(portalCx, portalCy, hexRadius, h.progress);

                h.trail.push({ x: pos.x, y: pos.y });
                if (h.trail.length > 5) h.trail.shift();

                if (h.trail.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(h.trail[0].x, h.trail[0].y);
                    for (let k = 1; k < h.trail.length; k++) {
                        ctx.lineTo(h.trail[k].x, h.trail[k].y);
                    }
                    ctx.strokeStyle = 'rgba(' + h.color[0] + ',' + h.color[1] + ',' + h.color[2] + ', 0.28)';
                    ctx.lineWidth = h.size * 0.75;
                    ctx.stroke();
                }

                ctx.fillStyle = 'rgba(' + h.color[0] + ',' + h.color[1] + ',' + h.color[2] + ', 0.65)';
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, h.size, 0, Math.PI * 2);
                ctx.fill();
            }

            // D. LITTLE COMET (SHOOTING STAR) EFFECT
            if (time >= nextCometTime) {
                spawnComet();
                nextCometTime = time + 2.5 + Math.random() * 2.8; // Spawns every 2.5 to 5.3 seconds
            }

            for (let i = comets.length - 1; i >= 0; i--) {
                const c = comets[i];
                c.x += Math.cos(c.angle) * c.speed;
                c.y += Math.sin(c.angle) * c.speed;
                c.life -= c.decay;

                const tailX = c.x - Math.cos(c.angle) * (c.length * Math.max(0.2, c.life));
                const tailY = c.y - Math.sin(c.angle) * (c.length * Math.max(0.2, c.life));

                // Glowing tapered tail
                if (c.life > 0.05) {
                    const grad = ctx.createLinearGradient(c.x, c.y, tailX, tailY);
                    grad.addColorStop(0, `rgba(${c.color[0]}, ${c.color[1]}, ${c.color[2]}, ${(0.85 * c.life).toFixed(2)})`);
                    grad.addColorStop(0.22, `rgba(${c.color[0]}, ${c.color[1]}, ${c.color[2]}, ${(0.40 * c.life).toFixed(2)})`);
                    grad.addColorStop(1, `rgba(${c.color[0]}, ${c.color[1]}, ${c.color[2]}, 0)`);

                    ctx.strokeStyle = grad;
                    ctx.lineWidth = c.size * 0.85;
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(c.x, c.y);
                    ctx.lineTo(tailX, tailY);
                    ctx.stroke();

                    // Outer soft aura around comet nucleus
                    ctx.fillStyle = `rgba(${c.color[0]}, ${c.color[1]}, ${c.color[2]}, ${(0.55 * c.life).toFixed(2)})`;
                    ctx.beginPath();
                    ctx.arc(c.x, c.y, c.size * 2.2, 0, Math.PI * 2);
                    ctx.fill();

                    // Bright white-hot nucleus head
                    ctx.fillStyle = `rgba(255, 255, 255, ${(0.95 * c.life).toFixed(2)})`;
                    ctx.beginPath();
                    ctx.arc(c.x, c.y, c.size * 1.05, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Shed subtle stardust sparks behind the comet
                if (Math.random() < 0.35 && c.life > 0.3) {
                    c.sparks.push({
                        x: c.x - Math.cos(c.angle) * (Math.random() * 30),
                        y: c.y - Math.sin(c.angle) * (Math.random() * 30),
                        vx: (Math.random() - 0.5) * 0.6,
                        vy: (Math.random() - 0.5) * 0.6,
                        alpha: 0.75,
                        size: 0.7 + Math.random() * 1.0
                    });
                }

                // Render comet trail sparks
                for (let k = c.sparks.length - 1; k >= 0; k--) {
                    const sp = c.sparks[k];
                    sp.x += sp.vx;
                    sp.y += sp.vy;
                    sp.alpha -= 0.035;
                    sp.size *= 0.95;

                    if (sp.alpha <= 0.02) {
                        c.sparks.splice(k, 1);
                        continue;
                    }

                    ctx.fillStyle = `rgba(${c.color[0]}, ${c.color[1]}, ${c.color[2]}, ${sp.alpha.toFixed(2)})`;
                    ctx.beginPath();
                    ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Remove comet once it traverses off-screen or dissolves
                if (c.y > height + 100 || c.x > width + 120 || c.life <= 0) {
                    comets.splice(i, 1);
                }
            }

            // E. Interactive cursor stardust trail (Twinkling small stars in white & yellow)
            for (let i = cursorSparks.length - 1; i >= 0; i--) {
                const sp = cursorSparks[i];
                sp.x += sp.vx;
                sp.y += sp.vy;
                sp.rotation += sp.rotSpeed;
                sp.alpha -= sp.decay;
                sp.size *= 0.97;

                if (sp.alpha <= 0.02 || sp.size <= 0.4) {
                    cursorSparks.splice(i, 1);
                    continue;
                }

                ctx.save();
                ctx.translate(sp.x, sp.y);
                ctx.rotate(sp.rotation);

                const pts = sp.points || 4;
                const outerR = sp.size;
                const innerR = sp.size * 0.32;
                ctx.beginPath();
                for (let p = 0; p < pts * 2; p++) {
                    const r = (p % 2 === 0) ? outerR : innerR;
                    const a = (p * Math.PI) / pts;
                    if (p === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
                    else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
                }
                ctx.closePath();

                ctx.fillStyle = `rgba(${sp.color[0]}, ${sp.color[1]}, ${sp.color[2]}, ${sp.alpha.toFixed(2)})`;
                ctx.shadowColor = `rgba(${sp.color[0]}, ${sp.color[1]}, ${sp.color[2]}, 0.85)`;
                ctx.shadowBlur = 4;
                ctx.fill();
                ctx.restore();
            }


            requestAnimationFrame(render);
        }
        render();
    }
    initPortalSimulation();

    function revealAboutSectionInstantly() {
        const aboutLead = document.getElementById('about-lead-container');
        const aboutCardPravaah = document.getElementById('about-card-pravaah');
        const aboutCardTheme = document.getElementById('about-card-theme');
        const guideToCal = document.getElementById('guide-to-calendar-btn');
        if (aboutLead) {
            aboutLead.style.opacity = '1';
            aboutLead.style.transform = 'translateY(0) scale(1)';
            aboutLead.style.filter = 'blur(0px)';
            aboutLead.classList.add('is-centered');
        }
        if (aboutCardPravaah) {
            aboutCardPravaah.style.visibility = 'visible';
            aboutCardPravaah.style.pointerEvents = 'auto';
            aboutCardPravaah.style.opacity = '1';
            aboutCardPravaah.style.filter = 'blur(0px)';
            aboutCardPravaah.classList.add('is-revealed');
        }
        if (aboutCardTheme) {
            aboutCardTheme.style.visibility = 'visible';
            aboutCardTheme.style.pointerEvents = 'auto';
            aboutCardTheme.style.opacity = '1';
            aboutCardTheme.style.filter = 'blur(0px)';
            aboutCardTheme.classList.add('is-revealed');
        }
        if (guideToCal) {
            guideToCal.classList.add('is-revealed');
        }
    }

    if (portalHasEntered) {
        document.body.classList.add('portal-entered');
        document.documentElement.classList.add('portal-entered-fast');
        if (mainScrollContainer) {
            mainScrollContainer.classList.add('scroll-enabled');
        }
        if (splashScreen) {
            splashScreen.classList.add('hidden');
            splashScreen.classList.remove('active-screen');
            splashScreen.style.display = 'none';
        }
        const intro = document.getElementById('pravaah-intro-screen');
        if (intro) {
            intro.classList.add('hidden');
            intro.style.display = 'none';
        }
        const loader = document.getElementById('loader-screen');
        if (loader) {
            loader.classList.add('hidden');
            loader.classList.remove('active-screen');
            loader.style.display = 'none';
        }
        const initialNavWheel = document.getElementById('cosmic-nav-wheel');
        if (initialNavWheel) {
            initialNavWheel.classList.remove('hidden-nav');
        }
        revealAboutSectionInstantly();
        const globalBg = document.getElementById('global-bg-layer');
        if (globalBg) {
            globalBg.style.backgroundImage = "url('assets/images/space_star_bg.jpg')";
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
        const globalBg = document.getElementById('global-bg-layer');
        if (globalBg) {
            globalBg.style.backgroundImage = "url('assets/images/space_star_bg.jpg')";
        }
        document.body.classList.remove('portal-entered');
        document.documentElement.classList.remove('portal-entered-fast');
        if (splashScreen) {
            splashScreen.classList.remove('hidden');
            splashScreen.classList.add('active-screen');
        }
        initPravaahSplashAnimation();
    }

    /* =========================================================
       PRAVAAH 3D HOLOGRAM GLITCH SCANNER INTRO (PURE BLACK BACKGROUND)
       (Tier 1 Opener -> Then First Page of Website -> Then Home Page)
       ========================================================= */
    let introDismissed = false;

    function proceedToFirstPage() {
        if (introDismissed) return;
        introDismissed = true;
        const intro = document.getElementById('pravaah-intro-screen');
        if (intro) {
            intro.classList.add('intro-fade-out');
            setTimeout(() => {
                intro.classList.add('hidden');
                stopPravaahSplashAnimation();
                if (window.resizeHeroWarp) {
                    window.resizeHeroWarp();
                }
            }, 500);
        }
        const heroSection = document.getElementById('splash-screen');
        if (heroSection) {
            heroSection.classList.add('hero-active-revealed');
        }
    }
    window.proceedToFirstPage = proceedToFirstPage;

    function stopPravaahSplashAnimation() {
        if (splashAnimFrameId) {
            cancelAnimationFrame(splashAnimFrameId);
            splashAnimFrameId = null;
        }
        if (cyberAudioInstance && cyberAudioInstance.ctx && cyberAudioInstance.ctx.state !== 'closed') {
            try {
                cyberAudioInstance.ctx.suspend();
            } catch (err) {}
        }
    }

    function initPravaahSplashAnimation() {
        if (portalHasEntered) return;

        const splashCanvas = document.getElementById('pravaah-glitch-canvas');
        if (!splashCanvas) return;

        const ctx = splashCanvas.getContext('2d');
        const offCanvas = document.createElement('canvas');
        const offCtx = offCanvas.getContext('2d');
        const mosaicCanvas = document.createElement('canvas');
        const mosaicCtx = mosaicCanvas.getContext('2d');

        // Web Audio Synthesizer (No external mp3 dependencies)
        class CyberAudio {
            constructor() {
                this.ctx = null;
                this.enabled = false;
                this.masterGain = null;
            }

            init() {
                if (this.ctx) {
                    if (this.ctx.state === 'suspended') this.ctx.resume();
                    return;
                }
                try {
                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                    this.ctx = new AudioContext();
                    this.masterGain = this.ctx.createGain();
                    this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
                    this.masterGain.connect(this.ctx.destination);
                } catch (e) {}
            }

            toggle() {
                this.init();
                this.enabled = !this.enabled;
                if (this.masterGain && this.ctx) {
                    this.masterGain.gain.setValueAtTime(this.enabled ? 0.35 : 0, this.ctx.currentTime);
                }
                return this.enabled;
            }

            playGlitchCrunch() {
                if (!this.enabled || !this.ctx) return;
                try {
                    const now = this.ctx.currentTime;
                    const bufferSize = Math.floor(this.ctx.sampleRate * 0.07);
                    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
                    const data = buffer.getChannelData(0);
                    for (let i = 0; i < bufferSize; i++) {
                        data[i] = (Math.random() * 2 - 1) * 0.35;
                    }
                    const noise = this.ctx.createBufferSource();
                    noise.buffer = buffer;

                    const filter = this.ctx.createBiquadFilter();
                    filter.type = 'bandpass';
                    filter.frequency.setValueAtTime(1400 + Math.random() * 2200, now);
                    filter.Q.setValueAtTime(3.5, now);

                    const gain = this.ctx.createGain();
                    gain.gain.setValueAtTime(0.2, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

                    noise.connect(filter);
                    filter.connect(gain);
                    gain.connect(this.masterGain);
                    noise.start(now);
                } catch (e) {}
            }

            playScanLaser(progress) {
                if (!this.enabled || !this.ctx) return;
                if (Math.random() > 0.4) return;
                try {
                    const now = this.ctx.currentTime;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();

                    osc.type = 'sawtooth';
                    const startFreq = 260 + progress * 550;
                    osc.frequency.setValueAtTime(startFreq, now);
                    osc.frequency.exponentialRampToValueAtTime(startFreq * 1.5, now + 0.05);

                    gain.gain.setValueAtTime(0.06, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

                    osc.connect(gain);
                    gain.connect(this.masterGain);
                    osc.start(now);
                    osc.stop(now + 0.05);
                } catch (e) {}
            }

            playImpactBoom() {
                if (!this.enabled || !this.ctx) return;
                try {
                    const now = this.ctx.currentTime;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();

                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(130, now);
                    osc.frequency.exponentialRampToValueAtTime(32, now + 0.8);

                    gain.gain.setValueAtTime(0.48, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

                    osc.connect(gain);
                    gain.connect(this.masterGain);
                    osc.start(now);
                    osc.stop(now + 0.8);

                    this.playChime();
                } catch (e) {}
            }

            playChime() {
                if (!this.enabled || !this.ctx) return;
                try {
                    const now = this.ctx.currentTime;
                    const freqs = [880, 1108, 1320, 1760];
                    freqs.forEach((f, idx) => {
                        const osc = this.ctx.createOscillator();
                        const gain = this.ctx.createGain();
                        osc.type = 'triangle';
                        osc.frequency.setValueAtTime(f, now + idx * 0.06);

                        gain.gain.setValueAtTime(0.08, now + idx * 0.06);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.9);

                        osc.connect(gain);
                        gain.connect(this.masterGain);
                        osc.start(now + idx * 0.06);
                        osc.stop(now + idx * 0.06 + 0.9);
                    });
                } catch (e) {}
            }
        }

        const audio = new CyberAudio();
        cyberAudioInstance = audio;

        class SparkParticle {
            constructor(x, y, vx, vy, size, color, life) {
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.size = size;
                this.color = color;
                this.life = life;
                this.maxLife = life;
                this.alpha = 1;
            }
            update(dt) {
                this.x += this.vx * dt * 60;
                this.y += this.vy * dt * 60;
                this.vy += 0.02;
                this.life -= dt;
                this.alpha = Math.max(0, this.life / this.maxLife);
            }
            draw(targetCtx) {
                if (this.alpha <= 0) return;
                targetCtx.save();
                targetCtx.globalAlpha = this.alpha;
                targetCtx.fillStyle = this.color;
                targetCtx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
                targetCtx.restore();
            }
        }

        const state = {
            currentLogo: 'gold',
            isPlaying: true,
            isLooping: true,
            time: 0,
            duration: 1.8,
            scanStart: 0.1,
            scanEnd: 1.4,
            sheenStart: 1.42,
            sheenEnd: 1.78,
            speed: 1.0,
            hasPlayedBoom: false,
            targetTiltX: 0,
            targetTiltY: 0,
            currentTiltX: 0,
            currentTiltY: 0,
            particles: [],
            images: {},
            imagesLoaded: false
        };

        const imageSources = {
            gold: 'assets/videos/pravaah animation/pravaah_gold.png',
            edges: 'assets/videos/pravaah animation/pravaah_edges.png',
            cyan2d: 'assets/videos/pravaah animation/pravaah_2d_cyan.png',
            gold2d: 'assets/videos/pravaah animation/pravaah_2d_gold.png'
        };

        let loadedCount = 0;
        const totalImages = Object.keys(imageSources).length;
        for (const key in imageSources) {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                state.images[key] = img;
                if (loadedCount === totalImages) {
                    state.imagesLoaded = true;
                }
            };
            img.src = imageSources[key];
        }

        function spawnScanSparks(x, y, count, color) {
            for (let i = 0; i < count; i++) {
                const angle = (Math.random() * Math.PI) + Math.PI;
                const speed = 0.8 + Math.random() * 3.5;
                const vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 2;
                const vy = Math.sin(angle) * speed * 0.8;
                const size = 1.5 + Math.random() * 3.5;
                const life = 0.4 + Math.random() * 0.6;
                state.particles.push(new SparkParticle(x + (Math.random() - 0.5) * 40, y, vx, vy, size, color, life));
            }
            if (state.particles.length > 250) {
                state.particles.splice(0, state.particles.length - 250);
            }
        }

        const ambientDust = [];
        for (let i = 0; i < 40; i++) {
            ambientDust.push({
                x: Math.random(),
                y: Math.random(),
                vx: (Math.random() - 0.5) * 0.0003,
                vy: -0.0002 - Math.random() * 0.0004,
                size: 1 + Math.random() * 2.2,
                alpha: 0.15 + Math.random() * 0.45,
                hue: Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(255, 215, 0, '
            });
        }

        let viewW = 0;
        let viewH = 0;

        function resize() {
            if (portalHasEntered) return;
            const rect = splashCanvas.getBoundingClientRect();
            viewW = rect.width || window.innerWidth;
            viewH = rect.height || window.innerHeight;
            splashCanvas.width = viewW;
            splashCanvas.height = viewH;
        }
        window.addEventListener('resize', resize);
        resize();

        window.addEventListener('mousemove', (e) => {
            if (portalHasEntered) return;
            state.targetTiltX = (e.clientX - viewW / 2) / (viewW / 2) * 12;
            state.targetTiltY = (e.clientY - viewH / 2) / (viewH / 2) * 8;
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (portalHasEntered || !e.touches[0]) return;
            state.targetTiltX = (e.touches[0].clientX - viewW / 2) / (viewW / 2) * 12;
            state.targetTiltY = (e.touches[0].clientY - viewH / 2) / (viewH / 2) * 8;
        }, { passive: true });

        // Clicking canvas or bottom prompt proceeds to First Page of Website
        splashCanvas.addEventListener('click', (e) => {
            e.preventDefault();
            proceedToFirstPage();
        });

        const introPrompt = document.getElementById('intro-proceed-prompt');
        if (introPrompt) {
            introPrompt.addEventListener('click', (e) => {
                e.preventDefault();
                proceedToFirstPage();
            });
        }

        const introScreenEl = document.getElementById('pravaah-intro-screen');
        if (introScreenEl) {
            introScreenEl.addEventListener('click', (e) => {
                if (e.target.closest('.intro-top-controls')) return;
                proceedToFirstPage();
            });
        }

        // Top sound toggle
        const splashSoundBtn = document.getElementById('splash-sound-btn');
        const splashSoundText = document.getElementById('splash-sound-text');
        const soundIconOff = document.querySelector('.splash-sound-icon-off');
        const soundIconOn = document.querySelector('.splash-sound-icon-on');
        if (splashSoundBtn) {
            splashSoundBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const enabled = audio.toggle();
                if (splashSoundText) splashSoundText.textContent = enabled ? 'SOUND ON' : 'SOUND OFF';
                if (soundIconOff) soundIconOff.style.display = enabled ? 'none' : 'block';
                if (soundIconOn) soundIconOn.style.display = enabled ? 'block' : 'none';
            });
        }

        // Replay button
        const splashReplayBtn = document.getElementById('splash-replay-btn');
        if (splashReplayBtn) {
            splashReplayBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                state.time = 0;
                state.isPlaying = true;
                state.hasPlayedBoom = false;
                introDismissed = false;
                if (introScreenEl) {
                    introScreenEl.classList.remove('intro-fade-out', 'hidden');
                }
                audio.init();
            });
        }

        // Skip to first page of website
        const splashSkipBtn = document.getElementById('splash-skip-btn');
        if (splashSkipBtn) {
            splashSkipBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                proceedToFirstPage();
            });
        }

        function renderWetFloorReflection(logoX, logoY, logoW, logoH, horizonY) {
            ctx.save();
            const floorH = viewH - horizonY;
            if (floorH <= 0) {
                ctx.restore();
                return;
            }

            const floorGrad = ctx.createLinearGradient(0, horizonY, 0, viewH);
            floorGrad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
            floorGrad.addColorStop(0.35, 'rgba(0, 0, 0, 0.88)');
            floorGrad.addColorStop(1, '#000000');
            ctx.fillStyle = floorGrad;
            ctx.fillRect(0, horizonY, viewW, floorH);

            const reflW = logoW * 1.05;
            const reflH = logoH * 0.65;
            const reflX = logoX - (reflW - logoW) / 2;
            const reflY = horizonY;

            ctx.save();
            ctx.beginPath();
            ctx.rect(0, horizonY, viewW, floorH);
            ctx.clip();

            ctx.translate(reflX + reflW / 2, reflY);
            ctx.scale(1, -1);
            ctx.translate(-(reflX + reflW / 2), -reflY);

            ctx.globalAlpha = 0.28;
            ctx.drawImage(offCanvas, reflX, reflY - reflH, reflW, reflH);
            ctx.restore();

            const horizonLine = ctx.createLinearGradient(viewW * 0.15, horizonY, viewW * 0.85, horizonY);
            horizonLine.addColorStop(0, 'rgba(0, 242, 254, 0)');
            horizonLine.addColorStop(0.5, 'rgba(0, 242, 254, 0.35)');
            horizonLine.addColorStop(1, 'rgba(0, 242, 254, 0)');
            ctx.strokeStyle = horizonLine;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(viewW * 0.15, horizonY);
            ctx.lineTo(viewW * 0.85, horizonY);
            ctx.stroke();

            ctx.restore();
        }

        let lastFrameTime = performance.now();

        function renderSplashGlitch(now) {
            if (portalHasEntered) {
                stopPravaahSplashAnimation();
                return;
            }

            splashAnimFrameId = requestAnimationFrame(renderSplashGlitch);
            const dt = Math.min((now - lastFrameTime) / 1000, 0.1);
            lastFrameTime = now;

            if (state.isPlaying) {
                state.time += dt * state.speed;
                if (state.time >= state.duration) {
                    // Once logo animation finishes, smoothly proceed to the Kairos portal home page (Image 2)
                    state.time = state.duration;
                    state.isPlaying = false;
                    setTimeout(() => {
                        if (!introDismissed) {
                            proceedToFirstPage();
                        }
                    }, 400);
                }
            }

            state.currentTiltX += (state.targetTiltX - state.currentTiltX) * 0.08;
            state.currentTiltY += (state.targetTiltY - state.currentTiltY) * 0.08;

            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, viewW, viewH);
            if (!state.imagesLoaded) return;

            const activeImg = state.images[state.currentLogo] || state.images.gold;
            const edgeImg = state.images.edges;

            const maxLogoW = Math.min(viewW * (viewW < 768 ? 0.84 : 0.58), 460);
            const scale = maxLogoW / activeImg.width;
            const logoW = activeImg.width * scale;
            const logoH = activeImg.height * scale;

            const logoCenterX = viewW / 2 + state.currentTiltX * 1.5;
            const floatOffset = Math.sin(state.time * 2.2) * 4;
            const logoCenterY = (viewH * (viewW < 768 ? 0.38 : 0.40)) + floatOffset + state.currentTiltY * 1.2;

            const logoX = logoCenterX - logoW / 2;
            const logoY = logoCenterY - logoH / 2;
            const horizonY = logoCenterY + logoH * 0.62;

            // Ambient radial halo
            const radialGlow = ctx.createRadialGradient(logoCenterX, logoCenterY, 20, logoCenterX, logoCenterY, logoW * 0.85);
            let glowAlpha = 0.22;
            if (state.time > state.scanStart && state.time < state.scanEnd) {
                glowAlpha = 0.36 + Math.sin(state.time * 25) * 0.1;
                audio.playScanLaser((state.time - state.scanStart) / (state.scanEnd - state.scanStart));
                if (Math.random() < 0.15) audio.playGlitchCrunch();
            } else if (state.time >= state.sheenStart && state.time <= state.sheenEnd) {
                glowAlpha = 0.48;
                if (!state.hasPlayedBoom) {
                    audio.playImpactBoom();
                    state.hasPlayedBoom = true;
                }
            }
            radialGlow.addColorStop(0, `rgba(0, 242, 254, ${glowAlpha})`);
            radialGlow.addColorStop(0.5, `rgba(0, 120, 255, ${glowAlpha * 0.35})`);
            radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = radialGlow;
            ctx.beginPath();
            ctx.arc(logoCenterX, logoCenterY, logoW * 0.9, 0, Math.PI * 2);
            ctx.fill();

            // Ambient cyber dust
            ambientDust.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.y < 0) p.y = 1;
                if (p.x < 0) p.x = 1;
                if (p.x > 1) p.x = 0;
                ctx.fillStyle = p.hue + p.alpha + ')';
                ctx.beginPath();
                ctx.arc(p.x * viewW, p.y * viewH, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            offCanvas.width = activeImg.width;
            offCanvas.height = activeImg.height;
            offCtx.clearRect(0, 0, offCanvas.width, offCanvas.height);

            const natW = activeImg.width;
            const natH = activeImg.height;

            let scanProgress = 0;
            if (state.time < state.scanStart) {
                scanProgress = 0;
            } else if (state.time >= state.scanEnd) {
                scanProgress = 1;
            } else {
                const norm = (state.time - state.scanStart) / (state.scanEnd - state.scanStart);
                scanProgress = norm < 0.5 ? 4 * norm * norm * norm : 1 - Math.pow(-2 * norm + 2, 3) / 2;
            }

            const scanCurrentY = scanProgress * natH;
            const scanBandHeight = 65;

            // Wireframe edges
            if (scanProgress < 1.0) {
                offCtx.save();
                const edgeFlicker = 0.35 + Math.sin(state.time * 30 + Math.random()) * 0.15;
                offCtx.globalAlpha = edgeFlicker;
                offCtx.drawImage(edgeImg, 0, 0);
                offCtx.restore();
            }

            // Revealed Logo portion
            if (scanCurrentY > 0) {
                const revealTopH = Math.max(0, scanCurrentY - scanBandHeight * 0.5);
                if (revealTopH > 0) {
                    offCtx.save();
                    offCtx.beginPath();
                    offCtx.rect(0, 0, natW, revealTopH);
                    offCtx.clip();
                    offCtx.drawImage(activeImg, 0, 0);
                    offCtx.restore();
                }
            }

            // Scan Band Glitch & Laser
            if (scanProgress > 0 && scanProgress < 1.0) {
                const bandTop = Math.max(0, scanCurrentY - scanBandHeight);
                const bandBottom = Math.min(natH, scanCurrentY + scanBandHeight * 0.45);
                const bandH = bandBottom - bandTop;

                if (bandH > 0) {
                    offCtx.save();
                    offCtx.beginPath();
                    offCtx.rect(0, bandTop, natW, bandH);
                    offCtx.clip();

                    const blockSize = 14;
                    const downW = Math.max(1, Math.floor(natW / blockSize));
                    const downH = Math.max(1, Math.floor(bandH / blockSize));
                    mosaicCanvas.width = downW;
                    mosaicCanvas.height = downH;
                    mosaicCtx.imageSmoothingEnabled = false;
                    mosaicCtx.drawImage(activeImg, 0, bandTop, natW, bandH, 0, 0, downW, downH);

                    const chromOffset = Math.round(5 + Math.random() * 8);

                    offCtx.save();
                    offCtx.globalAlpha = 0.7;
                    offCtx.imageSmoothingEnabled = false;
                    offCtx.drawImage(mosaicCanvas, 0, 0, downW, downH, -chromOffset, bandTop, natW, bandH);
                    offCtx.restore();

                    offCtx.save();
                    offCtx.globalAlpha = 0.7;
                    offCtx.imageSmoothingEnabled = false;
                    offCtx.drawImage(mosaicCanvas, 0, 0, downW, downH, chromOffset, bandTop, natW, bandH);
                    offCtx.restore();

                    offCtx.imageSmoothingEnabled = false;
                    offCtx.drawImage(mosaicCanvas, 0, 0, downW, downH, 0, bandTop, natW, bandH);
                    offCtx.imageSmoothingEnabled = true;

                    // Neon Blocks & Sparks
                    const cols = downW;
                    const rows = downH;
                    for (let r = 0; r < rows; r++) {
                        const by = bandTop + r * blockSize;
                        for (let c = 0; c < cols; c++) {
                            const bx = c * blockSize;
                            if (Math.random() < 0.35) {
                                const isCyan = Math.random() < 0.65;
                                offCtx.save();
                                offCtx.fillStyle = isCyan ? '#00f2fe' : '#ffd700';
                                offCtx.fillRect(bx, by, blockSize - 1, blockSize - 1);
                                offCtx.restore();
                                if (Math.random() < 0.08) {
                                    spawnScanSparks(logoX + (bx / natW) * logoW, logoY + (by / natH) * logoH, 1, isCyan ? '#00f2fe' : '#ffd700');
                                }
                            }
                        }
                    }

                    offCtx.restore();

                    // Laser line
                    offCtx.save();
                    const laserGrad = offCtx.createLinearGradient(0, scanCurrentY - 6, 0, scanCurrentY + 6);
                    laserGrad.addColorStop(0, 'rgba(0, 242, 254, 0)');
                    laserGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
                    laserGrad.addColorStop(1, 'rgba(0, 242, 254, 0)');
                    offCtx.fillStyle = laserGrad;
                    offCtx.fillRect(0, scanCurrentY - 4, natW, 8);
                    offCtx.restore();
                }
            }

            // Sheen Sweep
            if (state.time >= state.sheenStart && state.time <= state.sheenEnd) {
                const sheenNorm = (state.time - state.sheenStart) / (state.sheenEnd - state.sheenStart);
                const sheenX = -natW * 0.4 + sheenNorm * (natW * 1.8);
                const sheenWidth = 140;

                offCtx.save();
                offCtx.globalCompositeOperation = 'source-atop';
                const sheenGrad = offCtx.createLinearGradient(sheenX - sheenWidth, 0, sheenX + sheenWidth, natH);
                sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
                sheenGrad.addColorStop(0.4, 'rgba(0, 242, 254, 0.4)');
                sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
                sheenGrad.addColorStop(0.6, 'rgba(255, 215, 0, 0.5)');
                sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                offCtx.fillStyle = sheenGrad;
                offCtx.fillRect(0, 0, natW, natH);
                offCtx.restore();
            }

            // Draw Primary Logo with 3D perspective tilt
            ctx.save();
            ctx.translate(logoCenterX, logoCenterY);
            ctx.transform(
                1, state.currentTiltY * 0.005,
                state.currentTiltX * 0.005, 1,
                0, 0
            );
            ctx.translate(-logoCenterX, -logoCenterY);
            ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
            ctx.shadowBlur = 25;
            ctx.shadowOffsetY = 12;
            ctx.drawImage(offCanvas, logoX, logoY, logoW, logoH);
            ctx.restore();

            // Draw Sparks
            for (let i = state.particles.length - 1; i >= 0; i--) {
                const p = state.particles[i];
                p.update(dt);
                if (p.alpha <= 0) {
                    state.particles.splice(i, 1);
                } else {
                    p.draw(ctx);
                }
            }

            // Reflection on wet floor
            renderWetFloorReflection(logoX, logoY, logoW, logoH, horizonY);
        }

        splashAnimFrameId = requestAnimationFrame(renderSplashGlitch);
    }

    // Configure video element for reliable fast playback
    if (portalVideo) {
        portalVideo.muted = true;
        portalVideo.defaultMuted = true;
        portalVideo.volume = 0;
        portalVideo.defaultPlaybackRate = 1.25;
        portalVideo.playbackRate = 1.25;
        portalVideo.controls = false;
        portalVideo.removeAttribute('controls');
        portalVideo.setAttribute('playsinline', '');
        portalVideo.setAttribute('webkit-playsinline', '');
        portalVideo.preload = 'none';
    }

    // Generate calendar cube in advance so it is ready
    setTimeout(() => {
        generateCalendarCube();
    }, 50);

    let portalSoundMuted = true;
    let portalWarpTimer = null;
    let portalAnimFrameId = null;
    let portalAudioCtx = null;

    function playPortalSFX() {
        if (portalSoundMuted) return;
        try {
            if (!portalAudioCtx) {
                portalAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (portalAudioCtx.state === 'suspended') {
                portalAudioCtx.resume();
            }
            const now = portalAudioCtx.currentTime;

            // 1. High Velocity Hyperspace Rush Drone
            const osc = portalAudioCtx.createOscillator();
            const gain = portalAudioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 1.5);

            const filter = portalAudioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1200, now);
            filter.frequency.exponentialRampToValueAtTime(8000, now + 1.5);

            gain.gain.setValueAtTime(0.35, now);
            gain.gain.linearRampToValueAtTime(0.55, now + 1.3);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(portalAudioCtx.destination);
            osc.start(now);
            osc.stop(now + 1.9);

            // 2. Heavy Sub-Bass Singularity Boom
            const subOsc = portalAudioCtx.createOscillator();
            const subGain = portalAudioCtx.createGain();
            subOsc.type = 'sine';
            subOsc.frequency.setValueAtTime(150, now + 1.5);
            subOsc.frequency.exponentialRampToValueAtTime(30, now + 2.2);

            subGain.gain.setValueAtTime(0, now);
            subGain.gain.setValueAtTime(0.8, now + 1.5);
            subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

            subOsc.connect(subGain);
            subGain.connect(portalAudioCtx.destination);
            subOsc.start(now + 1.5);
            subOsc.stop(now + 2.3);
        } catch (e) {}
    }

    window.launchPortalVideo = launchPortalVideo;
    function launchPortalVideo() {
        if (portalHasEntered || portalPlaybackActive) return;
        stopPravaahSplashAnimation();
        portalPlaybackActive = true;
        flashTriggered = false;

        if (loaderScreen) {
            loaderScreen.classList.remove('hidden', 'fade-out-loader');
            loaderScreen.classList.add('active-screen');
        }

        if (portalFlashOverlay) {
            portalFlashOverlay.classList.remove('active-flash', 'fade-out');
        }

        // Pre-reveal about section in memory so switching has 0 layout recalculation
        revealAboutSectionInstantly();

        const canvas = document.getElementById('portal-warp-canvas');
        if (!canvas) {
            enterUniverse();
            return;
        }

        const ctx = canvas.getContext('2d');
        const stage = document.getElementById('portal-stage');
        const shockwave1 = document.getElementById('portal-shockwave-ring');
        const shockwave2 = document.getElementById('portal-shockwave-ring-2');
        const glitchOverlay = document.getElementById('portal-glitch-overlay');
        const septagonSvg = document.getElementById('portal-septagon-svg');
        const polyGlow = document.getElementById('portal-poly-glow');
        const polyCore = document.getElementById('portal-poly-core');
        const auraGlow = document.getElementById('portal-aura-glow');
        const codeLogoSvg = document.getElementById('portal-code-logo-svg');

        const strokeLeft = document.getElementById('portal-bracket-left');
        const coreLeft = document.getElementById('portal-bracket-left-core');
        const strokeSlash = document.getElementById('portal-slash-center');
        const coreSlash = document.getElementById('portal-slash-center-core');
        const strokeRight = document.getElementById('portal-bracket-right');
        const coreRight = document.getElementById('portal-bracket-right-core');

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let cx = width / 2;
        let cy = height / 2;

        const onResize = () => {
            if (!portalPlaybackActive) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            cx = width / 2;
            cy = height / 2;
        };
        window.addEventListener('resize', onResize);

        // Hardware-accelerated smooth progress bar transition (0% -> 100% in 2.2s)
        if (portalLoaderBar) {
            portalLoaderBar.style.transition = 'none';
            portalLoaderBar.style.width = '0%';
            requestAnimationFrame(() => {
                portalLoaderBar.style.transition = 'width 2.2s linear';
                portalLoaderBar.style.width = '100%';
            });
        }

        // Reset visual elements
        if (codeLogoSvg) codeLogoSvg.classList.remove('revealed');
        if (auraGlow) auraGlow.classList.remove('active');
        if (shockwave1) shockwave1.classList.remove('blast');
        if (shockwave2) shockwave2.classList.remove('blast');
        if (glitchOverlay) glitchOverlay.classList.remove('active');

        if (polyGlow) polyGlow.style.strokeDashoffset = '600';
        if (polyCore) polyCore.style.strokeDashoffset = '600';
        if (septagonSvg) {
            septagonSvg.style.transform = 'scale(0.15) rotate(180deg)';
            septagonSvg.style.opacity = '0';
        }

        [strokeLeft, coreLeft, strokeSlash, coreSlash, strokeRight, coreRight].forEach(el => {
            if (el) el.classList.remove('drawn');
        });

        playPortalSFX();

        const STAR_COUNT = 380;
        const stars = [];
        const COLOR_PALETTE = ['#00f2fe', '#ff007f', '#ff5722', '#ffffff'];

        class WarpStar {
            constructor() {
                this.reset(true);
            }
            reset(initial = false) {
                this.x = (Math.random() - 0.5) * width * 2.2;
                this.y = (Math.random() - 0.5) * height * 2.2;
                this.z = initial ? Math.random() * 2000 : 2000;
                this.pz = this.z;
                const p = Math.random();
                if (p < 0.40) this.colorIdx = 0;
                else if (p < 0.70) this.colorIdx = 1;
                else if (p < 0.88) this.colorIdx = 2;
                else this.colorIdx = 3;
                this.baseSize = Math.random() * 1.8 + 0.8;
            }
            update(speed) {
                this.pz = this.z;
                this.z -= speed;
                if (this.z <= 1) this.reset(false);
            }
        }

        for (let i = 0; i < STAR_COUNT; i++) stars.push(new WarpStar());

        function drawAllStars(speed) {
            for (let i = 0; i < STAR_COUNT; i++) stars[i].update(speed);
            const isStreaking = speed > 10;
            ctx.lineCap = 'round';

            for (let c = 0; c < 4; c++) {
                ctx.beginPath();
                ctx.strokeStyle = COLOR_PALETTE[c];
                ctx.fillStyle = COLOR_PALETTE[c];
                let hasDrawn = false;

                for (let i = 0; i < STAR_COUNT; i++) {
                    const s = stars[i];
                    if (s.colorIdx !== c) continue;
                    const k = 420 / s.z;
                    const px = s.x * k + cx;
                    const py = s.y * k + cy;

                    if (px < -80 || px > width + 80 || py < -80 || py > height + 80) continue;

                    if (isStreaking) {
                        const pk = 420 / s.pz;
                        const ppx = s.x * pk + cx;
                        const ppy = s.y * pk + cy;
                        ctx.moveTo(ppx, ppy);
                        ctx.lineTo(px, py);
                        hasDrawn = true;
                    } else {
                        const size = Math.max(0.7, (1 - s.z / 2000) * s.baseSize);
                        ctx.moveTo(px + size, py);
                        ctx.arc(px, py, size, 0, Math.PI * 2);
                        hasDrawn = true;
                    }
                }

                if (hasDrawn) {
                    if (isStreaking) {
                        ctx.lineWidth = speed > 35 ? 2.2 : 1.5;
                        ctx.stroke();
                    } else {
                        ctx.fill();
                    }
                }
            }
        }

        const RING_COUNT = 14;
        const tunnelRings = [];
        for (let i = 0; i < RING_COUNT; i++) {
            tunnelRings.push({
                z: (i / RING_COUNT) * 1900,
                angle: (i * 0.22)
            });
        }

        function drawSeptagon(ctx, x, y, radius, rotation) {
            ctx.beginPath();
            const sides = 7;
            for (let i = 0; i < sides; i++) {
                const a = rotation + (i * Math.PI * 2 / sides);
                const sx = x + Math.cos(a) * radius;
                const sy = y + Math.sin(a) * radius;
                if (i === 0) ctx.moveTo(sx, sy);
                else ctx.lineTo(sx, sy);
            }
            ctx.closePath();
        }

        let animStartTime = performance.now();
        let warpSpeed = 95;
        let currentPhase = 'fast_warp';
        let globalRotation = 0;
        let frameCount = 0;

        function renderPortalFrame(now) {
            if (!portalPlaybackActive || portalHasEntered) return;
            portalAnimFrameId = requestAnimationFrame(renderPortalFrame);
            frameCount++;

            const elapsed = (now - animStartTime) / 1000;

            // Dark Void Motion Blur
            ctx.fillStyle = warpSpeed > 30 ? 'rgba(3, 0, 20, 0.35)' : 'rgba(3, 0, 20, 0.65)';
            ctx.fillRect(0, 0, width, height);

            if (elapsed < 1.6) {
                currentPhase = 'fast_warp';
                warpSpeed = 95 + Math.sin(elapsed * 4) * 15;
                if (glitchOverlay) {
                    if (frameCount % 12 === 0) glitchOverlay.classList.add('active');
                    else if (frameCount % 6 === 0) glitchOverlay.classList.remove('active');
                }
            } else if (elapsed >= 1.6 && elapsed < 2.0) {
                currentPhase = 'singularity';
                warpSpeed = 35 - ((elapsed - 1.6) / 0.4) * 30;
                if (glitchOverlay) glitchOverlay.classList.add('active');
            } else if (elapsed >= 2.0) {
                // Flash breakout directly into festival home page (About / Get to know our fest)
                if (!flashTriggered) {
                    flashTriggered = true;
                    if (glitchOverlay) glitchOverlay.classList.remove('active');
                    if (portalFlashOverlay) {
                        portalFlashOverlay.classList.add('active-flash');
                    }
                    if (shockwave1 && shockwave2) {
                        shockwave1.classList.remove('blast');
                        shockwave2.classList.remove('blast');
                        requestAnimationFrame(() => {
                            shockwave1.classList.add('blast');
                            shockwave2.classList.add('blast');
                        });
                    }
                    setTimeout(() => {
                        enterUniverse();
                    }, 220);
                }
                return;
            }

            drawAllStars(warpSpeed);

            if (currentPhase === 'fast_warp' || currentPhase === 'singularity') {
                globalRotation += 0.030;
                for (let i = 0; i < tunnelRings.length; i++) {
                    const r = tunnelRings[i];
                    r.z -= warpSpeed * 1.5;
                    if (r.z <= 20) r.z += 1900;
                    const k = 420 / r.z;
                    const radius = 280 * k;

                    if (radius > 1 && radius < width * 1.25) {
                        ctx.lineWidth = Math.max(1, 3.5 * k);
                        if (i % 3 === 0) ctx.strokeStyle = 'rgba(0, 242, 254, 0.55)';
                        else if (i % 3 === 1) ctx.strokeStyle = 'rgba(255, 0, 127, 0.55)';
                        else ctx.strokeStyle = 'rgba(255, 87, 34, 0.55)';
                        drawSeptagon(ctx, cx, cy, radius, r.angle + globalRotation);
                        ctx.stroke();
                    }
                }
            }
        }

        portalAnimFrameId = requestAnimationFrame(renderPortalFrame);

        // Fallback safety timeout (3.5s)
        setTimeout(() => {
            if (portalPlaybackActive && !portalHasEntered) {
                enterUniverse();
            }
        }, 3500);
    }

    function enterUniverse() {
        if (portalHasEntered) return;
        portalHasEntered = true;
        portalPlaybackActive = false;
        stopPravaahSplashAnimation();

        if (portalAnimFrameId) {
            cancelAnimationFrame(portalAnimFrameId);
            portalAnimFrameId = null;
        }

        try {
            sessionStorage.setItem('portalEntered', 'true');
        } catch (e) {}

        if (portalVideo) {
            portalVideo.pause();
            portalVideo.ontimeupdate = null;
            portalVideo.onended = null;
        }

        // Behind the luminous flash, seamlessly switch into the home page
        if (splashScreen) {
            splashScreen.classList.add('hidden');
            splashScreen.classList.remove('active-screen');
        }

        document.body.classList.add('portal-entered');
        document.documentElement.classList.add('portal-entered-fast');

        if (mainScrollContainer) {
            mainScrollContainer.classList.add('scroll-enabled');
        }

        // Land cleanly at the top of the home page (About section)
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (mainScrollContainer) {
            mainScrollContainer.scrollTo({ top: 0, behavior: 'instant' });
        }

        const navWheel = document.getElementById('cosmic-nav-wheel');
        if (navWheel) {
            navWheel.classList.remove('hidden-nav');
            setTimeout(updateNavPill, 100);
        }

        revealAboutSectionInstantly();
        const globalBg = document.getElementById('global-bg-layer');
        if (globalBg) {
            globalBg.style.backgroundImage = "url('assets/images/space_star_bg.jpg')";
        }
        handleParallaxAndNav();

        // Smoothly dissolve flash overlay (650ms cubic-bezier ease-out)
        if (portalFlashOverlay) {
            portalFlashOverlay.classList.add('fade-out');
            setTimeout(() => {
                portalFlashOverlay.classList.remove('active-flash', 'fade-out');
            }, 700);
        }

        // Gracefully fade out the loader screen instead of an abrupt hide
        if (loaderScreen) {
            loaderScreen.classList.add('fade-out-loader');
            setTimeout(() => {
                loaderScreen.classList.remove('active-screen', 'fade-out-loader');
                loaderScreen.classList.add('hidden');
                const portalPravaahFrame = document.getElementById('portal-pravaah-frame');
                if (portalPravaahFrame) {
                    portalPravaahFrame.style.display = 'none';
                }
            }, 360);
        }

        setTimeout(() => {
            generateCalendarCube();
        }, 120);
    }

    // Skip button click listener
    if (portalSkipBtn) {
        portalSkipBtn.addEventListener('click', (e) => {
            e.preventDefault();
            enterUniverse();
        });
    }

    // Sound toggle listener for Pravaah animation
    if (portalAudioBtn) {
        portalAudioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            portalSoundMuted = !portalSoundMuted;
            if (!portalSoundMuted) {
                if (iconSoundOff) iconSoundOff.style.display = 'none';
                if (iconSoundOn) iconSoundOn.style.display = 'block';
                playPortalSFX();
            } else {
                if (iconSoundOff) iconSoundOff.style.display = 'block';
                if (iconSoundOn) iconSoundOn.style.display = 'none';
                if (portalAudioCtx && portalAudioCtx.state !== 'closed') {
                    try { portalAudioCtx.suspend(); } catch (err) {}
                }
            }
        });
    }

    // Keyboard navigation during portal playback
    window.addEventListener('keydown', (e) => {
        if (portalPlaybackActive) {
            if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                enterUniverse();
            }
        }
    });

    /* =========================================================
       NATURAL SMOOTH SCROLL & EXPLORATION NAVIGATION
       ========================================================= */
    function smoothScrollToAbout() {
        const aboutPage = document.getElementById('about-page');
        if (aboutPage) {
            aboutPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function smoothScrollToCalendar() {
        const calPage = document.getElementById('calendar-page');
        if (calPage) {
            calPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    if (portalEntryTrigger) {
        const triggerPortal = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (!introDismissed) {
                proceedToFirstPage();
            }
            if (!portalHasEntered) {
                launchPortalVideo();
            } else {
                smoothScrollToAbout();
            }
        };
        portalEntryTrigger.addEventListener('click', triggerPortal);
        portalEntryTrigger.addEventListener('touchend', (e) => {
            e.preventDefault();
            triggerPortal(e);
        });
        portalEntryTrigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                triggerPortal(e);
            }
        });
    }

    if (enterBtn) {
        enterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!portalHasEntered) {
                launchPortalVideo();
            } else {
                smoothScrollToAbout();
            }
        });
    }

    const septagonPortalBox = document.querySelector('.big-septagon-portal-container');
    if (septagonPortalBox) {
        septagonPortalBox.setAttribute('title', 'Open Pravaah Multiverse Portal');
        septagonPortalBox.style.cursor = 'pointer';
        septagonPortalBox.addEventListener('click', () => {
            if (!portalHasEntered) {
                launchPortalVideo();
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Scroll down on intro or splash triggers progression
    window.addEventListener('wheel', (e) => {
        if (!introDismissed) {
            if (e.deltaY > 15) {
                e.preventDefault();
                proceedToFirstPage();
            }
            return;
        }
        if (!portalHasEntered && !portalPlaybackActive) {
            if (e.deltaY > 15) {
                e.preventDefault();
                launchPortalVideo();
            }
        }
    }, { passive: false });

    // Touch swipe up triggers progression
    let prePortalTouchY = 0;
    const pravaahIntro = document.getElementById('pravaah-intro-screen');
    if (pravaahIntro) {
        pravaahIntro.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches[0]) prePortalTouchY = e.touches[0].clientY;
        }, { passive: true });
        pravaahIntro.addEventListener('touchend', (e) => {
            if (!introDismissed && e.changedTouches && e.changedTouches[0]) {
                const diff = prePortalTouchY - e.changedTouches[0].clientY;
                if (diff > 20 || Math.abs(diff) < 10) {
                    proceedToFirstPage();
                }
            }
        }, { passive: true });
    }

    if (splashScreen) {
        splashScreen.addEventListener('touchstart', (e) => {
            if (!portalHasEntered && e.touches && e.touches[0]) {
                prePortalTouchY = e.touches[0].clientY;
            }
        }, { passive: true });

        splashScreen.addEventListener('touchend', (e) => {
            if (!introDismissed) {
                proceedToFirstPage();
                return;
            }
            if (!portalHasEntered && !portalPlaybackActive && e.changedTouches && e.changedTouches[0]) {
                const diff = prePortalTouchY - e.changedTouches[0].clientY;
                if (diff > 25) {
                    launchPortalVideo();
                }
            }
        }, { passive: true });
    }

    // Slow Smooth Glide Trigger to Calendar
    const guideToCalendarBtn = document.getElementById('guide-to-calendar-btn');
    if (guideToCalendarBtn) {
        guideToCalendarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScrollToCalendar();
        });
        guideToCalendarBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                smoothScrollToCalendar();
            }
        });
    }

    const glitchOverlay = document.getElementById('screen-glitch-overlay');
    function triggerPageGlitch(targetContainer) {
        if (!glitchOverlay) return;

        glitchOverlay.classList.remove('glitch-active');
        void glitchOverlay.offsetWidth;
        glitchOverlay.classList.add('glitch-active');

        const container = targetContainer || document;
        const titlesToGlitch = container.querySelectorAll('.spider-title, .logo-title, .calendar-page-heading, .universe-page-heading, .gallery-page-heading, .about-page-heading, .team-page-heading, [data-text]');

        titlesToGlitch.forEach(title => {
            if (title.id === 'heroTitle' || title.closest('#splash-screen')) return;
            title.classList.remove('spider-glitch-active');
            void title.offsetWidth;
            title.classList.add('spider-glitch-active');
        });

        setTimeout(() => {
            glitchOverlay.classList.remove('glitch-active');
            titlesToGlitch.forEach(title => {
                title.classList.remove('spider-glitch-active');
            });
        }, 220);
    }

    /* =========================================================
       SMOOTH PARALLAX & SECTION REVELATION ENGINE
       ========================================================= */
    function getVisibleSnapSections() {
        return Array.from(document.querySelectorAll('.snap-page')).filter(sec => {
            return sec.offsetParent !== null && window.getComputedStyle(sec).display !== 'none';
        });
    }
    const snapSections = Array.from(document.querySelectorAll('.snap-page'));
    let currentSnapIndex = 0;

    function getScrollPosition() {
        return window.pageYOffset || document.documentElement.scrollTop || (mainScrollContainer ? mainScrollContainer.scrollTop : 0);
    }

    function syncCurrentIndexFromScroll() {
        const sections = getVisibleSnapSections();
        if (sections.length === 0) return;
        const scrollTop = getScrollPosition();
        let closestIndex = 0;
        let minDiff = Infinity;
        sections.forEach((sec, idx) => {
            const secTop = sec.getBoundingClientRect().top + scrollTop;
            const diff = Math.abs(secTop - scrollTop);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = idx;
            }
        });
        currentSnapIndex = closestIndex;
        if (sections[closestIndex] && sections[closestIndex].id === 'calendar-page') {
            sections[closestIndex].classList.add('is-revealed');
        }
    }

    function smoothScrollToSection(index) {
        const sections = getVisibleSnapSections();
        if (sections.length === 0) return;
        index = Math.max(0, Math.min(index, sections.length - 1));
        const targetSec = sections[index];
        if (!targetSec) return;

        currentSnapIndex = index;
        targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetSec.classList.add('is-revealed');
    }

    // Parallax & Dynamic Atmosphere Sync
    function handleParallaxAndNav() {
        const scrollTop = getScrollPosition();
        const viewportH = window.innerHeight;
        const septagonRotator = document.querySelector('.big-septagon-rotator');
        const highlightsPanel = document.querySelector('.splash-highlights-panel');
        const statusPanel = document.querySelector('.splash-status-panel');

        // Hero elements subtle depth floating
        if (scrollTop < viewportH * 1.3) {
            const ratio = scrollTop / viewportH;
            if (septagonRotator) {
                septagonRotator.style.transform = `translateY(${scrollTop * 0.16}px) scale(${Math.max(0.75, 1 - ratio * 0.2)})`;
            }
            if (highlightsPanel) {
                highlightsPanel.style.transform = `translateY(${scrollTop * 0.1}px)`;
            }
            if (statusPanel) {
                statusPanel.style.transform = `translateY(${scrollTop * 0.1}px)`;
            }
        }

        syncCurrentIndexFromScroll();

        // -------------------------------------------------------------
        // ABOUT SECTION REVELATION
        // -------------------------------------------------------------
        const aboutLead = document.getElementById('about-lead-container');
        const aboutGrid = document.getElementById('about-intro-grid');
        const aboutCardPravaah = document.getElementById('about-card-pravaah');
        const aboutCardTheme = document.getElementById('about-card-theme');
        const guideToCal = document.getElementById('guide-to-calendar-btn');

        if (aboutLead) {
            const leadRect = aboutLead.getBoundingClientRect();
            if (leadRect.top < viewportH * 0.92) {
                aboutLead.style.opacity = '1';
                aboutLead.style.transform = 'translateY(0) scale(1)';
                aboutLead.style.filter = 'blur(0px)';
                aboutLead.classList.add('is-centered');
            }
        }

        if (aboutGrid) {
            const gridRect = aboutGrid.getBoundingClientRect();
            if (gridRect.top < viewportH * 0.88) {
                if (aboutCardPravaah) {
                    aboutCardPravaah.style.visibility = 'visible';
                    aboutCardPravaah.style.pointerEvents = 'auto';
                    aboutCardPravaah.style.opacity = '1';
                    aboutCardPravaah.style.filter = 'blur(0px)';
                    aboutCardPravaah.classList.add('is-revealed');
                    if (!aboutCardPravaah.matches(':hover') && !aboutCardPravaah.classList.contains('card-hovered')) {
                        aboutCardPravaah.style.transform = '';
                    }
                }
                if (aboutCardTheme) {
                    aboutCardTheme.style.visibility = 'visible';
                    aboutCardTheme.style.pointerEvents = 'auto';
                    aboutCardTheme.style.opacity = '1';
                    aboutCardTheme.style.filter = 'blur(0px)';
                    aboutCardTheme.classList.add('is-revealed');
                    if (!aboutCardTheme.matches(':hover') && !aboutCardTheme.classList.contains('card-hovered')) {
                        aboutCardTheme.style.transform = '';
                    }
                }
                if (guideToCal) {
                    guideToCal.style.visibility = 'visible';
                    guideToCal.style.pointerEvents = 'auto';
                    guideToCal.style.opacity = '1';
                    guideToCal.style.filter = 'blur(0px)';
                    guideToCal.style.transform = '';
                    guideToCal.classList.add('is-revealed');
                }
            }
        }

        // -------------------------------------------------------------
        // FEST CALENDAR REVELATION
        // -------------------------------------------------------------
        const calHeading = document.getElementById('calendar-heading-container');
        const calLayout = document.getElementById('calendar-layout-container');
        const calPage = document.getElementById('calendar-page');

        if (calHeading) {
            const calRect = calHeading.getBoundingClientRect();
            if (calRect.top < viewportH * 0.88) {
                calHeading.style.opacity = '1';
                calHeading.style.transform = 'translateY(0) scale(1)';
                calHeading.style.filter = 'blur(0px)';
                calHeading.classList.add('is-centered', 'is-revealed');
                if (calPage) calPage.classList.add('is-revealed');
                if (calLayout) {
                    calLayout.style.opacity = '';
                    calLayout.style.transform = '';
                    calLayout.style.filter = '';
                    calLayout.classList.add('is-revealed');
                }
            }
        }

        // -------------------------------------------------------------
        // PHOTO GALLERY REVELATION
        // -------------------------------------------------------------
        const galleryHeading = document.querySelector('#gallery-page .gallery-page-heading') || document.querySelector('.gallery-page-heading');
        const galleryColumnsWrapper = document.getElementById('gallery-columns-wrapper') || document.querySelector('.gallery-columns-wrapper');
        const galleryPage = document.getElementById('gallery-page');

        if (galleryHeading && galleryColumnsWrapper) {
            const headingRect = galleryHeading.getBoundingClientRect();
            if (headingRect.top < viewportH * 0.88) {
                galleryHeading.style.opacity = '1';
                galleryHeading.style.transform = 'translateY(0) scale(1)';
                galleryHeading.style.filter = 'blur(0px)';
                galleryHeading.classList.add('is-centered');
                galleryColumnsWrapper.classList.add('is-revealed');
                if (galleryPage) galleryPage.classList.add('is-revealed');
            }
        }

        // Cosmic nav indicator theme update
        const navItems = Array.from(document.querySelectorAll('.cosmic-nav-wheel .nav-item'));
        const navWheel = document.getElementById('cosmic-nav-wheel');
        if (navItems.length > 0) {
            const sections = [
                { id: 'about-page', theme: 'home' },
                { id: 'calendar-page', theme: 'calendar' },
                { id: 'gallery-page', theme: 'gallery' },
                { id: 'team-page', theme: 'team' }
            ];

            let activeTheme = 'home';
            for (let i = sections.length - 1; i >= 0; i--) {
                const sec = sections[i];
                const el = document.getElementById(sec.id);
                if (el) {
                    const r = el.getBoundingClientRect();
                    if (r.top <= viewportH * 0.5) {
                        activeTheme = sec.theme;
                        break;
                    }
                }
            }

            if (navWheel) {
                navWheel.setAttribute('data-active-theme', activeTheme);
            }
        }
    }

    window.addEventListener('scroll', handleParallaxAndNav, { passive: true });
    window.addEventListener('resize', handleParallaxAndNav, { passive: true });
    if (mainScrollContainer) {
        mainScrollContainer.addEventListener('scroll', handleParallaxAndNav, { passive: true });
    }
    // Initial run to ensure perfect positioning on load
    handleParallaxAndNav();

    // Scroll-Reveal intersection observer for all home page elements
    const revealElements = document.querySelectorAll('.scroll-reveal, .last-page-hero-container, .pravaah-full-footer');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -20px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        revealElements.forEach(el => el.classList.add('is-revealed'));
    }

    // Smooth Home Link click handler
    const homeNavLinks = document.querySelectorAll('a.nav-item[href="index.html"], a.nav-item[href="/"], .nav-wheel-track a:first-child, a.bottom-nav-item[data-nav="home"], a.side-menu-link[data-nav="home"]');
    homeNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const currentPath = window.location.pathname;
            if (currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '') {
                e.preventDefault();
                if (!portalHasEntered) {
                    enterUniverse();
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    if (mainScrollContainer) {
                        mainScrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }
                const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
                const mobileSideMenu = document.getElementById('mobile-side-menu');
                if (mobileSideMenu) {
                    mobileSideMenu.classList.remove('menu-open', 'is-open');
                    mobileSideMenu.setAttribute('aria-hidden', 'true');
                }
                if (mobileMenuBackdrop) {
                    mobileMenuBackdrop.classList.remove('backdrop-active', 'is-open');
                }
                document.body.classList.remove('side-menu-locked');
            }
        });
    });

    function updateNavPill() {
        const activeItem = document.querySelector('.nav-item.active') || document.querySelector('.nav-item[href="index.html"]') || document.querySelector('.nav-item');
        const pill = document.getElementById('nav-indicator-pill');
        const navWheel = document.getElementById('cosmic-nav-wheel');
        if (activeItem && pill && navWheel) {
            pill.style.left = `${activeItem.offsetLeft}px`;
            pill.style.width = `${activeItem.offsetWidth}px`;

            const targetId = activeItem.getAttribute('data-target');
            let theme = "home";
            if (targetId === "about-page") theme = "about";
            else if (targetId === "calendar-page") theme = "calendar";
            else if (targetId === "universe-page") theme = "portals";
            else if (targetId === "gallery-page") theme = "gallery";
            else if (targetId === "team-page") theme = "team";

            navWheel.setAttribute('data-active-theme', theme);
        }
    }

    const calendarEventsData = {
        // March Pravaah Festival Core Events
        "MAR-20": {
            dateStr: "MARCH 20, 2026",
            events: [
                { name: "Robo Soccer", verse: "tech", time: "10:00 AM", venue: "Robotics Bay A", desc: "Autonomous and manual robot soccer matches." },
                { name: "Step Up", verse: "cult", time: "06:00 PM", venue: "Main Arena Gate 1", desc: "Vibrant group street dance battle." },
                { name: "Valorant Showdown", verse: "game", time: "10:00 AM", venue: "Esports Lounge A", desc: "Tactical team esports qualifiers." },
                { name: "Green Horizon", verse: "social", time: "10:00 AM", venue: "Botanical Annex", desc: "Environmental project presentations." }
            ]
        },
        "MAR-21": {
            dateStr: "MARCH 21, 2026",
            events: [
                { name: "Code-A-Thon", verse: "tech", time: "09:00 AM", venue: "Matrix Lab 3", desc: "24-hour algorithmic development sprint." },
                { name: "Symphony", verse: "cult", time: "07:00 PM", venue: "The Amphitheater", desc: "Battle of the cosmic rock bands." },
                { name: "BGMI Arena", verse: "game", time: "11:00 AM", venue: "Esports Lounge B", desc: "Squad survival tournament." },
                { name: "Pitchers", verse: "ent", time: "11:00 AM", venue: "Incubation Incubator", desc: "Venture capitalist pitching panels." }
            ]
        },
        "MAR-22": {
            dateStr: "MARCH 22, 2026",
            events: [
                { name: "AI Odyssey", verse: "tech", time: "11:30 AM", venue: "Neuromorphic Hall", desc: "Design neural network architectures." },
                { name: "Voice of Pravaah", verse: "cult", time: "02:00 PM", venue: "Auditorium Prime", desc: "Solo singing championship." },
                { name: "Crypto Quest", verse: "ent", time: "10:00 AM", venue: "Finance Lab B", desc: "Crypto simulation trading tournament." },
                { name: "Blood Donation Camp", verse: "social", time: "09:00 AM", venue: "Medical Room 1", desc: "Certified health donation drive." }
            ]
        },
        "MAR-23": {
            dateStr: "MARCH 23, 2026",
            events: [
                { name: "Vogue", verse: "cult", time: "08:00 PM", venue: "The Galaxy Runway", desc: "Cyberpunk and eco fashion show." },
                { name: "Shark Tank Junior", verse: "ent", time: "02:00 PM", venue: "Incubation Incubator", desc: "Young student startup presentations." },
                { name: "Nukkad Natak", verse: "social", time: "04:00 PM", venue: "Open Air Stage B", desc: "Social awareness street plays." },
                { name: "Chess Grandmaster", verse: "game", time: "10:00 AM", venue: "Silence Lounge", desc: "Bullet chess tournament." }
            ]
        },
        "20": {
            dateStr: "MARCH 20, 2026",
            events: [
                { name: "Robo Soccer", verse: "tech", time: "10:00 AM", venue: "Robotics Bay A", desc: "Autonomous and manual robot soccer matches." },
                { name: "Step Up", verse: "cult", time: "06:00 PM", venue: "Main Arena Gate 1", desc: "Vibrant group street dance battle." },
                { name: "Valorant Showdown", verse: "game", time: "10:00 AM", venue: "Esports Lounge A", desc: "Tactical team esports qualifiers." },
                { name: "Green Horizon", verse: "social", time: "10:00 AM", venue: "Botanical Annex", desc: "Environmental project presentations." }
            ]
        },
        "21": {
            dateStr: "MARCH 21, 2026",
            events: [
                { name: "Code-A-Thon", verse: "tech", time: "09:00 AM", venue: "Matrix Lab 3", desc: "24-hour algorithmic development sprint." },
                { name: "Symphony", verse: "cult", time: "07:00 PM", venue: "The Amphitheater", desc: "Battle of the cosmic rock bands." },
                { name: "BGMI Arena", verse: "game", time: "11:00 AM", venue: "Esports Lounge B", desc: "Squad survival tournament." },
                { name: "Pitchers", verse: "ent", time: "11:00 AM", venue: "Incubation Incubator", desc: "Venture capitalist pitching panels." }
            ]
        },
        "22": {
            dateStr: "MARCH 22, 2026",
            events: [
                { name: "AI Odyssey", verse: "tech", time: "11:30 AM", venue: "Neuromorphic Hall", desc: "Design neural network architectures." },
                { name: "Voice of Pravaah", verse: "cult", time: "02:00 PM", venue: "Auditorium Prime", desc: "Solo singing championship." },
                { name: "Crypto Quest", verse: "ent", time: "10:00 AM", venue: "Finance Lab B", desc: "Crypto simulation trading tournament." },
                { name: "Blood Donation Camp", verse: "social", time: "09:00 AM", venue: "Medical Room 1", desc: "Certified health donation drive." }
            ]
        },
        "23": {
            dateStr: "MARCH 23, 2026",
            events: [
                { name: "Vogue", verse: "cult", time: "08:00 PM", venue: "The Galaxy Runway", desc: "Cyberpunk and eco fashion show." },
                { name: "Shark Tank Junior", verse: "ent", time: "02:00 PM", venue: "Incubation Incubator", desc: "Young student startup presentations." },
                { name: "Nukkad Natak", verse: "social", time: "04:00 PM", venue: "Open Air Stage B", desc: "Social awareness street plays." },
                { name: "Chess Grandmaster", verse: "game", time: "10:00 AM", venue: "Silence Lounge", desc: "Bullet chess tournament." }
            ]
        },
        // January Nodes
        "JAN-15": {
            dateStr: "JANUARY 15, 2026",
            events: [
                { name: "Portal Pre-Registration", verse: "tech", time: "10:00 AM", venue: "Online Portal", desc: "Early bird registrations and team formation opening for Pravaah 2026." },
                { name: "Cosmic Hackathon Briefing", verse: "ent", time: "04:00 PM", venue: "Virtual Auditorium", desc: "Theme unveilings and track problem statements released." }
            ]
        },
        "JAN-26": {
            dateStr: "JANUARY 26, 2026",
            events: [
                { name: "Republic Day Cultural Unveil", verse: "cult", time: "09:00 AM", venue: "Main Amphitheater", desc: "Flag hoisting & teaser screening for Pravaah 2026 themes." }
            ]
        },
        // February Nodes
        "FEB-14": {
            dateStr: "FEBRUARY 14, 2026",
            events: [
                { name: "Band Auditions Prelims", verse: "cult", time: "02:00 PM", venue: "Music Studio 1", desc: "Shortlisting bands for Symphony rock showdown." },
                { name: "Robotics Workshop", verse: "tech", time: "11:00 AM", venue: "Maker Space", desc: "Hands-on bot assembly and microcontroller programming." }
            ]
        },
        "FEB-28": {
            dateStr: "FEBRUARY 28, 2026",
            events: [
                { name: "National Science Day Expo", verse: "tech", time: "10:00 AM", venue: "Innovation Deck", desc: "Student research projects and autonomous systems showcase." }
            ]
        },
        // April Nodes
        "APR-10": {
            dateStr: "APRIL 10, 2026",
            events: [
                { name: "Post-Fest Innovation Demo", verse: "tech", time: "11:00 AM", venue: "Incubation Center", desc: "Demonstrations of top projects developed during Code-A-Thon." }
            ]
        },
        "APR-25": {
            dateStr: "APRIL 25, 2026",
            events: [
                { name: "Cosmic Esports Finals", verse: "game", time: "03:00 PM", venue: "Esports Arena", desc: "Inter-college league championships." }
            ]
        },
        // May Nodes
        "MAY-8": {
            dateStr: "MAY 08, 2026",
            events: [
                { name: "Summer Dev Bootcamp Kickoff", verse: "tech", time: "10:00 AM", venue: "Matrix Lab 1", desc: "Full-stack and AI internship preparation program." }
            ]
        },
        "MAY-20": {
            dateStr: "MAY 20, 2026",
            events: [
                { name: "Multiverse Startup Pitch", verse: "ent", time: "02:00 PM", venue: "Auditorium Prime", desc: "Angel investor demo day for student entrepreneurs." }
            ]
        },
        // June Nodes
        "JUN-15": {
            dateStr: "JUNE 15, 2026",
            events: [
                { name: "Pravaah Star Awards", verse: "cult", time: "06:00 PM", venue: "Grand Ballroom", desc: "Annual award ceremony honoring outstanding organizers & participants." }
            ]
        }
    };

    const calendarMonths = [
        { name: "JANUARY 2026", code: "JAN", days: 31, startDay: 4, monthNum: 0, element: faceJan, activeDays: [15, 26] },
        { name: "FEBRUARY 2026", code: "FEB", days: 28, startDay: 0, monthNum: 1, element: faceFeb, activeDays: [14, 28] },
        { name: "MARCH 2026", code: "MAR", days: 31, startDay: 0, monthNum: 2, element: faceMar, activeDays: [20, 21, 22, 23] },
        { name: "APRIL 2026", code: "APR", days: 30, startDay: 3, monthNum: 3, element: faceApr, activeDays: [10, 25] },
        { name: "MAY 2026", code: "MAY", days: 31, startDay: 5, monthNum: 4, element: faceMay, activeDays: [8, 20] },
        { name: "JUNE 2026", code: "JUN", days: 30, startDay: 1, monthNum: 5, element: faceJun, activeDays: [15] }
    ];

    let currentStep = 0;
    let currentMonthIndex = 0;

    function getCubeTransformForStep(step) {
        const cycle = Math.floor(step / 6);
        const pos = ((step % 6) + 6) % 6;
        const baseRotY = cycle * -360;

        switch (pos) {
            case 0: // JAN (Front)
                return `rotateX(0deg) rotateY(${baseRotY}deg)`;
            case 1: // FEB (Right)
                return `rotateX(0deg) rotateY(${baseRotY - 90}deg)`;
            case 2: // MAR (Back)
                return `rotateX(0deg) rotateY(${baseRotY - 180}deg)`;
            case 3: // APR (Left)
                return `rotateX(0deg) rotateY(${baseRotY - 270}deg)`;
            case 4: // MAY (Top)
                return `rotateX(-90deg) rotateY(${baseRotY - 360}deg)`;
            case 5: // JUN (Bottom)
                return `rotateX(90deg) rotateY(${baseRotY - 360}deg)`;
            default:
                return `rotateX(0deg) rotateY(${baseRotY}deg)`;
        }
    }

    function focusMonthByStep(step) {
        currentStep = step;
        currentMonthIndex = ((currentStep % 6) + 6) % 6;

        if (calendarCube) {
            calendarCube.style.transform = getCubeTransformForStep(currentStep);
        }

        // Highlight focused face and dim non-focused
        calendarMonths.forEach((m, idx) => {
            if (m.element) {
                if (idx === currentMonthIndex) {
                    m.element.classList.add('is-focused');
                } else {
                    m.element.classList.remove('is-focused');
                }
            }
        });

        // Highlight active month pill
        const pills = document.querySelectorAll('.month-pill');
        pills.forEach((pill, idx) => {
            if (idx === currentMonthIndex) {
                pill.classList.add('active-pill');
            } else {
                pill.classList.remove('active-pill');
            }
        });

        // Update button tooltips / accessibility
        const prevIdx = ((currentMonthIndex - 1) % 6 + 6) % 6;
        const nextIdx = (currentMonthIndex + 1) % 6;
        if (cubeBtnPrev) {
            cubeBtnPrev.setAttribute('title', `Rotate to ${calendarMonths[prevIdx].code} 2026`);
        }
        if (cubeBtnNext) {
            cubeBtnNext.setAttribute('title', `Rotate to ${calendarMonths[nextIdx].code} 2026`);
        }
    }

    function focusMonth(targetIndex) {
        let delta = targetIndex - currentMonthIndex;
        if (delta > 3) delta -= 6;
        if (delta < -3) delta += 6;
        focusMonthByStep(currentStep + delta);
    }

    function generateCalendarCube() {
        calendarMonths.forEach((m, mIdx) => {
            const container = m.element;
            if (!container) return;
            container.innerHTML = '';

            const module = document.createElement('div');
            module.className = `month-module module-${m.code.toLowerCase()}`;

            const title = document.createElement('div');
            title.className = `month-title title-${m.code.toLowerCase()}`;
            title.textContent = m.name;
            module.appendChild(title);

            const dayNames = document.createElement('div');
            dayNames.className = 'day-names';
            const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            weekDays.forEach(wd => {
                const span = document.createElement('span');
                span.textContent = wd;
                dayNames.appendChild(span);
            });
            module.appendChild(dayNames);

            const daysGrid = document.createElement('div');
            daysGrid.className = 'days-grid';

            for (let i = 0; i < m.startDay; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.className = 'calendar-day empty-day';
                daysGrid.appendChild(emptyCell);
            }

            for (let d = 1; d <= m.days; d++) {
                const dayCell = document.createElement('div');
                dayCell.className = 'calendar-day';
                dayCell.textContent = d;

                const hasActiveEvent = m.activeDays && m.activeDays.includes(d);
                if (hasActiveEvent) {
                    dayCell.classList.add('active-node', `node-${m.code.toLowerCase()}`);
                }

                dayCell.addEventListener('click', (e) => {
                    e.stopPropagation();

                    // Focus the month if not already focused
                    if (currentMonthIndex !== mIdx) {
                        focusMonth(mIdx);
                    }

                    document.querySelectorAll('.calendar-day').forEach(cell => {
                        cell.classList.remove('selected');
                    });
                    dayCell.classList.add('selected');

                    const monthEventKey = `${m.code}-${d}`;
                    if (calendarEventsData[monthEventKey]) {
                        loadDailyEvents(monthEventKey);
                    } else if (m.code === 'MAR' && calendarEventsData[d.toString()]) {
                        loadDailyEvents(d.toString());
                    } else {
                        loadEmptyEvents(`${d} ${m.name}`);
                    }

                    calendarCubeViewport.classList.add('cube-collapsed');
                    dayEventsPanel.classList.add('panel-visible');
                    backToCubeBtn.classList.remove('hidden-btn');
                });

                daysGrid.appendChild(dayCell);
            }

            module.appendChild(daysGrid);
            container.appendChild(module);
        });

        setupCubeControls();
        focusMonthByStep(0); // Focus January by default
    }

    let cubeControlsInitialized = false;
    function setupCubeControls() {
        if (cubeControlsInitialized) return;
        cubeControlsInitialized = true;
        if (cubeBtnPrev) {
            cubeBtnPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                focusMonthByStep(currentStep - 1);
            });
        }

        if (cubeBtnNext) {
            cubeBtnNext.addEventListener('click', (e) => {
                e.stopPropagation();
                focusMonthByStep(currentStep + 1);
            });
        }

        const pills = document.querySelectorAll('.month-pill');
        pills.forEach((pill) => {
            pill.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetIdx = parseInt(pill.getAttribute('data-month-index'), 10);
                if (!isNaN(targetIdx)) {
                    focusMonth(targetIdx);
                }
            });
        });

        // Allow clicking on any cube face to bring it to focus
        calendarMonths.forEach((m, idx) => {
            if (m.element) {
                m.element.addEventListener('click', () => {
                    if (currentMonthIndex !== idx) {
                        focusMonth(idx);
                    }
                });
            }
        });

        // Keyboard navigation for cube
        window.addEventListener('keydown', (e) => {
            if (calendarCubeViewport && !calendarCubeViewport.classList.contains('cube-collapsed')) {
                if (e.key === 'ArrowLeft') {
                    focusMonthByStep(currentStep - 1);
                } else if (e.key === 'ArrowRight') {
                    focusMonthByStep(currentStep + 1);
                }
            }
        });

        // Touch swipe support for calendar cube rotation on phones
        let cubeTouchStartX = 0;
        let cubeTouchStartY = 0;
        if (calendarCubeViewport) {
            calendarCubeViewport.addEventListener('touchstart', (e) => {
                if (e.touches && e.touches[0]) {
                    cubeTouchStartX = e.touches[0].clientX;
                    cubeTouchStartY = e.touches[0].clientY;
                }
            }, { passive: true });

            calendarCubeViewport.addEventListener('touchend', (e) => {
                if (e.changedTouches && e.changedTouches[0] && !calendarCubeViewport.classList.contains('cube-collapsed')) {
                    const diffX = e.changedTouches[0].clientX - cubeTouchStartX;
                    const diffY = e.changedTouches[0].clientY - cubeTouchStartY;
                    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
                        if (diffX < 0) {
                            focusMonthByStep(currentStep + 1);
                        } else {
                            focusMonthByStep(currentStep - 1);
                        }
                    }
                }
            }, { passive: true });
        }
    }

    backToCubeBtn.addEventListener('click', () => {
        calendarCubeViewport.classList.remove('cube-collapsed');
        dayEventsPanel.classList.remove('panel-visible');
        backToCubeBtn.classList.add('hidden-btn');

        document.querySelectorAll('.calendar-day').forEach(cell => {
            cell.classList.remove('selected');
        });

        setTimeout(() => {
            calendarPanelTitle.textContent = "SELECT A TEMPORAL NODE";
            calendarPanelDate.textContent = "No cycle loaded";
            calendarEventsList.innerHTML = `
                <div class="no-events-prompt">Click a highlighted day grid cell to query local verse event timelines.</div>
            `;
            // Keep the current focused month intact
            focusMonth(currentMonthIndex);
        }, 300);
    });

    function loadDailyEvents(dayKey) {
        const data = calendarEventsData[dayKey];
        if (!data) return;

        calendarPanelTitle.textContent = "TEMPORAL NODE QUERY";
        calendarPanelTitle.style.color = "var(--tech-color)";
        calendarPanelDate.textContent = data.dateStr;
        calendarEventsList.innerHTML = '';

        data.events.forEach(evt => {
            const card = document.createElement('div');
            card.className = 'calendar-event-card';

            let badgeClass = 'badge-tech';
            let verseLabel = 'TECH';
            let verseColor = 'var(--tech-color)';
            if (evt.verse === 'cult') { badgeClass = 'badge-cult'; verseLabel = 'CULT'; verseColor = 'var(--cult-color)'; }
            else if (evt.verse === 'game') { badgeClass = 'badge-game'; verseLabel = 'GAME'; verseColor = 'var(--game-color)'; }
            else if (evt.verse === 'ent') { badgeClass = 'badge-ent'; verseLabel = 'ENT'; verseColor = 'var(--ent-color)'; }
            else if (evt.verse === 'social') { badgeClass = 'badge-social'; verseLabel = 'SOCIAL'; verseColor = 'var(--social-color)'; }

            const regUrl = getRegistrationLink(evt.name);

            card.innerHTML = `
                <div class="calendar-card-header">
                    <h4 class="calendar-event-title">${evt.name}</h4>
                    <span class="calendar-event-time">${evt.time}</span>
                </div>
                <p>${evt.desc}</p>
                <div class="calendar-card-footer">
                    <span class="calendar-venue">Venue: ${evt.venue}</span>
                    <span class="verse-tag ${badgeClass}">${verseLabel}</span>
                </div>
                <a href="${regUrl}" target="_blank" class="register-btn-link" style="border-color: rgba(${hexToRgb(verseColor)}, 0.4); margin-top: 5px;">REGISTER NOW</a>
            `;

            const link = card.querySelector('.register-btn-link');
            link.addEventListener('click', (e) => {
                showToast(evt.name, verseColor);
            });

            link.addEventListener('mouseenter', () => {
                link.style.backgroundColor = verseColor;
                link.style.color = '#000000';
            });
            link.addEventListener('mouseleave', () => {
                link.style.backgroundColor = 'rgba(255,255,255,0.05)';
                link.style.color = '#ffffff';
            });

            card.style.borderColor = `rgba(${hexToRgb(verseColor)}, 0.15)`;
            card.addEventListener('mouseenter', () => {
                card.style.borderColor = verseColor;
                card.style.boxShadow = `0 4px 20px rgba(${hexToRgb(verseColor)}, 0.18)`;
                card.style.background = `rgba(${hexToRgb(verseColor)}, 0.02)`;
                card.style.transform = 'translateX(3px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                card.style.boxShadow = 'none';
                card.style.background = 'rgba(255, 255, 255, 0.02)';
                card.style.transform = 'none';
            });

            calendarEventsList.appendChild(card);
        });
    }

    function loadEmptyEvents(dateLabel) {
        calendarPanelTitle.textContent = "NODE INACTIVE";
        calendarPanelTitle.style.color = "var(--text-muted)";
        calendarPanelDate.textContent = dateLabel;
        calendarEventsList.innerHTML = `
            <div class="no-events-prompt">
                No dimensional events active on this cycle.
                <br><br>
                <span style="color: var(--tech-color)">Query active nodes (March 20 - 23)</span> in the March Chrono Grid.
            </div>
        `;
    }

    function openEventDetailModal(evt, verseKey) {
        const verse = verseData[verseKey];
        if (!verse) return;

        modalVerseBadge.textContent = verse.badge;
        modalVerseBadge.style.color = verse.color;
        modalVerseBadge.style.borderColor = verse.color;
        modalVerseTitle.textContent = evt.name;
        modalVerseDesc.textContent = `${verse.title} // DETAILED BRIEF`;

        document.querySelector('.modal-glow-back').style.background = `radial-gradient(circle, ${verse.glow} 0%, transparent 70%)`;
        document.querySelector('.modal-container').style.borderColor = `rgba(${hexToRgb(verse.color)}, 0.25)`;

        eventsGrid.innerHTML = '';
        const card = document.createElement('div');
        card.className = 'event-card';
        const regUrl = getRegistrationLink(evt.name);

        card.innerHTML = `
            <div class="event-header">
                <div class="event-icon-box" style="color: ${verse.color}">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                        <polyline points="12 22 12 12 22 8.5"></polyline>
                        <polyline points="12 12 2 8.5"></polyline>
                    </svg>
                </div>
                <div class="event-meta">
                    <div>Schedule: ${evt.date}</div>
                </div>
            </div>
            <div>
                <h3 class="event-name" style="color: ${verse.color}">${evt.name}</h3>
                <p class="event-desc" style="font-size: 0.85rem; line-height: 1.6; margin-top: 10px;">${evt.desc}</p>
            </div>
            <div class="event-info-row" style="margin-top: 15px;">
                <span>Venue: ${evt.venue}</span>
                <span>Entry Pass: Verified</span>
            </div>
            <a href="${regUrl}" target="_blank" class="register-btn-link" style="border-color: rgba(${hexToRgb(verse.color)}, 0.4); margin-top: 10px;">REGISTER NOW</a>
        `;

        const link = card.querySelector('.register-btn-link');
        link.addEventListener('click', (e) => {
            showToast(evt.name, verse.color);
        });

        link.addEventListener('mouseenter', () => {
            link.style.backgroundColor = verse.color;
            link.style.color = '#000000';
            link.style.boxShadow = `0 0 15px ${verse.glow}`;
        });
        link.addEventListener('mouseleave', () => {
            link.style.backgroundColor = 'rgba(255,255,255,0.05)';
            link.style.color = '#ffffff';
            link.style.boxShadow = 'none';
        });

        card.style.borderColor = `rgba(${hexToRgb(verse.color)}, 0.15)`;
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = verse.color;
            card.style.boxShadow = `0 4px 20px rgba(${hexToRgb(verse.color)}, 0.18)`;
            card.style.background = `rgba(${hexToRgb(verse.color)}, 0.015)`;
            card.style.transform = 'translateY(-2px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'rgba(255, 255, 255, 0.04)';
            card.style.boxShadow = 'none';
            card.style.background = 'rgba(255, 255, 255, 0.02)';
            card.style.transform = 'none';
        });

        eventsGrid.appendChild(card);

        if (canvas) canvas.classList.add('blur-background');
        eventModal.classList.remove('hidden');
        setTimeout(() => {
            eventModal.classList.add('active-modal');
        }, 50);
    }

    function closeModal() {
        eventModal.classList.remove('active-modal');
        if (canvas) canvas.classList.remove('blur-background');

        setTimeout(() => {
            eventModal.classList.add('hidden');
        }, 400);
    }

    closeModalBtn.addEventListener('click', closeModal);

    eventModal.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            closeModal();
        }
    });

    let toastTimeout;
    function showToast(eventName, color) {
        clearTimeout(toastTimeout);

        toast.querySelector('.toast-icon').style.color = color;
        toast.style.borderColor = `rgba(${hexToRgb(color)}, 0.5)`;
        toast.querySelector('.toast-msg').textContent = `Opening registration portal for ${eventName}...`;

        toast.classList.remove('toast-hidden');
        toast.classList.add('toast-visible');

        toastTimeout = setTimeout(() => {
            toast.classList.remove('toast-visible');
            toast.classList.add('toast-hidden');
        }, 3200);
    }

    function hexToRgb(hexVar) {
        if (hexVar.startsWith('var')) {
            const cleanName = hexVar.substring(4, hexVar.length - 1);
            const styleVal = getComputedStyle(document.documentElement).getPropertyValue(cleanName).trim();
            return hexToRgb(styleVal);
        }

        let c = hexVar.replace('#', '');
        if (c.length === 3) {
            c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
        }
        const r = parseInt(c.substring(0, 2), 16);
        const g = parseInt(c.substring(2, 4), 16);
        const b = parseInt(c.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
    }

    const brochureBtn = document.getElementById('brochure-btn');
    if (brochureBtn) {
        brochureBtn.addEventListener('click', () => {
            showToast("Brochure Download Sequence", "var(--ent-color)");
        });
    }

    const portalOrbitWrapper = document.getElementById('portal-orbit-wrapper');
    let isOrbitPaused = false;
    let orbitAngle = 0;
    let activeVerse = null;

    function tickOrbit() {
        if (!portalOrbitWrapper) return;
        if (!isOrbitPaused && eventModal && !eventModal.classList.contains('active-modal')) {
            const speed = activeVerse ? 0.01 : 0.04;
            orbitAngle = (orbitAngle + speed) % 360;
            portalOrbitWrapper.style.transform = `rotate(${orbitAngle}deg)`;
            portalOrbitWrapper.querySelectorAll('.portal-upright-wrapper, .event-upright-wrapper').forEach(child => {
                child.style.transform = `rotate(${-orbitAngle}deg)`;
            });
            requestAnimationFrame(tickOrbit);
        }
    }

    const tickerViewports = document.querySelectorAll('.ticker-viewport');
    tickerViewports.forEach(vp => {
        let scrollInterval;
        const track = vp.querySelector('.ticker-track');
        if (!track) return;

        const scrollSpeed = 38;

        function startAutoScroll() {
            scrollInterval = setInterval(() => {
                vp.scrollTop += 1;
            }, scrollSpeed);
        }

        startAutoScroll();

        vp.addEventListener('scroll', () => {
            const halfHeight = track.scrollHeight / 2;
            if (vp.scrollTop >= halfHeight - 1) {
                vp.scrollTop = vp.scrollTop - halfHeight;
            } else if (vp.scrollTop <= 0) {
                vp.scrollTop = halfHeight;
            }
        });

        vp.addEventListener('mouseenter', () => {
            clearInterval(scrollInterval);
        });

        vp.addEventListener('mouseleave', () => {
            startAutoScroll();
        });
    });

    const galleryGrid = document.getElementById('gallery-grid');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const galleryCards = document.querySelectorAll('.gallery-card');
    const aboutGalleryBtn = document.getElementById('about-gallery-btn');

    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTag = document.getElementById('lightbox-tag');
    const lightboxTitle = document.getElementById('lightbox-title');
    const closeLightboxBtn = document.getElementById('close-lightbox-btn');
    const prevLightboxBtn = document.getElementById('prev-lightbox-btn');
    const nextLightboxBtn = document.getElementById('next-lightbox-btn');

    let currentFilteredCards = [];
    let activeLightboxIdx = 0;

    function updateFilteredCards() {
        const uniqueCards = [];
        const seenSrcs = new Set();

        galleryCards.forEach(card => {
            if (!card.classList.contains('card-dimmed')) {
                const img = card.querySelector('img');
                if (img) {
                    const src = img.src;
                    if (!seenSrcs.has(src)) {
                        seenSrcs.add(src);
                        uniqueCards.push(card);
                    }
                }
            }
        });
        currentFilteredCards = uniqueCards;
    }

    updateFilteredCards();

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            galleryCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('card-dimmed');
                } else {
                    card.classList.add('card-dimmed');
                }
            });

            updateFilteredCards();
        });
    });

    galleryCards.forEach((card) => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            if (img) {
                const src = img.src;
                const idx = currentFilteredCards.findIndex(c => c.querySelector('img').src === src);
                if (idx !== -1) {
                    openLightbox(idx);
                }
            }
        });
    });

    function openLightbox(index) {
        activeLightboxIdx = index;
        const card = currentFilteredCards[index];
        const img = card.querySelector('img');
        const tag = card.querySelector('.gallery-card-tag');
        const title = card.querySelector('.gallery-card-title');

        if (lightboxImg && img) lightboxImg.src = img.src;
        if (lightboxTag && tag) {
            lightboxTag.textContent = tag.textContent;

            const baseClass = tag.className.split(' ').find(c => c.startsWith('tag-'));
            lightboxTag.className = `lightbox-tag ${baseClass || ''}`;
        }
        if (lightboxTitle && title) lightboxTitle.textContent = title.textContent;

        if (lightbox) lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (lightbox) lightbox.classList.add('hidden');
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        if (currentFilteredCards.length === 0) return;
        let newIdx = activeLightboxIdx + direction;
        if (newIdx < 0) newIdx = currentFilteredCards.length - 1;
        if (newIdx >= currentFilteredCards.length) newIdx = 0;
        openLightbox(newIdx);
    }

    if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
    if (prevLightboxBtn) prevLightboxBtn.addEventListener('click', () => navigateLightbox(-1));
    if (nextLightboxBtn) nextLightboxBtn.addEventListener('click', () => navigateLightbox(1));

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });
    }

    if (aboutGalleryBtn) {
        aboutGalleryBtn.addEventListener('click', () => {
            const gallerySec = document.getElementById('gallery-page');
            if (gallerySec) {
                const gIdx = snapSections.indexOf(gallerySec);
                if (gIdx !== -1) {
                    smoothScrollToSection(gIdx, 800);
                } else {
                    gallerySec.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (lightbox && !lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
    });

    document.querySelectorAll('.footer-links-list a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetEl = document.querySelector(href);
                if (targetEl) {
                    e.preventDefault();
                    const sIdx = snapSections.indexOf(targetEl);
                    if (sIdx !== -1) {
                        smoothScrollToSection(sIdx, 800);
                    } else {
                        targetEl.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });
    // Multiverse Live Countdown Timer Engine (Target Date: Oct 15, 2026)
    const daysEl = document.getElementById('cnt-days');
    const hoursEl = document.getElementById('cnt-hours');
    const minsEl = document.getElementById('cnt-mins');
    const secsEl = document.getElementById('cnt-secs');

    if (daysEl && hoursEl && minsEl && secsEl) {
        const targetDate = new Date('2026-10-15T09:00:00+05:30').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const diff = targetDate - now;

            if (diff <= 0) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minsEl.textContent = '00';
                secsEl.textContent = '00';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minsEl.textContent = String(mins).padStart(2, '0');
            secsEl.textContent = String(secs).padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    tickOrbit();

    /* =========================================================
       ABOUT ELEMENTS INTERACTIVE 3D HOVER & MOVEMENT ENGINE
       ========================================================= */
    function initAboutElementsMovementOnHover() {
        const aboutCards = document.querySelectorAll('.about-intro-card');
        aboutCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (card.classList.contains('is-revealed')) {
                    card.classList.add('card-hovered');
                }
            });

            card.addEventListener('mousemove', (e) => {
                if (!card.classList.contains('is-revealed')) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;

                // Dynamic 3D tilt tracking cursor (-8deg to +8deg) + upward lift
                const rotX = ((cy - y) / cy) * 8.0;
                const rotY = ((x - cx) / cx) * 8.0;

                card.style.transform = `perspective(1000px) translateY(-12px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(1.028)`;
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('card-hovered');
                if (card.classList.contains('is-revealed')) {
                    card.style.transform = 'perspective(1000px) translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
                    setTimeout(() => {
                        if (!card.matches(':hover') && card.classList.contains('is-revealed')) {
                            card.style.transform = '';
                        }
                    }, 280);
                }
            });
        });
    }

    initAboutElementsMovementOnHover();

});
