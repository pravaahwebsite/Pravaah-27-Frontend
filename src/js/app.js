document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('starfield-canvas');
    const splashScreen = document.getElementById('splash-screen');
    const loaderScreen = document.getElementById('loader-screen');
    const mainScrollContainer = document.getElementById('main-scroll-container');
    const calendarPage = document.getElementById('calendar-page');
    const universePage = document.getElementById('universe-page');

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

        let mouseX = 0;
        let mouseY = 0;
        let targetMouseX = 0;
        let targetMouseY = 0;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);

        window.addEventListener('mousemove', (e) => {
            targetMouseX = (e.clientX - width / 2) * 0.035;
            targetMouseY = (e.clientY - height / 2) * 0.035;
        });

        const numAmbient = 160;
        const ambientStars = [];
        for (let i = 0; i < numAmbient; i++) {
            ambientStars.push({
                x: Math.random() * 2500,
                y: Math.random() * 1600,
                size: 0.6 + Math.random() * 1.5,
                depth: 0.15 + Math.random() * 0.65,
                twinkle: Math.random() * Math.PI * 2,
                twinkleSpeed: 0.015 + Math.random() * 0.025,
                color: i % 5 === 0 ? 'rgba(0, 210, 255,' : i % 8 === 0 ? 'rgba(230, 38, 120,' : 'rgba(255, 255, 255,'
            });
        }

        const colors = [
            [0, 210, 255],
            [230, 38, 120],
            [255, 42, 75],
            [255, 170, 0],
            [255, 255, 255]
        ];

        const numOrbits = 130;
        const orbitalParticles = [];
        for (let i = 0; i < numOrbits; i++) {
            const c = colors[Math.floor(Math.random() * colors.length)];
            orbitalParticles.push({
                radiusRel: 0.28 + Math.random() * 1.35,
                angle: Math.random() * Math.PI * 2,
                angularSpeed: (0.005 + Math.random() * 0.014) * (Math.random() < 0.15 ? -1 : 1),
                radialAmp: 6 + Math.random() * 18,
                radialFreq: 1.2 + Math.random() * 2.5,
                phase: Math.random() * Math.PI * 2,
                size: 1.1 + Math.random() * 2.0,
                alpha: 0.35 + Math.random() * 0.55,
                color: c,
                trail: []
            });
        }

        const numHex = 28;
        const hexStreamers = [];
        for (let i = 0; i < numHex; i++) {
            const ringScale = 0.55 + (i % 3) * 0.36;
            const c = colors[i % colors.length];
            hexStreamers.push({
                progress: Math.random(),
                speed: 0.0016 + Math.random() * 0.0028,
                ringScale: ringScale,
                color: c,
                size: 1.4 + Math.random() * 1.8,
                trail: []
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
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            ctx.clearRect(0, 0, width, height);

            const portalCx = width * 0.5 + mouseX;
            const portalCy = height * 0.46 + mouseY;
            const baseRadius = Math.min(width, height) * 0.24;

            for (let i = 0; i < numAmbient; i++) {
                const s = ambientStars[i];
                s.twinkle += s.twinkleSpeed;
                const alpha = 0.2 + 0.6 * (0.5 + 0.5 * Math.sin(s.twinkle));
                const sx = (s.x + mouseX * s.depth * 0.5 + width) % width;
                const sy = (s.y + mouseY * s.depth * 0.5 + height) % height;

                ctx.fillStyle = s.color + alpha + ')';
                ctx.beginPath();
                ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
                ctx.fill();
            }

            for (let i = 0; i < numHex; i++) {
                const h = hexStreamers[i];
                h.progress += h.speed;
                const hexRadius = baseRadius * h.ringScale;
                const pos = getHexCoord(portalCx, portalCy, hexRadius, h.progress);

                h.trail.push({ x: pos.x, y: pos.y });
                if (h.trail.length > 7) h.trail.shift();

                if (h.trail.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(h.trail[0].x, h.trail[0].y);
                    for (let k = 1; k < h.trail.length; k++) {
                        ctx.lineTo(h.trail[k].x, h.trail[k].y);
                    }
                    ctx.strokeStyle = 'rgba(' + h.color[0] + ',' + h.color[1] + ',' + h.color[2] + ', 0.4)';
                    ctx.lineWidth = h.size * 0.8;
                    ctx.stroke();
                }

                ctx.fillStyle = 'rgba(' + h.color[0] + ',' + h.color[1] + ',' + h.color[2] + ', 0.85)';
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, h.size, 0, Math.PI * 2);
                ctx.fill();
            }

            for (let i = 0; i < numOrbits; i++) {
                const p = orbitalParticles[i];
                p.angle += p.angularSpeed;

                const curRadius = baseRadius * p.radiusRel + Math.sin(time * p.radialFreq + p.phase) * p.radialAmp;
                const px = portalCx + Math.cos(p.angle) * curRadius;
                const py = portalCy + Math.sin(p.angle) * (curRadius * 0.88);

                p.trail.push({ x: px, y: py });
                if (p.trail.length > 6) p.trail.shift();

                if (p.trail.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(p.trail[0].x, p.trail[0].y);
                    for (let k = 1; k < p.trail.length; k++) {
                        ctx.lineTo(p.trail[k].x, p.trail[k].y);
                    }
                    ctx.strokeStyle = 'rgba(' + p.color[0] + ',' + p.color[1] + ',' + p.color[2] + ', ' + (p.alpha * 0.35) + ')';
                    ctx.lineWidth = p.size * 0.7;
                    ctx.stroke();
                }

                ctx.fillStyle = 'rgba(' + p.color[0] + ',' + p.color[1] + ',' + p.color[2] + ', ' + p.alpha + ')';
                ctx.beginPath();
                ctx.arc(px, py, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            if (document.body.classList.contains('portal-entered')) {
                ctx.clearRect(0, 0, width, height);
                return;
            }

            requestAnimationFrame(render);
        }
        render();
    }
    initPortalSimulation();

    const portalVideo = document.getElementById('portal-video');
    const portalFlashOverlay = document.getElementById('portal-flash-overlay');
    const portalEntryTrigger = document.getElementById('portal-entry-trigger');

    let startY = 0;
    let isSwiping = false;
    let portalPlaybackActive = false;
    let portalHasPlayedOnce = false;
    let flashTriggered = false;

    // Check if user has already entered the portal during this session
    const hasAlreadyEnteredPortal = sessionStorage.getItem('portalEntered') === 'true';

    if (hasAlreadyEnteredPortal) {
        portalHasPlayedOnce = true;
        document.documentElement.classList.add('portal-entered-fast');
        document.body.classList.add('portal-entered');
        if (splashScreen) {
            splashScreen.classList.add('hidden');
            splashScreen.classList.remove('active-screen');
        }
        if (mainScrollContainer) {
            mainScrollContainer.classList.add('scroll-enabled');
            mainScrollContainer.scrollTop = 0;
        }
        if (loaderScreen) {
            loaderScreen.classList.add('hidden');
            loaderScreen.classList.remove('active-screen');
        }
        const navWheel = document.getElementById('cosmic-nav-wheel');
        if (navWheel) {
            navWheel.classList.remove('hidden-nav');
            setTimeout(updateNavPill, 120);
        }
        setTimeout(() => {
            generateCalendarCube();
        }, 50);
    }

    if (portalVideo) {
        portalVideo.muted = true;
        portalVideo.volume = 0;
        portalVideo.defaultPlaybackRate = 2.0;
        portalVideo.playbackRate = 2.0;
        portalVideo.controls = false;
        portalVideo.removeAttribute('controls');
    }

    function handlePortalLaunch() {

        if (portalHasPlayedOnce || portalPlaybackActive) {
            return;
        }

        portalPlaybackActive = true;
        portalHasPlayedOnce = true;
        flashTriggered = false;

        if (splashScreen) {
            splashScreen.classList.remove('active-screen');
            splashScreen.classList.add('hidden');
        }

        if (loaderScreen) {
            loaderScreen.classList.remove('hidden');
            loaderScreen.classList.add('active-screen');
        }

        if (portalFlashOverlay) {
            portalFlashOverlay.classList.remove('active-flash', 'fade-out');
        }

        if (portalVideo) {
            portalVideo.currentTime = 0;
            portalVideo.defaultPlaybackRate = 2.0;
            portalVideo.playbackRate = 2.0;
            portalVideo.muted = true;
            portalVideo.volume = 0;

            const playPromise = portalVideo.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    portalVideo.playbackRate = 2.0;
                }).catch(e => {
                    console.warn("Video play notice:", e);

                    enterUniverse();
                });
            }

            portalVideo.ontimeupdate = () => {
                const currentTime = portalVideo.currentTime;
                const duration = portalVideo.duration;

                if (duration && isFinite(duration) && duration > 0.8) {
                    if (currentTime >= Math.max(0.2, duration - 0.45) && !flashTriggered) {
                        flashTriggered = true;
                        if (portalFlashOverlay) {
                            portalFlashOverlay.classList.add('active-flash');
                        }
                    }
                    if (currentTime >= Math.max(0.4, duration - 0.1)) {
                        enterUniverse();
                    }
                } else {
                    if (currentTime >= 8.6 && !flashTriggered) {
                        flashTriggered = true;
                        if (portalFlashOverlay) {
                            portalFlashOverlay.classList.add('active-flash');
                        }
                    }
                    if (currentTime >= 8.95) {
                        enterUniverse();
                    }
                }
            };

            portalVideo.onended = () => {
                enterUniverse();
            };
        } else {
            enterUniverse();
        }
    }

    window.addEventListener('wheel', (e) => {
        if (!portalHasPlayedOnce && splashScreen && splashScreen.classList.contains('active-screen') && e.deltaY > 15) {
            handlePortalLaunch();
        }
    }, { passive: true });

    if (splashScreen) {
        splashScreen.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        }, { passive: true });

        splashScreen.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const diffY = startY - currentY;

            if (!portalHasPlayedOnce) {
                const logoCont = document.querySelector('.logo-container');
                if (logoCont && diffY > 0 && diffY < 120) {
                    logoCont.style.transform = `translateY(-${diffY * 0.2}px)`;
                }
            }
        }, { passive: true });

        splashScreen.addEventListener('touchend', (e) => {
            const currentY = e.changedTouches[0].clientY;
            const diffY = startY - currentY;

            const logoCont = document.querySelector('.logo-container');
            if (logoCont) {
                logoCont.style.transform = 'translateY(0)';
            }

            if (!portalHasPlayedOnce && diffY > 40) {
                handlePortalLaunch();
            }
        }, { passive: true });
    }

    if (portalEntryTrigger) {
        portalEntryTrigger.addEventListener('click', handlePortalLaunch);
        portalEntryTrigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                handlePortalLaunch();
            }
        });
    }

    if (enterBtn) {
        enterBtn.addEventListener('click', handlePortalLaunch);
    }

    function enterUniverse() {
        if (loaderScreen && !loaderScreen.classList.contains('active-screen') && !portalPlaybackActive) return;

        try {
            sessionStorage.setItem('portalEntered', 'true');
        } catch (e) {
            console.warn(e);
        }

        if (portalFlashOverlay) {
            portalFlashOverlay.classList.add('active-flash');
        }

        setTimeout(() => {

            if (portalVideo) {
                portalVideo.pause();
                portalVideo.ontimeupdate = null;
                portalVideo.onended = null;
            }

            if (loaderScreen) {
                loaderScreen.classList.remove('active-screen');
                loaderScreen.classList.add('hidden');
            }

            if (splashScreen) {
                splashScreen.classList.add('hidden');
                splashScreen.classList.remove('active-screen');
            }

            document.body.classList.add('portal-entered');

            if (portalFlashOverlay) {
                portalFlashOverlay.classList.add('fade-out');
                setTimeout(() => {
                    portalFlashOverlay.classList.remove('active-flash', 'fade-out');
                }, 800);
            }

            if (mainScrollContainer) {
                mainScrollContainer.classList.add('scroll-enabled');
                mainScrollContainer.scrollTop = 0;
            }

            portalPlaybackActive = false;
            isSwiping = false;

            const navWheel = document.getElementById('cosmic-nav-wheel');
            if (navWheel) {
                navWheel.classList.remove('hidden-nav');
                setTimeout(updateNavPill, 100);
            }

            generateCalendarCube();
        }, 350);
    }

    mainScrollContainer.addEventListener('scroll', () => {
        const scrollTop = mainScrollContainer.scrollTop;
        const pageHeight = window.innerHeight;

        if (scrollTop > pageHeight * 0.4) {
            document.body.classList.add('universe-active');
        } else {
            document.body.classList.remove('universe-active');
        }
    });

    const glitchOverlay = document.getElementById('screen-glitch-overlay');
    function triggerPageGlitch(targetContainer) {
        if (!glitchOverlay) return;

        glitchOverlay.classList.remove('glitch-active');
        void glitchOverlay.offsetWidth;
        glitchOverlay.classList.add('glitch-active');

        const container = targetContainer || document;
        const titlesToGlitch = container.querySelectorAll('.spider-title, .logo-title, .calendar-page-heading, .universe-page-heading, .gallery-page-heading, .about-page-heading, .team-page-heading, [data-text]');

        titlesToGlitch.forEach(title => {
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


    const observerOptions = {
        root: mainScrollContainer,
        threshold: 0.5
    };

    let lastSectionId = null;
    const targetNavItems = document.querySelectorAll('.nav-item[data-target]');
    if (targetNavItems.length > 0 && mainScrollContainer) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    lastSectionId = sectionId;

                    targetNavItems.forEach(item => {
                        if (item.getAttribute('data-target') === sectionId) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });
                    updateNavPill();
                }
            });
        }, observerOptions);

        document.querySelectorAll('.snap-page').forEach(section => {
            navObserver.observe(section);
        });
    }

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

    function setupCubeControls() {
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

    function tickOrbit() {
        if (!isOrbitPaused && !eventModal.classList.contains('active-modal')) {

            const speed = activeVerse ? 0.01 : 0.04;
            orbitAngle = (orbitAngle + speed) % 360;
            if (portalOrbitWrapper) {
                portalOrbitWrapper.style.transform = `rotate(${orbitAngle}deg)`;

                portalOrbitWrapper.querySelectorAll('.portal-upright-wrapper, .event-upright-wrapper').forEach(child => {
                    child.style.transform = `rotate(${-orbitAngle}deg)`;
                });
            }
        }
        requestAnimationFrame(tickOrbit);
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
                triggerPageGlitch(gallerySec);
                gallerySec.scrollIntoView({ behavior: 'smooth' });
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
                    triggerPageGlitch(targetEl);
                    targetEl.scrollIntoView({ behavior: 'smooth' });
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
});
