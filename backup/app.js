/* ==========================================================================
   Pravaah 2026: Immersive Multiverse Fest JS Application Code
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Screen Elements
    const canvas = document.getElementById('starfield-canvas');
    const ctx = canvas.getContext('2d');
    const splashScreen = document.getElementById('splash-screen');
    const loaderScreen = document.getElementById('loader-screen');
    const mainScrollContainer = document.getElementById('main-scroll-container');
    const calendarPage = document.getElementById('calendar-page');
    const universePage = document.getElementById('universe-page');
    
    // Splash & Preloader Trigger elements
    const swipeTrigger = document.getElementById('swipe-trigger');
    const enterBtn = document.getElementById('enter-btn');
    const loaderPercentage = document.getElementById('loader-percentage');
    const terminalLogs = document.getElementById('terminal-logs');
    
    // Calendar 3D Cube Viewport Elements
    const calendarCubeViewport = document.getElementById('calendar-cube-viewport');
    const calendarCube = document.getElementById('calendar-cube');
    const calendarLayoutContainer = document.getElementById('calendar-layout-container');
    const faceFeb = document.getElementById('face-feb');
    const faceMar = document.getElementById('face-mar');
    const faceApr = document.getElementById('face-apr');
    
    // Sidebar Details & Collapse Reset button
    const dayEventsPanel = document.getElementById('day-events-panel');
    const backToCubeBtn = document.getElementById('back-to-cube-btn');
    const calendarPanelTitle = document.getElementById('calendar-panel-title');
    const calendarPanelDate = document.getElementById('calendar-panel-date');
    const calendarEventsList = document.getElementById('calendar-events-list');

    // Portal Network viewport elements
    const portalNetworkContainer = document.getElementById('portal-network-container');
    const portalOrbitWrapper = document.getElementById('portal-orbit-wrapper');
    const networkSvg = document.getElementById('network-svg');
    const pravaahCore = document.getElementById('pravaah-core');

    // Dynamic orbital synchronization parameters
    let orbitAngle = 0;
    let isOrbitPaused = false;
    let isNetworkDeployed = false;

    // Verse Event Details Modal & Toast Elements
    const eventModal = document.getElementById('event-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalVerseBadge = document.getElementById('modal-verse-badge');
    const modalVerseTitle = document.getElementById('modal-verse-title');
    const modalVerseDesc = document.getElementById('modal-verse-desc');
    const eventsGrid = document.getElementById('events-grid');
    const toast = document.getElementById('toast-notification');

    // Event Data for the 5 Verses (4-5 events each as requested)
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

    // Helper: Generate Mock Form Registration Link
    function getRegistrationLink(eventName) {
        return `https://docs.google.com/forms/d/e/1FAIpQLScJp86gL9E-Pravaah2026MockForm/viewform?usp=pp_url&entry.18473822=${encodeURIComponent(eventName)}`;
    }

    // Canvas Resize Handler
    let width, height;
    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    /* ==========================================================================
       Starfield Engine (HTML5 Canvas 2D) with Twinkling Effect
       ========================================================================== */
    const numStars = 1500;
    const stars = [];
    let warpSpeed = 0.5; // Steady cosmic state speed
    let targetWarpSpeed = 0.5;
    let warpActive = false;
    let cameraDriftX = 0;
    let cameraDriftY = 0;

    // Initialize Stars with Twinkle phase parameters
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: (Math.random() - 0.5) * 2000,
            y: (Math.random() - 0.5) * 2000,
            z: Math.random() * 2000,
            twinklePhase: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.015 + Math.random() * 0.025,
            color: i % 8 === 0 
                ? [0, 210, 255]   // Cyan
                : i % 12 === 0 
                ? [230, 38, 120]  // Spider-Verse Magenta
                : i % 18 === 0
                ? [59, 98, 216]   // Portal Cobalt Blue
                : [255, 255, 255] // Pure White
        });
    }

    // Background comets array & initialization (3D perspective floating outwards)
    const numComets = 14;
    const comets = [];
    for (let i = 0; i < numComets; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 150 + Math.random() * 850;
        comets.push({
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            z: Math.random() * 2000,
            speed: 8 + Math.random() * 12,
            color: i % 4 === 0 
                ? [0, 210, 255]  // Electric Cyan
                : i % 4 === 1 
                ? [230, 38, 120] // Hot Magenta
                : i % 4 === 2
                ? [255, 42, 75]  // Comic Vermilion
                : [255, 170, 0]  // Mumbattan Amber
        });
    }

    // Shooting Stars simulator array & updater
    const shootingStars = [];
    function handleShootingStars() {
        // Spawn a new shooting star at random times
        if (shootingStars.length < 2 && Math.random() < 0.008) {
            shootingStars.push({
                x: Math.random() * width,
                y: Math.random() * height * 0.5,
                length: 60 + Math.random() * 90,
                dx: 8 + Math.random() * 10,
                dy: 4 + Math.random() * 5,
                alpha: 1
            });
        }

        // Draw and update active shooting stars
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const ss = shootingStars[i];
            ctx.strokeStyle = `rgba(230, 38, 120, ${ss.alpha})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(ss.x, ss.y);
            ctx.lineTo(ss.x - ss.dx * 1.5, ss.y - ss.dy * 1.5);
            ctx.stroke();

            ss.x += ss.dx;
            ss.y += ss.dy;
            ss.alpha -= 0.03; // Fade speed

            if (ss.alpha <= 0 || ss.x > width || ss.y > height) {
                shootingStars.splice(i, 1);
            }
        }
    }

    // Starfield Animation Loop
    function animateStars() {
        if (warpActive) {
            ctx.fillStyle = `rgba(2, 2, 8, ${0.1 + (1 - warpSpeed/50) * 0.2})`;
            ctx.fillRect(0, 0, width, height);
        } else {
            ctx.clearRect(0, 0, width, height);
        }

        // Render shooting stars on canvas background
        handleShootingStars();

        // Smoothly interpolate warp speed
        warpSpeed += (targetWarpSpeed - warpSpeed) * 0.08;

        const cx = width / 2 + cameraDriftX;
        const cy = height / 2 + cameraDriftY;
        const fov = 180;

        for (let i = 0; i < numStars; i++) {
            const star = stars[i];
            
            // Draw star lines during warp, circles during normal state
            const prevZ = star.z;
            star.z -= warpSpeed;

            if (star.z <= 0) {
                star.z = 2000;
                star.x = (Math.random() - 0.5) * 2000;
                star.y = (Math.random() - 0.5) * 2000;
                continue;
            }

            // Calculate twinkling brightness multiplier
            const twinkleVal = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(star.twinklePhase));
            star.twinklePhase += star.twinkleSpeed;

            // Project 3D coordinates to 2D screen
            const px = cx + (star.x / prevZ) * fov;
            const py = cy + (star.y / prevZ) * fov;

            const sx = cx + (star.x / star.z) * fov;
            const sy = cy + (star.y / star.z) * fov;

            // Render only if on screen
            if (sx >= 0 && sx < width && sy >= 0 && sy < height) {
                const alpha = Math.min(1, (2000 - star.z) / 500) * twinkleVal;
                ctx.strokeStyle = `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${alpha})`;
                
                if (warpSpeed > 5) {
                    // Warp speed: Stretch into lines
                    ctx.lineWidth = Math.min(2.5, warpSpeed / 10);
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(sx, sy);
                    ctx.stroke();
                } else {
                    // Floating state: Small twinkling dots
                    const size = Math.max(0.5, (1 - star.z / 2000) * 3);
                    ctx.fillStyle = `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${alpha})`;
                    ctx.beginPath();
                    ctx.arc(sx, sy, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        // Render background comets flowing outwards from center
        for (let i = 0; i < numComets; i++) {
            const comet = comets[i];
            
            // Scale speed with warp speed if active
            const currentSpeed = comet.speed * (warpSpeed > 1 ? (warpSpeed * 0.8) : 1);
            comet.z -= currentSpeed;

            if (comet.z <= 0) {
                comet.z = 2000;
                const angle = Math.random() * Math.PI * 2;
                const distance = 150 + Math.random() * 850;
                comet.x = Math.cos(angle) * distance;
                comet.y = Math.sin(angle) * distance;
                comet.speed = 8 + Math.random() * 12;
                continue;
            }

            const sx = cx + (comet.x / comet.z) * fov;
            const sy = cy + (comet.y / comet.z) * fov;

            // Render only if on screen (with padding for tails)
            if (sx >= -100 && sx < width + 100 && sy >= -100 && sy < height + 100) {
                // Calculate radial depth progress factor (0 at center, 1 at viewport borders)
                const radialFactor = 1 - (comet.z / 2000);
                
                // Fade in near Z=2000, and scale up brightness (alpha) as it reaches the outer part
                const alpha = Math.min(1, (2000 - comet.z) / 300) * (0.35 + 0.65 * radialFactor) * Math.min(1, comet.z / 60);
                
                // Apply a glowing drop shadow when reaching the outer part of the viewport
                if (radialFactor > 0.45) {
                    ctx.shadowColor = `rgb(${comet.color[0]}, ${comet.color[1]}, ${comet.color[2]})`;
                    ctx.shadowBlur = (radialFactor - 0.45) * 30;
                } else {
                    ctx.shadowBlur = 0;
                }

                // Tail coordinate projection (Z + tailLength)
                const tailZ = comet.z + 180 + (comet.speed * 4);
                const px = cx + (comet.x / tailZ) * fov;
                const py = cy + (comet.y / tailZ) * fov;

                // Create tail gradient pointing to the center
                const grad = ctx.createLinearGradient(sx, sy, px, py);
                grad.addColorStop(0, `rgba(${comet.color[0]}, ${comet.color[1]}, ${comet.color[2]}, ${alpha * 0.7})`);
                grad.addColorStop(1, `rgba(${comet.color[0]}, ${comet.color[1]}, ${comet.color[2]}, 0)`);

                ctx.strokeStyle = grad;
                // Line width grows thicker as it flies outward
                ctx.lineWidth = Math.max(1.2, (0.4 + radialFactor * 1.6) * 3.2);
                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.lineTo(px, py);
                ctx.stroke();

                // Draw comet head (grows larger as it flies outward)
                const headSize = Math.max(1.5, (0.4 + radialFactor * 1.6) * 4.2);
                ctx.fillStyle = `rgba(${comet.color[0]}, ${comet.color[1]}, ${comet.color[2]}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(sx, sy, headSize, 0, Math.PI * 2);
                ctx.fill();
                
                // Reset shadow blur
                ctx.shadowBlur = 0;
            }
        }

        requestAnimationFrame(animateStars);
    }
    animateStars();

    // Mouse movement adds subtle camera drift
    window.addEventListener('mousemove', (e) => {
        if (!warpActive) {
            cameraDriftX = (e.clientX - width / 2) * 0.05;
            cameraDriftY = (e.clientY - height / 2) * 0.05;
        }
    });

    /* ==========================================================================
       Full Viewport Muted Dimensional Portal Video (Plays Once on Start Scroll)
       ========================================================================== */
    const portalVideo = document.getElementById('portal-video');
    const portalFlashOverlay = document.getElementById('portal-flash-overlay');
    const portalEntryTrigger = document.getElementById('portal-entry-trigger');

    let startY = 0;
    let isSwiping = false;
    let portalPlaybackActive = false;
    let portalHasPlayedOnce = false;
    let flashTriggered = false;

    // Ensure video is muted and properties set
    if (portalVideo) {
        portalVideo.muted = true;
        portalVideo.volume = 0;
        portalVideo.defaultPlaybackRate = 2.0;
        portalVideo.playbackRate = 2.0;
        portalVideo.controls = false;
        portalVideo.removeAttribute('controls');
    }

    function handlePortalLaunch() {
        // If already played once or currently playing, do not play again
        if (portalHasPlayedOnce || portalPlaybackActive) {
            // If already played once and user clicks enter button, scroll directly to calendar page
            if (portalHasPlayedOnce) {
                const calendarPage = document.getElementById('calendar-page');
                if (calendarPage) {
                    calendarPage.scrollIntoView({ behavior: 'smooth' });
                }
            }
            return;
        }

        portalPlaybackActive = true;
        portalHasPlayedOnce = true;
        flashTriggered = false;

        // Transition from Splash to Fullscreen Portal Video Screen
        splashScreen.classList.remove('active-screen');
        splashScreen.classList.add('hidden');
        
        loaderScreen.classList.remove('hidden');
        loaderScreen.classList.add('active-screen');
        
        // Reset flash overlay
        if (portalFlashOverlay) {
            portalFlashOverlay.classList.remove('active-flash', 'fade-out');
        }

        // Start starfield warp speed in background
        warpActive = true;
        targetWarpSpeed = 50;

        // Reset and play Muted Portal Video at 2x speed
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
                    // If video cannot play, fallback to immediate universe entrance
                    enterUniverse();
                });
            }

            // Track playback time to trigger flash transition at ~8.6s
            portalVideo.ontimeupdate = () => {
                const currentTime = portalVideo.currentTime;

                // Trigger Whiteout Burst at climactic flash (~8.6s)
                if (currentTime >= 8.6 && !flashTriggered) {
                    flashTriggered = true;
                    if (portalFlashOverlay) {
                        portalFlashOverlay.classList.add('active-flash');
                    }
                }

                // Complete portal entry right as 9s completes
                if (currentTime >= 8.95) {
                    enterUniverse();
                }
            };

            portalVideo.onended = () => {
                enterUniverse();
            };
        } else {
            enterUniverse();
        }
    }

    // Start scroll via mouse wheel: scrolling down on splash screen triggers portal video once
    window.addEventListener('wheel', (e) => {
        if (!portalHasPlayedOnce && splashScreen.classList.contains('active-screen') && e.deltaY > 15) {
            handlePortalLaunch();
        }
    }, { passive: true });

    // Touch swipe up on splash screen triggers portal video once
    if (splashScreen) {
        splashScreen.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        }, { passive: true });

        splashScreen.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const diffY = startY - currentY;
            
            // Visual feedback on logo container if not played yet
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

    // Click trigger on splash "ENTER MULTIVERSE" button
    if (portalEntryTrigger) {
        portalEntryTrigger.addEventListener('click', handlePortalLaunch);
        portalEntryTrigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                handlePortalLaunch();
            }
        });
    }

    // Fallback enter button click (if present)
    if (enterBtn) {
        enterBtn.addEventListener('click', handlePortalLaunch);
    }

    function enterUniverse() {
        if (!loaderScreen.classList.contains('active-screen') && !portalPlaybackActive) return;

        // Flash burst into the multiverse
        if (portalFlashOverlay) {
            portalFlashOverlay.classList.add('active-flash');
        }

        setTimeout(() => {
            // Stop and clean up video
            if (portalVideo) {
                portalVideo.pause();
                portalVideo.ontimeupdate = null;
                portalVideo.onended = null;
            }

            // Drop loader, display Scroll Container
            loaderScreen.classList.remove('active-screen');
            loaderScreen.classList.add('hidden');
            
            // Restore splash screen state in background
            splashScreen.classList.remove('hidden');
            splashScreen.classList.add('active-screen');

            // Fade out the dimensional flash overlay smoothly
            if (portalFlashOverlay) {
                portalFlashOverlay.classList.add('fade-out');
                setTimeout(() => {
                    portalFlashOverlay.classList.remove('active-flash', 'fade-out');
                }, 800);
            }

            // Enable scrolling snaps on container
            mainScrollContainer.classList.add('scroll-enabled');
            
            warpActive = false;
            targetWarpSpeed = 0.35; // Calm floating space stars
            portalPlaybackActive = false;
            isSwiping = false;

            // Fade in floating top navigation wheel
            const navWheel = document.getElementById('cosmic-nav-wheel');
            if (navWheel) {
                navWheel.classList.remove('hidden-nav');
                setTimeout(updateNavPill, 100);
            }
            
            // Smoothly scroll down to the calendar page (timeline)
            const calendarPage = document.getElementById('calendar-page');
            if (calendarPage) {
                calendarPage.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Render the 3D Month Cube calendars
            generateCalendarCube();

            // Render the Portal Network graph
            renderPortalNetwork();
        }, 350);
    }

    /* ==========================================================================
       Scroll Snap Page Transition Listeners (Starfield Canvas Blurring & Nav Sync)
       ========================================================================== */
    mainScrollContainer.addEventListener('scroll', () => {
        const scrollTop = mainScrollContainer.scrollTop;
        const pageHeight = window.innerHeight;

        // If scrolled past 40% of the first snap section, trigger blurring and nebula glows
        if (scrollTop > pageHeight * 0.4) {
            document.body.classList.add('universe-active');
        } else {
            document.body.classList.remove('universe-active');
        }
    });

    // Cosmic Nav click scroll snap handlers
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            const targetSec = document.getElementById(targetId);
            if (targetSec) {
                triggerPageGlitch(targetSec);
                targetSec.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Intersection Observer to sync Scroll Snaps back to Nav Wheel highlights
    const observerOptions = {
        root: mainScrollContainer,
        threshold: 0.5 // Highlight tab when section is at least 50% in view
    };

    const glitchOverlay = document.getElementById('screen-glitch-overlay');
    function triggerPageGlitch(targetSec) {
        if (!glitchOverlay) return;

        // Restart screen glitch overlay transition (50ms ultra fast duration)
        glitchOverlay.classList.remove('glitch-active');
        void glitchOverlay.offsetWidth; // Force reflow
        glitchOverlay.classList.add('glitch-active');

        // Trigger Spider-Verse title glitch on target section titles (or document)
        const targetContainer = targetSec || document;
        const titlesToGlitch = targetContainer.querySelectorAll('.spider-title, .logo-title, .calendar-page-heading, .universe-page-heading, .gallery-page-heading, .about-page-heading, [data-text]');

        titlesToGlitch.forEach(title => {
            title.classList.remove('spider-glitch-active');
            void title.offsetWidth; // Force reflow
            title.classList.add('spider-glitch-active');
        });

        // Automatically clean up glitch active states after 50ms
        setTimeout(() => {
            glitchOverlay.classList.remove('glitch-active');
            titlesToGlitch.forEach(title => {
                title.classList.remove('spider-glitch-active');
            });
        }, 50);
    }

    let lastSectionId = null;
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Trigger Spider-Verse glitch animation when transitioning between snap pages
                if (lastSectionId && lastSectionId !== sectionId) {
                    const activeSec = document.getElementById(sectionId);
                    triggerPageGlitch(activeSec);
                }
                lastSectionId = sectionId;

                navItems.forEach(item => {
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

    // Helper: recalculates navigation capsule offsets and active glows
    function updateNavPill() {
        const activeItem = document.querySelector('.nav-item.active');
        const pill = document.getElementById('nav-indicator-pill');
        const navWheel = document.getElementById('cosmic-nav-wheel');
        if (activeItem && pill && navWheel) {
            pill.style.left = `${activeItem.offsetLeft}px`;
            pill.style.width = `${activeItem.offsetWidth}px`;
            
            // Set data active theme based on target id
            const targetId = activeItem.getAttribute('data-target');
            let theme = "home";
            if (targetId === "calendar-page") theme = "calendar";
            else if (targetId === "universe-page") theme = "portals";
            else if (targetId === "gallery-page") theme = "gallery";
            else if (targetId === "about-page") theme = "about";
            
            navWheel.setAttribute('data-active-theme', theme);
        }
    }

    /* ==========================================================================
       Interactive Portal Network Generator (Branching Node System)
       ========================================================================== */
    let activeVerse = null;

    function renderPortalNetwork() {
        if (!portalNetworkContainer) return;

        // Clear dynamic elements
        document.querySelectorAll('.portal-node, .branch-event-node').forEach(el => el.remove());
        networkSvg.innerHTML = '';

        const rect = portalNetworkContainer.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const isMobile = window.innerWidth <= 768;
        const rPortal = isMobile ? rect.width * 0.28 : rect.width * 0.26;
        const rEvent = isMobile ? rect.width * 0.46 : rect.width * 0.42;

        // Draw central core ring inside SVG
        const coreRing = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        coreRing.setAttribute("cx", cx);
        coreRing.setAttribute("cy", cy);
        coreRing.setAttribute("r", 50);
        coreRing.setAttribute("stroke", "rgba(255, 223, 122, 0.2)");
        coreRing.setAttribute("stroke-width", "2");
        coreRing.setAttribute("fill", "none");
        coreRing.setAttribute("opacity", isNetworkDeployed ? "1" : "0");
        coreRing.style.transition = "opacity 1.2s ease 0.4s";
        networkSvg.appendChild(coreRing);

        // Generate Verse Portals and branches
        verses.forEach((verse) => {
            const rad = (verse.angle * Math.PI) / 180;
            const px = cx + Math.cos(rad) * rPortal;
            const py = cy + Math.sin(rad) * rPortal;

            // 1. Draw SVG Connection: Core -> Portal
            const coreLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
            coreLine.setAttribute("d", `M ${cx} ${cy} L ${px} ${py}`);
            coreLine.setAttribute("stroke", verse.color);
            coreLine.setAttribute("stroke-width", "2");
            coreLine.style.filter = `drop-shadow(0 0 2px ${verse.color})`;
            coreLine.setAttribute("fill", "none");
            coreLine.setAttribute("id", `path-core-${verse.key}`);
            coreLine.setAttribute("opacity", isNetworkDeployed ? "0.55" : "0");
            coreLine.style.transition = "opacity 1.2s ease 0.4s";
            networkSvg.appendChild(coreLine);

            // 2. Create Portal Node
            const portal = document.createElement('div');
            portal.className = `portal-node portal-${verse.key}`;
            
            if (isNetworkDeployed) {
                portal.style.left = `${px}px`;
                portal.style.top = `${py}px`;
                portal.style.transform = 'translate(-50%, -50%) scale(1)';
                portal.style.opacity = '1';
                portal.style.pointerEvents = 'auto';
            } else {
                portal.style.left = `${cx}px`;
                portal.style.top = `${cy}px`;
                portal.style.transform = 'translate(-50%, -50%) scale(0)';
                portal.style.opacity = '0';
                portal.style.pointerEvents = 'none';
            }
            portal.setAttribute('data-target-left', px);
            portal.setAttribute('data-target-top', py);
            portal.setAttribute('data-verse', verse.key);
            // Compute dynamic nested moons
            const numMoons = (verse.key === 'tech' || verse.key === 'game') ? 2 : 1;
            let moonsHTML = '';
            for (let m = 0; m < numMoons; m++) {
                const orbitSpeed = 6 + m * 5; // 6s and 11s orbital periods
                const moonOffset = isMobile ? (35 + m * 6) : (65 + m * 10); // offset distance from center
                const spinAnimation = (m === 1) ? 'spin-counter' : 'spin';
                moonsHTML += `
                    <div class="portal-moon-orbit" style="animation-name: ${spinAnimation}; animation-duration: ${orbitSpeed}s;">
                        <div class="portal-moon" style="background-color: ${verse.color}; box-shadow: 0 0 8px ${verse.color}; top: ${-moonOffset}px;"></div>
                    </div>
                `;
            }

            portal.innerHTML = `
                <div class="portal-upright-wrapper">
                    <div class="portal-ring-swirl"></div>
                    <div class="portal-center">${verse.key.toUpperCase().substring(0, 4)}</div>
                    <span class="portal-label">${verse.label}</span>
                    ${moonsHTML}
                </div>
            `;

            // Pause orbit on portal hover
            portal.addEventListener('mouseenter', () => { isOrbitPaused = true; });
            portal.addEventListener('mouseleave', () => { isOrbitPaused = false; });

            portalOrbitWrapper.appendChild(portal);

            // 3. Create Event branch nodes fanned out around the portal node
            const events = verseData[verse.key].events;
            events.forEach((evt, idx) => {
                // Fan out event nodes in a +-35 degree sweep centered on portal's angle
                const sweepAngle = isMobile ? 60 : 70;
                const halfSweep = sweepAngle / 2;
                const angleStep = sweepAngle / (events.length - 1);
                
                const evAngle = (verse.angle - halfSweep) + idx * angleStep;
                const evRad = (evAngle * Math.PI) / 180;
                const ex = cx + Math.cos(evRad) * rEvent;
                const ey = cy + Math.sin(evRad) * rEvent;

                // Draw SVG Connection: Portal -> Event
                const eventLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
                eventLine.setAttribute("d", `M ${px} ${py} L ${ex} ${ey}`);
                eventLine.setAttribute("stroke", verse.color);
                eventLine.setAttribute("stroke-width", "1.5");
                eventLine.setAttribute("fill", "none");
                eventLine.setAttribute("class", `path-event-${verse.key}`);
                networkSvg.appendChild(eventLine);

                // Create Event dot node
                const eventNode = document.createElement('div');
                eventNode.className = `branch-event-node branch-event-${verse.key}`;
                eventNode.style.left = `${ex}px`;
                eventNode.style.top = `${ey}px`;
                eventNode.style.borderColor = verse.color;
                eventNode.style.color = verse.color;
                eventNode.innerHTML = `
                    <div class="event-upright-wrapper">
                        <div class="node-dot" style="background-color: ${verse.color}"></div>
                        <div class="event-node-label">${evt.name}</div>
                    </div>
                `;

                // Pause orbit on event hover
                eventNode.addEventListener('mouseenter', () => { isOrbitPaused = true; });
                eventNode.addEventListener('mouseleave', () => { isOrbitPaused = false; });

                portalOrbitWrapper.appendChild(eventNode);

                // Click event sub-node opens details modal
                eventNode.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openEventDetailModal(evt, verse.key);
                });
            });

            // Portal Click behavior
            portal.addEventListener('click', (e) => {
                e.stopPropagation();
                activatePortalBranch(verse.key);
            });
        });
    }

    // Window resize rebuilds coordinates to adapt sizes
    window.addEventListener('resize', () => {
        renderPortalNetwork();
        updateNavPill();
    });

    function activatePortalBranch(verseKey) {
        activeVerse = verseKey;

        // Set bracket glows matching current active verse color theme
        verses.forEach(v => {
            document.body.classList.remove(`verse-${v.key}-active`);
        });
        document.body.classList.add(`verse-${verseKey}-active`);

        // Dim other portal nodes
        document.querySelectorAll('.portal-node').forEach(node => {
            if (node.getAttribute('data-verse') === verseKey) {
                node.classList.add('active-portal');
                node.classList.remove('portal-dimmed');
            } else {
                node.classList.remove('active-portal');
                node.classList.add('portal-dimmed');
            }
        });

        // Toggle active paths and node elements
        verses.forEach(v => {
            const isTarget = v.key === verseKey;
            
            // Core -> Portal line
            const coreLine = document.getElementById(`path-core-${v.key}`);
            if (coreLine) {
                if (isTarget) {
                    coreLine.setAttribute("stroke", v.color);
                    coreLine.setAttribute("stroke-width", "3.5");
                    coreLine.style.filter = `drop-shadow(0 0 4px ${v.color})`;
                    coreLine.setAttribute("opacity", "1.0");
                } else {
                    coreLine.setAttribute("stroke", v.color);
                    coreLine.setAttribute("stroke-width", "1.5");
                    coreLine.style.filter = "none";
                    coreLine.setAttribute("opacity", "0.2");
                }
            }

            // Portal -> Event lines
            document.querySelectorAll(`.path-event-${v.key}`).forEach(path => {
                if (isTarget) {
                    path.classList.add('line-active');
                } else {
                    path.classList.remove('line-active');
                }
            });

            // Event nodes
            document.querySelectorAll(`.branch-event-${v.key}`).forEach((node) => {
                if (isTarget) {
                    // Small delay to let branch lines animate first
                    setTimeout(() => {
                        node.classList.add('node-active');
                    }, 250);
                } else {
                    node.classList.remove('node-active');
                }
            });
        });
    }

    // Core Reset Handler / Big Bang Deploy Trigger
    pravaahCore.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isNetworkDeployed) {
            deployBigBang();
        } else {
            resetPortalNetwork();
        }
    });

    function deployBigBang() {
        const universePage = document.getElementById('universe-page');
        const flash = document.getElementById('big-bang-flash');
        const prompt = document.getElementById('core-deploy-prompt');

        // 1. Play blinding camera-flash whiteout
        if (flash) {
            flash.classList.add('flash-active');
            // Force browser reflow to register class instantly
            flash.offsetHeight;
            setTimeout(() => {
                flash.classList.remove('flash-active');
            }, 50);
        }

        // 2. Core flash scale animation
        pravaahCore.classList.add('core-flash-pulse');
        setTimeout(() => {
            pravaahCore.classList.remove('core-flash-pulse');
        }, 600);

        // 3. Remove undeployed class from parent page to start HUD boot sequence
        if (universePage) {
            universePage.classList.remove('network-undeployed');
        }

        // 4. Spring portals outward from center center (50%, 50%) to actual target offsets in a spiral wave
        document.querySelectorAll('.portal-node').forEach((node, idx) => {
            const targetLeft = node.getAttribute('data-target-left');
            const targetTop = node.getAttribute('data-target-top');
            if (targetLeft && targetTop) {
                // Assign sequential transition delay to create spiral cascade
                node.style.transitionDelay = `${idx * 0.12}s`;
                
                node.style.left = `${targetLeft}px`;
                node.style.top = `${targetTop}px`;
                node.style.transform = 'translate(-50%, -50%) scale(1)';
                node.style.opacity = '1';
                node.style.pointerEvents = 'auto';
            }
        });

        // 5. Fade in SVG connection lines with matching spiral delays
        document.querySelectorAll('#network-svg circle, #network-svg path').forEach(svgEl => {
            const id = svgEl.getAttribute('id');
            if (id && id.startsWith('path-core-')) {
                const verseKey = id.replace('path-core-', '');
                const verseIdx = verses.findIndex(v => v.key === verseKey);
                if (verseIdx !== -1) {
                    svgEl.style.transitionDelay = `${verseIdx * 0.12 + 0.08}s`;
                }
                svgEl.setAttribute('opacity', '0.55');
            } else {
                svgEl.setAttribute('opacity', '1');
            }
        });

        // 6. Fade out the deploy instructions prompt
        if (prompt) {
            prompt.classList.add('fade-out');
            setTimeout(() => {
                prompt.remove();
            }, 500);
        }

        // 7. Update persistent flag
        isNetworkDeployed = true;
    }

    // Core Hover Pause
    pravaahCore.addEventListener('mouseenter', () => { isOrbitPaused = true; });
    pravaahCore.addEventListener('mouseleave', () => { isOrbitPaused = false; });

    function resetPortalNetwork() {
        activeVerse = null;

        // Restore all portal opacities
        document.querySelectorAll('.portal-node').forEach(node => {
            node.classList.remove('active-portal', 'portal-dimmed');
        });

        // Hide event nodes
        document.querySelectorAll('.branch-event-node').forEach(node => {
            node.classList.remove('node-active');
        });

        // Reset SVG paths
        verses.forEach(v => {
            const coreLine = document.getElementById(`path-core-${v.key}`);
            if (coreLine) {
                coreLine.setAttribute("stroke", v.color);
                coreLine.setAttribute("stroke-width", "2");
                coreLine.style.filter = `drop-shadow(0 0 2px ${v.color})`;
                coreLine.setAttribute("opacity", "0.55");
            }
            document.querySelectorAll(`.path-event-${v.key}`).forEach(path => {
                path.classList.remove('line-active');
            });
        });

        // Reset bracket glows
        verses.forEach(v => {
            document.body.classList.remove(`verse-${v.key}-active`);
        });
    }

    // Live Telemetry Coordinate Generator Interval
    const liveCoords = document.getElementById('live-coords');
    if (liveCoords) {
        setInterval(() => {
            const x = (184.29 + Math.random() * 0.05).toFixed(4);
            const y = (-493.18 - Math.random() * 0.05).toFixed(4);
            liveCoords.textContent = `X: ${x} | Y: ${y}`;
        }, 1500);
    }

    // Reset when clicking empty space inside page viewport
    universePage.addEventListener('click', (e) => {
        if (e.target === universePage || e.target.classList.contains('network-viewport') || e.target.id === 'portal-network-container') {
            resetPortalNetwork();
        }
    });

    /* ==========================================================================
       Chrono Grid 3D Cube Month Generator & Face Rotations
       ========================================================================== */
    // Calendar Event Nodes Data (March 20 - 23)
    const calendarEventsData = {
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
        }
    };

    const calendarMonths = [
        { name: "FEBRUARY 2026", days: 28, startDay: 0, monthNum: 1, element: faceFeb },
        { name: "MARCH 2026", days: 31, startDay: 0, monthNum: 2, element: faceMar },
        { name: "APRIL 2026", days: 30, startDay: 3, monthNum: 3, element: faceApr }
    ];

    function generateCalendarCube() {
        calendarMonths.forEach(m => {
            const container = m.element;
            container.innerHTML = '';

            const module = document.createElement('div');
            module.className = 'month-module';

            // Month Label Heading
            const title = document.createElement('div');
            title.className = 'month-title';
            title.textContent = m.name;
            module.appendChild(title);

            // Weekday Initials
            const dayNames = document.createElement('div');
            dayNames.className = 'day-names';
            const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            weekDays.forEach(wd => {
                const span = document.createElement('span');
                span.textContent = wd;
                dayNames.appendChild(span);
            });
            module.appendChild(dayNames);

            // Day Node Grid
            const daysGrid = document.createElement('div');
            daysGrid.className = 'days-grid';

            // Start Day spacer padding
            for (let i = 0; i < m.startDay; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.className = 'calendar-day empty-day';
                daysGrid.appendChild(emptyCell);
            }

            // Insert month day cells
            for (let d = 1; d <= m.days; d++) {
                const dayCell = document.createElement('div');
                dayCell.className = 'calendar-day';
                dayCell.textContent = d;

                // Highlight Active nodes: March 20-23
                const isActiveNode = (m.monthNum === 2 && d >= 20 && d <= 23);
                if (isActiveNode) {
                    dayCell.classList.add('active-node');
                }

                // Click date behavior
                dayCell.addEventListener('click', (e) => {
                    e.stopPropagation(); // Avoid triggering face hover resets
                    
                    document.querySelectorAll('.calendar-day').forEach(cell => {
                        cell.classList.remove('selected');
                    });
                    dayCell.classList.add('selected');

                    // Load events list in sidebar
                    if (isActiveNode) {
                        loadDailyEvents(d.toString());
                    } else {
                        loadEmptyEvents(`${d} ${m.name}`);
                    }

                    // Collapse Cube view & overlay events list into focus
                    calendarCubeViewport.classList.add('cube-collapsed');
                    dayEventsPanel.classList.add('panel-visible');
                    backToCubeBtn.classList.remove('hidden-btn');
                });

                daysGrid.appendChild(dayCell);
            }

            module.appendChild(daysGrid);
            container.appendChild(module);
        });

        // Set up Hover listeners for 3D rotations
        setupCubeRotations();
    }

    function setupCubeRotations() {
        const arrowTop = document.getElementById('cube-arrow-top');
        const arrowLeft = document.getElementById('cube-arrow-left');
        const arrowRight = document.getElementById('cube-arrow-right');
        const arrows = [arrowTop, arrowLeft, arrowRight];

        function clearActiveArrows() {
            arrows.forEach(a => {
                if (a) a.classList.remove('active-arrow');
            });
        }

        // Hover face focus angles:
        // Front (Feb): Straight view
        faceFeb.addEventListener('mouseenter', () => {
            clearActiveArrows();
            calendarCube.style.transform = 'rotateX(-5deg) rotateY(0deg)';
        });
        
        // Top (Mar): Tilt 90deg down to face user
        faceMar.addEventListener('mouseenter', () => {
            clearActiveArrows();
            calendarCube.style.transform = 'rotateX(-90deg) rotateY(0deg)';
        });

        // Right (Apr): Spin 90deg left to face user
        faceApr.addEventListener('mouseenter', () => {
            clearActiveArrows();
            calendarCube.style.transform = 'rotateX(-5deg) rotateY(-90deg)';
        });

        // Reset to angled isometric perspective on mouse exit viewport (only if no arrow is active)
        calendarCubeViewport.addEventListener('mouseleave', () => {
            const hasActiveArrow = arrows.some(a => a && a.classList.contains('active-arrow'));
            if (!calendarCubeViewport.classList.contains('cube-collapsed') && !hasActiveArrow) {
                calendarCube.style.transform = 'rotateX(-32deg) rotateY(-45deg)';
            }
        });

        // Arrow click handlers
        if (arrowTop) {
            arrowTop.addEventListener('click', (e) => {
                e.stopPropagation();
                if (arrowTop.classList.contains('active-arrow')) {
                    clearActiveArrows();
                    calendarCube.style.transform = 'rotateX(-32deg) rotateY(-45deg)';
                } else {
                    clearActiveArrows();
                    arrowTop.classList.add('active-arrow');
                    calendarCube.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                }
            });
        }

        if (arrowLeft) {
            arrowLeft.addEventListener('click', (e) => {
                e.stopPropagation();
                if (arrowLeft.classList.contains('active-arrow')) {
                    clearActiveArrows();
                    calendarCube.style.transform = 'rotateX(-32deg) rotateY(-45deg)';
                } else {
                    clearActiveArrows();
                    arrowLeft.classList.add('active-arrow');
                    calendarCube.style.transform = 'rotateX(-5deg) rotateY(0deg)';
                }
            });
        }

        if (arrowRight) {
            arrowRight.addEventListener('click', (e) => {
                e.stopPropagation();
                if (arrowRight.classList.contains('active-arrow')) {
                    clearActiveArrows();
                    calendarCube.style.transform = 'rotateX(-32deg) rotateY(-45deg)';
                } else {
                    clearActiveArrows();
                    arrowRight.classList.add('active-arrow');
                    calendarCube.style.transform = 'rotateX(-5deg) rotateY(-90deg)';
                }
            });
        }
    }

    // "BACK" button handler: Restore cube and hide events panel
    backToCubeBtn.addEventListener('click', () => {
        // Expand cube viewport & restore normal sidebar
        calendarCubeViewport.classList.remove('cube-collapsed');
        dayEventsPanel.classList.remove('panel-visible');
        backToCubeBtn.classList.add('hidden-btn');
        
        // Reset selections
        document.querySelectorAll('.calendar-day').forEach(cell => {
            cell.classList.remove('selected');
        });

        // Clear active arrows
        document.querySelectorAll('.cube-nav-arrow').forEach(a => {
            a.classList.remove('active-arrow');
        });

        // Reset details panel state
        setTimeout(() => {
            calendarPanelTitle.textContent = "SELECT A TEMPORAL NODE";
            calendarPanelDate.textContent = "No cycle loaded";
            calendarEventsList.innerHTML = `
                <div class="no-events-prompt">Click a highlighted day grid cell to query local verse event timelines.</div>
            `;
            // Restore default angle
            calendarCube.style.transform = 'rotateX(-32deg) rotateY(-45deg)';
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
            
            // Get correct badge color theme based on verse
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

            // Trigger visual feedback toast on clicking registration link
            const link = card.querySelector('.register-btn-link');
            link.addEventListener('click', (e) => {
                showToast(evt.name, verseColor);
            });

            // Hover transitions
            link.addEventListener('mouseenter', () => {
                link.style.backgroundColor = verseColor;
                link.style.color = '#000000';
            });
            link.addEventListener('mouseleave', () => {
                link.style.backgroundColor = 'rgba(255,255,255,0.05)';
                link.style.color = '#ffffff';
            });

            // Dynamic color glow transitions on card itself
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

    /* ==========================================================================
       Specific Event Details Modal (Triggered by clicking Event nodes)
       ========================================================================== */
    function openEventDetailModal(evt, verseKey) {
        const verse = verseData[verseKey];
        if (!verse) return;

        // Set dynamic content in modal
        modalVerseBadge.textContent = verse.badge;
        modalVerseBadge.style.color = verse.color;
        modalVerseBadge.style.borderColor = verse.color;
        modalVerseTitle.textContent = evt.name;
        modalVerseDesc.textContent = `${verse.title} // DETAILED BRIEF`;
        
        // Set background glow color matching the verse portal
        document.querySelector('.modal-glow-back').style.background = `radial-gradient(circle, ${verse.glow} 0%, transparent 70%)`;
        document.querySelector('.modal-container').style.borderColor = `rgba(${hexToRgb(verse.color)}, 0.25)`;

        // Inject Events List with only the selected single card details
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
        
        // Trigger feedback toast on registration
        const link = card.querySelector('.register-btn-link');
        link.addEventListener('click', (e) => {
            showToast(evt.name, verse.color);
        });

        // Button Hover effect
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

        // Dynamic color glow transitions on modal card itself
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

        // Open screen blur and modal container
        canvas.classList.add('blur-background');
        eventModal.classList.remove('hidden');
        setTimeout(() => {
            eventModal.classList.add('active-modal');
        }, 50);
    }

    // Close Modal Event Handler
    function closeModal() {
        eventModal.classList.remove('active-modal');
        canvas.classList.remove('blur-background');
        
        setTimeout(() => {
            eventModal.classList.add('hidden');
        }, 400);
    }

    closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal if clicking outside the container
    eventModal.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            closeModal();
        }
    });

    /* ==========================================================================
       Toast Helper Functions
       ========================================================================== */
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

    // Helper: Hex Color to RGB CSV string converter
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

    // Brochure download mock simulator
    const brochureBtn = document.getElementById('brochure-btn');
    if (brochureBtn) {
        brochureBtn.addEventListener('click', () => {
            showToast("Brochure Download Sequence", "var(--ent-color)");
        });
    }

    // requestAnimationFrame Orbit Loop
    function tickOrbit() {
        if (!isOrbitPaused && !eventModal.classList.contains('active-modal')) {
            // Base speed is 0.04 (calm, steady drift). If a portal is active, slow down to 0.01 (extremely slow crawl) for easy clicking.
            const speed = activeVerse ? 0.01 : 0.04;
            orbitAngle = (orbitAngle + speed) % 360;
            if (portalOrbitWrapper) {
                portalOrbitWrapper.style.transform = `rotate(${orbitAngle}deg)`;
                
                // Keep child wrappers upright (perfectly horizontal counter-rotation)
                portalOrbitWrapper.querySelectorAll('.portal-upright-wrapper, .event-upright-wrapper').forEach(child => {
                    child.style.transform = `rotate(${-orbitAngle}deg)`;
                });
            }
        }
        requestAnimationFrame(tickOrbit);
    }

    // JS Scroll Ticker auto-scroll & pause on hover logic
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

        // Loop scrolling infinitely for BOTH manual scrollbar drag/wheel and auto scroll
        vp.addEventListener('scroll', () => {
            const halfHeight = track.scrollHeight / 2;
            if (vp.scrollTop >= halfHeight - 1) {
                vp.scrollTop = vp.scrollTop - halfHeight;
            } else if (vp.scrollTop <= 0) {
                vp.scrollTop = halfHeight;
            }
        });
        
        // Pause scrolling on mouse enter (allows manual scrolling!)
        vp.addEventListener('mouseenter', () => {
            clearInterval(scrollInterval);
        });
        
        // Resume scrolling on mouse leave
        vp.addEventListener('mouseleave', () => {
            startAutoScroll();
        });
    });

    /* ==========================================================================
       Editorial Gallery Controls (Vero Studio Inspired)
       ========================================================================== */
    const galleryGrid = document.getElementById('gallery-grid');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const galleryCards = document.querySelectorAll('.gallery-card');
    const aboutGalleryBtn = document.getElementById('about-gallery-btn');
    
    // Lightbox Components
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTag = document.getElementById('lightbox-tag');
    const lightboxTitle = document.getElementById('lightbox-title');
    const closeLightboxBtn = document.getElementById('close-lightbox-btn');
    const prevLightboxBtn = document.getElementById('prev-lightbox-btn');
    const nextLightboxBtn = document.getElementById('next-lightbox-btn');
    
    let currentFilteredCards = [];
    let activeLightboxIdx = 0;

    // Helper to calculate unique filtered cards for the lightbox sequence
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

    // Initialize list
    updateFilteredCards();

    // Filter Logic
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
            
            // Recalculate unique list for lightbox sequence
            updateFilteredCards();
        });
    });

    // Lightbox Open Trigger
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
            // Transfer specific verse design class
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

    // Connect Gallery Button from About Page Explorer
    if (aboutGalleryBtn) {
        aboutGalleryBtn.addEventListener('click', () => {
            const gallerySec = document.getElementById('gallery-page');
            if (gallerySec) {
                triggerPageGlitch(gallerySec);
                gallerySec.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (lightbox && !lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
    });

    tickOrbit();
});
