/**
 * Pravāah '26 - Orbit Photo Gallery
 * High-Performance 3D Wall Corridor Flythrough Engine
 * Optimized for 60/120fps hardware-accelerated rendering, zero-allocation RAF loop,
 * intelligent scroll/touch passthrough, and seamless responsiveness across all screen sizes.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 14 Photo Dossier Collection (with lightweight web-optimized thumbnails for 60fps 3D rendering)
    const photoCollection = [
        {
            id: 'photo-1',
            title: 'FASHION SHOW',
            category: 'STAGE PERFORMANCE',
            badge: 'GRAND STAGE',
            edition: 'PRAVAAH 2026',
            resolution: '3712 x 4100',
            image: 'assets/images/gallery/Fashion_show.jpg',
            thumb: 'assets/images/gallery/thumbs/Fashion_show.jpg',
            description: 'A high-energy stage event where students showcase creativity, costume design, and runway presence. It blends design, music, choreography, and dramatic lighting.',
            highlights: [
                'Captured during high-speed goal scoring sequence.',
                'Multi-directional arena lighting calibrated to 5600K.',
                'Sub-millisecond exposure capturing dynamic field action.'
            ]
        },
        {
            id: 'photo-2',
            title: 'FACE PAINTING',
            category: 'CULTURAL & PRONITES',
            badge: 'STAR NIGHT',
            edition: 'PRAVAAH 2026',
            resolution: '5472 x 3648 (RAW)',
            image: 'assets/images/gallery/Face_painting.JPG',
            thumb: 'assets/images/gallery/thumbs/Face_painting.jpg',
            description: 'A vibrant, interactive art competition and stall activity commonly featured in college fests. It transforms the human face and neck into a live canvas to showcase creativity, storytelling, and technical skill.',
            highlights: [
                'Wide-angle stadium capture from the central sound mixing tower.',
                'Crowd density estimated at 12,000+ multiverse festival participants.',
                'Pyrotechnic burst timed synchronously to the bass drop.'
            ]
        },
        {
            id: 'photo-3',
            title: 'INFORMAL NIGHT',
            category: 'STAGE PERFORMANCE',
            badge: 'COMBAT ARENA',
            edition: 'PRAVAAH 2026',
            resolution: '6000 x 4000 (RAW)',
            image: 'assets/images/gallery/Informal_night.JPG',
            thumb: 'assets/images/gallery/thumbs/Informal_night.jpg',
            description: 'A energetic, relaxed, and highly interactive singing and dancing and star-studded concert nights',
            highlights: [
                'High-speed shutter capture at 1/4000s.',
                'Bullet-resistant polycarbonate barrier reflection accentuation.',
                'Titanium chassis impact sparks frozen at 240fps trajectory.'
            ]
        },
        {
            id: 'photo-4',
            title: 'GROUP DANCE',
            category: 'CULTURAL & PRONITES',
            badge: '5v5 LAN',
            edition: 'PRAVAAH 2026',
            resolution: '5760 x 3840 (RAW)',
            image: 'assets/images/gallery/Group_dance.JPG',
            thumb: 'assets/images/gallery/thumbs/Group_dance.jpg',
            description: 'One of the most exciting and high-energy competitive events at a college cultural fest, bringing together synchronization, storytelling, and crowd appeal.',
            highlights: [
                'Stage lighting synced to team color scheme.',
                'Ultra-low ambient illumination with OLED monitor backglow.',
                'Player focus capture during the overtime grand finals.'
            ]
        },
        {
            id: 'photo-5',
            title: 'COMEDY NIGHT',
            category: 'STAGE & SHOWCASE',
            badge: 'RUNWAY SHOW',
            edition: 'PRAVAAH 2026',
            resolution: '6000 x 4000 (RAW)',
            image: 'assets/images/gallery/CN.jpg',
            thumb: 'assets/images/gallery/thumbs/CN.jpg',
            description: ' Professional, well-known comedians are booked to perform a marquee set, often drawing the largest ticketed or open-air campus crowds.',
            highlights: [
                'Dramatic low-angle runway perspective.',
                'Dual-tone rim lighting emphasizing cyber-couture textures.',
                'Runway laser array projected across the main auditorium.'
            ]
        },
        {
            id: 'photo-6',
            title: 'ROBO LEAGUE',
            category: 'STAGE PERFORMANCE',
            badge: 'LIVE MUSIC',
            edition: 'PRAVAAH 2026',
            resolution: '5184 x 3456 (RAW)',
            image: 'assets/images/gallery/Robo_League.JPG',
            thumb: 'assets/images/gallery/thumbs/Robo_League.jpg',
            description: 'One of the most popular and high-energy robotics competitions hosted during college technical festivals. In this event, student teams design, build, and control robots that compete in a fast-paced, soccer-style match inside a structured arena.',
            highlights: [
                'Stage fog diffusion with atmospheric backlighting.',
                'Lead guitarist captured mid-air during festival finale.',
                'Acoustic reverberation lighting mapped to audio frequencies.'
            ]
        },
        {
            id: 'photo-7',
            title: 'BLAST OFF',
            category: 'TECH & ROBOTICS',
            badge: 'INNOVATION HUB',
            edition: 'PRAVAAH 2026',
            resolution: '6000 x 4000 (RAW)',
            image: 'assets/images/gallery/Blast_off.jpg',
            thumb: 'assets/images/gallery/thumbs/Blast_off.jpg',
            description: ' Teams build custom aerodynamic rockets using plastic bottles. The propulsion system relies entirely on a mix of pressurized air and water.',
            highlights: [
                'Interactive pitch deck capture under neon showcase illumination.',
                'Venture panel evaluating autonomous edge-AI prototypes.',
                'Real-time hologram projection display mounted at center booth.'
            ]
        },
        {
            id: 'photo-8',
            title: 'STARTUP EXPO',
            category: 'TECH & ROBOTICS',
            badge: 'LIVE CONCERT',
            edition: 'PRAVAAH 2026',
            resolution: '5760 x 3840 (RAW)',
            image: 'assets/images/gallery/Startup_Expo.JPG',
            thumb: 'assets/images/gallery/thumbs/Startup_Expo.jpg',
            description: 'A platform for emerging student ventures, early-stage startups, and innovative tech products to pitch their ideas to investors, industry experts, and thousands of attendees.',
            highlights: [
                'Overhead arena rig framing the 360-degree LED stage.',
                'Dynamic crowd wave illuminated by wristband LED telemetry.',
                'Sound pressure peak reading 104dB at concert epicenter.'
            ]
        },
        {
            id: 'photo-9',
            title: 'STREET BATTLE',
            category: 'CULTURAL & PRONITES',
            badge: 'SOLO / DUO',
            edition: 'PRAVAAH 2026',
            resolution: '6000 x 4000 (RAW)',
            image: 'assets/images/gallery/Street_Battle.JPG',
            thumb: 'assets/images/gallery/thumbs/Street_Battle.jpg',
            description: ' An underground, raw, and high-adrenaline dance competition featuring popping, locking, breaking, and krumping inside a tight circle.',
            highlights: [
                'High-contrast spotlight isolating the soloist on dark stage.',
                'Choreography freeze shot capturing airborne pirouette.',
                'Reflective stage floor creating symmetrical motion mirror.'
            ]
        },
        {
            id: 'photo-10',
            title: 'IPL AUCTION',
            category: 'STAGE & SHOWCASE',
            badge: 'HACKATHON',
            edition: 'PRAVAAH 2026',
            resolution: '6000 x 4000 (RAW)',
            image: 'assets/images/gallery/IPL_auction.JPG',
            thumb: 'assets/images/gallery/thumbs/IPL_auction.jpg',
            description: ' A high-stakes mock sports management simulation where participants step into the shoes of IPL franchise owners to bid on players.',
            highlights: [
                '36-hour non-stop development marathon capture.',
                'Multi-monitor workstation matrices lit by neon ambient bias.',
                'Final sprint commits recorded at 04:30 AM before demo deadline.'
            ]
        },
        {
            id: 'photo-11',
            title: 'FOOD STALL',
            category: 'STAGE & SHOWCASE',
            badge: 'LIVE ORCHESTRA',
            edition: 'PRAVAAH 2026',
            resolution: '5472 x 3648 (RAW)',
            image: 'assets/images/gallery/Food_stall.JPG',
            thumb: 'assets/images/gallery/thumbs/Food_stall.jpg',
            description: ' The bustling culinary heartbeat of the festival ground, offering vibrant street food, creative treats, and community hangouts.',
            highlights: [
                'Low-light lens performance highlighting instrument brass reflections.',
                'Conductor movement blurred while concertmaster is razor sharp.',
                'Auditorium acoustic treatment visible in architectural background.'
            ]
        },
        {
            id: 'photo-12',
            title: 'INNOVATION EXPO',
            category: 'TECH & ROBOTICS',
            badge: 'AERIAL ARENA',
            edition: 'PRAVAAH 2026',
            resolution: '6000 x 4000 (RAW)',
            image: 'assets/images/gallery/Innovatio_Expo.JPG',
            thumb: 'assets/images/gallery/thumbs/Innovatio_Expo.jpg',
            description: ' A cutting-edge technology exhibition where student inventors and engineers display revolutionary engineering projects.',
            highlights: [
                'LED gate tracking drone trajectory through obstacle hoops.',
                'FPV pilot concentration captured with carbon-chassis blur.',
                'Millisecond split-timer overlaying the flyby gate exit.'
            ]
        },
        {
            id: 'photo-13',
            title: 'GENERAL QUIZ',
            category: 'STAGE & SHOWCASE',
            badge: 'THEATRE ARTS',
            edition: 'PRAVAAH 2026',
            resolution: '5184 x 3456 (RAW)',
            image: 'assets/images/gallery/General_quiz.JPG',
            thumb: 'assets/images/gallery/thumbs/General_quiz.jpg',
            description: ' A battle of wits, trivia, and rapid deduction covering pop culture, history, science, cinema, and current affairs.',
            highlights: [
                'Chiaroscuro side-lighting creating intense theatrical mood.',
                'Authentic expression capture at climatic script revelation.',
                'Custom painted backdrop illuminated by warm Fresnel lanterns.'
            ]
        },
        {
            id: 'photo-14',
            title: 'DATA SCIENCE HACKATHON',
            category: 'TECH & ROBOTICS',
            badge: 'INTERACTIVE',
            edition: 'PRAVAAH 2026',
            resolution: '6000 x 4000 (RAW)',
            image: 'assets/images/gallery/Data_science_hackathon.JPG',
            thumb: 'assets/images/gallery/thumbs/Data_science_hackathon.jpg',
            description: ' An intense analytical coding sprint where competitors train predictive models, analyze complex datasets, and build AI solutions.',
            highlights: [
                'Projection mapping dynamic graphics over historic quadrangle.',
                'Audience silhouettes gazing into the generative laser dome.',
                'Long exposure light trails weaving between campus pillars.'
            ]
        }
    ];

    // Preload & pre-decode all 14 thumbnails into GPU cache immediately
    photoCollection.forEach(photo => {
        const img = new Image();
        img.src = photo.thumb || photo.image;
        if (img.decode) {
            img.decode().catch(() => {});
        }
    });

    // Corridor Stage Configuration
    const zStep = 900; // Spacing between consecutive photo cards along the Z-axis
    let filteredCollection = [...photoCollection];

    // DOM Elements
    const corridorViewport = document.getElementById('corridor-viewport');
    const corridorStage = document.getElementById('corridor-stage');
    const floorPlane = document.getElementById('floor-plane');
    const ceilingPlane = document.getElementById('ceiling-plane');
    const hudProgressBar = document.getElementById('hud-progress-bar');
    const hudProgressThumb = document.getElementById('hud-progress-thumb');
    const hudProgressContainer = document.getElementById('hud-progress-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const corridorNavPrev = document.getElementById('corridor-nav-prev');
    const corridorNavNext = document.getElementById('corridor-nav-next');

    // Modal Dossier Elements
    const modalOverlay = document.getElementById('photo-dossier-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalImage = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalDownloadBtn = document.getElementById('modal-download-btn');

    // Camera Navigation State
    let currentCameraZ = 0;
    let cameraVelocity = 0;
    let targetVelocity = 0;
    let maxCameraZ = filteredCollection.length * zStep;
    let endSceneZ = -(filteredCollection.length * zStep);
    let isReturningToEntrance = false;
    let mobileTargetCameraZ = null;
    let lastTimestamp = 0;
    let wasTouchDragging = false;
    let isTouching = false;
    let isDragging = false;
    let currentModalPhoto = null;

    // Pre-cached card references for zero-allocation RAF loop
    let cachedCards = [];
    let cachedFinalFrame = null;
    let cachedScrollHintEl = null;

    // Responsive Wall Corridor Geometry Metrics
    function getResponsiveWallGeometry(width) {
        if (width <= 360) {
            return {
                wallOffset: 40,
                wallAngle: 7,
                centerBlendDist: 700,
                centerOffsetRatio: 0.0,
                driftAmount: 130
            };
        } else if (width <= 480) {
            return {
                wallOffset: 60,
                wallAngle: 8,
                centerBlendDist: 700,
                centerOffsetRatio: 0.0,
                driftAmount: 150
            };
        } else if (width <= 768) {
            return {
                wallOffset: 110,
                wallAngle: 10,
                centerBlendDist: 700,
                centerOffsetRatio: 0.08,
                driftAmount: 190
            };
        } else if (width <= 1024) {
            return {
                wallOffset: 200,
                wallAngle: 13,
                centerBlendDist: 680,
                centerOffsetRatio: 0.32,
                driftAmount: 240
            };
        } else {
            return {
                wallOffset: 310,
                wallAngle: 16,
                centerBlendDist: 650,
                centerOffsetRatio: 0.55,
                driftAmount: 300
            };
        }
    }

    let currentGeom = getResponsiveWallGeometry(window.innerWidth);

    // Build 3D Stage (Photo Cards on alternating Left/Right walls + THE FINAL FRAME End Scene)
    function buildCorridorStage() {
        if (!corridorStage) return;

        corridorStage.innerHTML = '';
        cachedCards = [];
        endSceneZ = -(filteredCollection.length * zStep);
        maxCameraZ = filteredCollection.length * zStep;

        filteredCollection.forEach((photo, idx) => {
            const card = document.createElement('article');
            card.className = 'orbit-corridor-card';
            card.setAttribute('data-id', photo.id);
            card.setAttribute('data-index', idx);

            const thumbSrc = photo.thumb || photo.image;

            card.innerHTML = `
                <div class="corridor-card-img-box">
                    <img src="${thumbSrc}" alt="${photo.title}" loading="eager" decoding="async" onerror="if (!this.dataset.fallback) { this.dataset.fallback = '1'; this.src = '${photo.image}'; }" />
                    <div class="card-img-overlay"></div>
                </div>
                
                <div class="card-text-body">
                    <h3 class="card-title">${photo.title}</h3>
                    <p class="card-description">${photo.description}</p>
                </div>

                <button class="card-action-btn" type="button">
                    <span>✦ INSPECT DOSSIER</span>
                </button>
            `;

            card.addEventListener('click', () => {
                if (wasTouchDragging) return;
                openDossierModal(photo);
            });

            corridorStage.appendChild(card);

            cachedCards.push({
                element: card,
                idx: idx,
                cardZ: -idx * zStep,
                isLeft: (idx % 2 === 0),
                state: 'unknown',
                isNearest: false,
                canPointer: false
            });
        });

        // Append "THE FINAL FRAME" End-of-Corridor Portal Scene
        const finalFrame = document.createElement('div');
        finalFrame.className = 'corridor-final-frame';
        finalFrame.id = 'corridor-final-frame';
        finalFrame.style.setProperty('--fz', `${endSceneZ}px`);

        finalFrame.innerHTML = `
            <div class="final-frame-content">
                <span class="final-badge">✦ ARCHIVE DESTINATION ✦</span>
                <h2 class="final-heading">THE FINAL FRAME</h2>
                <p class="final-subtext">“Every moment leaves a light behind.”</p>
                <div class="final-small-line">END OF ARCHIVE</div>
            </div>

            <button class="final-return-btn" id="final-return-btn" type="button">
                <span>✦ RETURN TO ENTRANCE ✦</span>
            </button>
        `;

        corridorStage.appendChild(finalFrame);
        cachedFinalFrame = finalFrame;

        const returnBtn = finalFrame.querySelector('#final-return-btn');
        if (returnBtn) {
            returnBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (isReturningToEntrance) return;
                mobileTargetCameraZ = null;
                isReturningToEntrance = true;
                targetVelocity = 0;
                cameraVelocity = 0;
            });
        }

        cachedScrollHintEl = document.getElementById('corridor-scroll-hint-text');
        lastProgressPct = -1;
        updateHUDTracker();
    }

    // Frame-Rate Independent Animation Frame Loop with Seamless Continuous Transforms (Zero DOM Queries)
    function updateCorridorFrame(timestamp) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const deltaTime = Math.min((timestamp - lastTimestamp) / 16.6667, 2);
        lastTimestamp = timestamp;

        // Smooth Return to Entrance Animation
        if (isReturningToEntrance) {
            mobileTargetCameraZ = null;
            const dist = 0 - currentCameraZ;
            currentCameraZ += dist * Math.min(1, 0.14 * deltaTime);
            cameraVelocity = 0;
            targetVelocity = 0;

            if (Math.abs(currentCameraZ) <= 1.0) {
                currentCameraZ = 0;
                cameraVelocity = 0;
                targetVelocity = 0;
                isReturningToEntrance = false;
                updateHUDTracker();
            }
        } else if (mobileTargetCameraZ !== null) {
            const dist = mobileTargetCameraZ - currentCameraZ;
            if (Math.abs(dist) > 0.8) {
                currentCameraZ += dist * Math.min(1, 0.16 * deltaTime);
                cameraVelocity = 0;
                targetVelocity = 0;
            } else {
                currentCameraZ = mobileTargetCameraZ;
                mobileTargetCameraZ = null;
                cameraVelocity = 0;
                targetVelocity = 0;
            }
        } else if (!isTouching && !isDragging) {
            // Smooth velocity approach from input
            cameraVelocity += (targetVelocity - cameraVelocity) * 0.20;
            currentCameraZ += cameraVelocity * deltaTime;
            targetVelocity *= Math.pow(0.88, deltaTime);

            // Zero out near-zero threshold values to prevent infinite micro-floating
            if (Math.abs(targetVelocity) < 0.05 && Math.abs(cameraVelocity) < 0.05) {
                targetVelocity = 0;
                cameraVelocity = 0;
            }

            // Clamp bounds
            if (currentCameraZ <= 0) {
                currentCameraZ = 0;
                cameraVelocity = 0;
                targetVelocity = 0;
            } else if (currentCameraZ >= maxCameraZ) {
                currentCameraZ = maxCameraZ;
                cameraVelocity = 0;
                targetVelocity = 0;
            }
        }

        // Velocity sway
        const velSwayY = Math.max(-2.5, Math.min(2.5, cameraVelocity * 0.08));
        const velRoll = Math.max(-0.25, Math.min(0.25, cameraVelocity * 0.012));
        const swayY = Math.sin(currentCameraZ * 0.0012) * 1.5 + velSwayY;
        const swayRoll = Math.cos(currentCameraZ * 0.0012) * 0.08 + velRoll;

        // Apply 3D Stage Camera Transform
        if (corridorStage) {
            corridorStage.style.transform = `translate3d(0px, ${swayY.toFixed(2)}px, ${currentCameraZ.toFixed(1)}px) rotateZ(${swayRoll.toFixed(2)}deg)`;
        }

        // Infinite floor & ceiling grid scrolling (zero geometric layout shifts!)
        const gridShift = (currentCameraZ * 0.16) % 70;
        if (floorPlane) {
            floorPlane.style.backgroundPositionY = `${gridShift.toFixed(1)}px`;
        }
        if (ceilingPlane) {
            ceilingPlane.style.backgroundPositionY = `${(-gridShift).toFixed(1)}px`;
        }

        // Ultra-Efficient Cached Wall Photo Cards Loop
        const numCards = cachedCards.length;
        for (let i = 0; i < numCards; i++) {
            const cardData = cachedCards[i];
            const card = cardData.element;
            const cardZ = cardData.cardZ;
            const origX = cardData.isLeft ? -currentGeom.wallOffset : currentGeom.wallOffset;
            const origRotateY = cardData.isLeft ? currentGeom.wallAngle : -currentGeom.wallAngle;

            const relZ = cardZ + currentCameraZ;
            const absRelZ = Math.abs(relZ);

            if (relZ > 450) {
                // Fully behind viewer
                if (cardData.state !== 'exit-past') {
                    cardData.state = 'exit-past';
                    card.style.opacity = '0';
                    if (cardData.canPointer) {
                        cardData.canPointer = false;
                        card.style.pointerEvents = 'none';
                    }
                    if (cardData.isNearest) {
                        cardData.isNearest = false;
                        card.classList.remove('is-nearest');
                    }
                }
            } else if (relZ > 0) {
                // Smooth continuous exit drift (0 < relZ <= 450)
                cardData.state = 'exit-drift';
                const exitRatio = relZ / 450;
                const exitEase = exitRatio * exitRatio;

                const focalX = origX * currentGeom.centerOffsetRatio;
                const focalRotateY = origRotateY * 0.15;

                const exitX = focalX + (origX >= 0 ? currentGeom.driftAmount : -currentGeom.driftAmount) * exitEase;
                const exitRotate = focalRotateY + (origX >= 0 ? -12 : 12) * exitRatio;
                const scale = 1.0 + 0.18 * exitRatio;
                const opacity = Math.max(0, 1 - exitRatio * 1.35);

                card.style.transform = `translate3d(${exitX.toFixed(1)}px, 0px, ${cardZ}px) rotateY(${exitRotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
                card.style.opacity = opacity.toFixed(3);

                if (cardData.canPointer) {
                    cardData.canPointer = false;
                    card.style.pointerEvents = 'none';
                }
                if (cardData.isNearest) {
                    cardData.isNearest = false;
                    card.classList.remove('is-nearest');
                }
            } else if (relZ >= -3600) {
                // In view corridor (-3600 <= relZ <= 0)
                cardData.state = 'in-view';
                const depthRatio = (relZ + 3600) / 3600;
                const scale = 0.35 + 0.65 * depthRatio;
                const opacity = Math.min(1, Math.max(0.1, depthRatio * 1.35));

                let activeX = origX;
                let activeRotateY = origRotateY;

                if (relZ > -currentGeom.centerBlendDist) {
                    const focalProgress = (relZ + currentGeom.centerBlendDist) / currentGeom.centerBlendDist;
                    const smoothEase = focalProgress * focalProgress * (3 - 2 * focalProgress);
                    activeX = origX * (1 - smoothEase * (1 - currentGeom.centerOffsetRatio));
                    activeRotateY = origRotateY * (1 - smoothEase * 0.85);
                }

                card.style.transform = `translate3d(${activeX.toFixed(1)}px, 0px, ${cardZ}px) rotateY(${activeRotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
                card.style.opacity = opacity.toFixed(3);

                const canPointer = opacity > 0.4;
                if (cardData.canPointer !== canPointer) {
                    cardData.canPointer = canPointer;
                    card.style.pointerEvents = canPointer ? 'auto' : 'none';
                }

                const isNearest = absRelZ < 350;
                if (cardData.isNearest !== isNearest) {
                    cardData.isNearest = isNearest;
                    if (isNearest) {
                        card.classList.add('is-nearest');
                    } else {
                        card.classList.remove('is-nearest');
                    }
                }
            } else {
                // Far horizon
                if (cardData.state !== 'far') {
                    cardData.state = 'far';
                    card.style.opacity = '0';
                    if (cardData.canPointer) {
                        cardData.canPointer = false;
                        card.style.pointerEvents = 'none';
                    }
                    if (cardData.isNearest) {
                        cardData.isNearest = false;
                        card.classList.remove('is-nearest');
                    }
                }
            }
        }

        // Update Final Frame
        if (cachedFinalFrame) {
            const finalRelZ = endSceneZ + currentCameraZ;
            if (finalRelZ > 450) {
                cachedFinalFrame.style.opacity = '0';
                cachedFinalFrame.style.pointerEvents = 'none';
            } else if (finalRelZ > 0) {
                const exitRatio = Math.min(1, finalRelZ / 450);
                const scale = 1.0 + 0.2 * exitRatio;
                const opacity = Math.max(0, 1 - exitRatio * 1.2);
                cachedFinalFrame.style.transform = `translate3d(0px, 0px, ${endSceneZ}px) rotateY(0deg) scale(${scale.toFixed(3)})`;
                cachedFinalFrame.style.opacity = opacity.toFixed(3);
                cachedFinalFrame.style.pointerEvents = 'none';
            } else if (finalRelZ >= -3600) {
                const depthRatio = (finalRelZ + 3600) / 3600;
                const scale = 0.4 + 0.6 * depthRatio;
                const opacity = Math.min(1, Math.max(0.08, depthRatio * 1.25));
                cachedFinalFrame.style.transform = `translate3d(0px, 0px, ${endSceneZ}px) rotateY(0deg) scale(${scale.toFixed(3)})`;
                cachedFinalFrame.style.opacity = opacity.toFixed(3);
                cachedFinalFrame.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
            } else {
                cachedFinalFrame.style.opacity = '0';
                cachedFinalFrame.style.pointerEvents = 'none';
            }
        }

        // Scroll Hint Fading
        if (cachedScrollHintEl) {
            const hintOpacity = currentCameraZ > 300 ? '0.35' : '1';
            if (cachedScrollHintEl.style.opacity !== hintOpacity) {
                cachedScrollHintEl.style.opacity = hintOpacity;
            }
        }

        // HUD tracker
        updateHUDTracker();

        // Prev / Next button states
        if (corridorNavPrev) {
            const prevDisabled = currentCameraZ <= 50;
            if (corridorNavPrev.disabled !== prevDisabled) {
                corridorNavPrev.disabled = prevDisabled;
                corridorNavPrev.style.opacity = prevDisabled ? '0.35' : '1';
                corridorNavPrev.style.pointerEvents = prevDisabled ? 'none' : 'auto';
            }
        }
        if (corridorNavNext) {
            const nextDisabled = currentCameraZ >= maxCameraZ - 50;
            if (corridorNavNext.disabled !== nextDisabled) {
                corridorNavNext.disabled = nextDisabled;
                corridorNavNext.style.opacity = nextDisabled ? '0.35' : '1';
                corridorNavNext.style.pointerEvents = nextDisabled ? 'none' : 'auto';
            }
        }

        requestAnimationFrame(updateCorridorFrame);
    }

    // Update Progress / Seek Line Fill, Thumb, and ARIA Value (Only on change)
    let lastProgressPct = -1;
    function updateHUDTracker() {
        const progress = maxCameraZ > 0 ? Math.min(1, Math.max(0, currentCameraZ / maxCameraZ)) : 0;
        const progressRound = Math.round(progress * 400) / 4;
        if (progressRound !== lastProgressPct) {
            lastProgressPct = progressRound;
            const pctStr = `${progressRound}%`;
            if (hudProgressBar) hudProgressBar.style.width = pctStr;
            if (hudProgressThumb) hudProgressThumb.style.left = pctStr;
            if (hudProgressContainer) {
                hudProgressContainer.setAttribute('aria-valuenow', Math.round(progress * 100));
            }
        }
    }

    // Modal Operations (Loads full high-resolution original image)
    function openDossierModal(photo) {
        if (!modalOverlay) return;
        currentModalPhoto = photo;

        modalImage.onerror = function() {
            if (!this.dataset.fallback) {
                this.dataset.fallback = '1';
                this.src = this.src.endsWith('.jpg') ? this.src.replace(/\.jpg$/i, '.JPG') : this.src.replace(/\.JPG$/i, '.jpg');
            }
        };
        modalImage.dataset.fallback = '';
        modalImage.src = photo.image;
        modalImage.alt = photo.title;
        modalTitle.textContent = photo.title;
        modalDescription.textContent = photo.description;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDossierModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Category Filter Handlers
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            filteredCollection = category === 'ALL'
                ? [...photoCollection]
                : photoCollection.filter(p => p.category === category);

            mobileTargetCameraZ = null;
            currentCameraZ = 0;
            cameraVelocity = 0;
            targetVelocity = 0;
            buildCorridorStage();
        });
    });

    // Return to Entrance Button
    const returnEntranceBtn = document.getElementById('return-entrance-btn');
    if (returnEntranceBtn) {
        returnEntranceBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isReturningToEntrance) return;
            mobileTargetCameraZ = null;
            isReturningToEntrance = true;
            targetVelocity = 0;
            cameraVelocity = 0;
        });
    }

    // Interactive Progress Seek Line (Click & Drag to Scrub Corridor)
    if (hudProgressContainer) {
        let isSeeking = false;

        function seekToPosition(e) {
            const rect = hudProgressContainer.getBoundingClientRect();
            const clickX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
            const ratio = clickX / rect.width;
            currentCameraZ = ratio * maxCameraZ;
            cameraVelocity = 0;
            targetVelocity = 0;
            mobileTargetCameraZ = null;
            isReturningToEntrance = false;
        }

        hudProgressContainer.addEventListener('pointerdown', (e) => {
            e.stopPropagation();
            isSeeking = true;
            seekToPosition(e);
            try { hudProgressContainer.setPointerCapture(e.pointerId); } catch (err) {}
        });

        hudProgressContainer.addEventListener('pointermove', (e) => {
            if (isSeeking) {
                e.stopPropagation();
                seekToPosition(e);
            }
        });

        hudProgressContainer.addEventListener('pointerup', (e) => {
            if (isSeeking) {
                e.stopPropagation();
                isSeeking = false;
                try { hudProgressContainer.releasePointerCapture(e.pointerId); } catch (err) {}
            }
        });

        hudProgressContainer.addEventListener('pointercancel', () => {
            isSeeking = false;
        });
    }

    // =========================================================================
    // TOUCH INTERACTION: Intuitive Swipe-to-Fly with Unrestricted Page Scroll
    // =========================================================================
    let touchStartX = 0;
    let touchStartY = 0;
    let touchLastX = 0;
    let touchLastY = 0;
    let touchLastTime = 0;
    let touchVelocityZ = 0;
    let gestureDirection = null; // 'horizontal' or 'vertical'

    if (corridorViewport) {
        corridorViewport.addEventListener('touchstart', (e) => {
            if (e.target.closest('.final-return-btn, .card-action-btn, .corridor-nav-btn, .return-entrance-btn, #hud-progress-container')) {
                return;
            }
            if (e.touches.length !== 1) return;

            mobileTargetCameraZ = null;
            isReturningToEntrance = false;
            cameraVelocity = 0;
            targetVelocity = 0;

            const t = e.touches[0];
            touchStartX = t.clientX;
            touchStartY = t.clientY;
            touchLastX = t.clientX;
            touchLastY = t.clientY;
            touchLastTime = performance.now();
            touchVelocityZ = 0;
            isTouching = true;
            wasTouchDragging = false;
            gestureDirection = null;
        }, { passive: true });

        corridorViewport.addEventListener('touchmove', (e) => {
            if (!isTouching || e.touches.length !== 1) return;

            const t = e.touches[0];
            const dx = t.clientX - touchStartX;
            const dy = t.clientY - touchStartY;
            const absDx = Math.abs(dx);
            const absDy = Math.abs(dy);

            // Determine gesture intent once 6px motion occurred
            if (!gestureDirection && (absDx > 6 || absDy > 6)) {
                gestureDirection = absDx >= absDy ? 'horizontal' : 'vertical';
            }

            // If vertical swipe: ALLOW NATURAL BROWSER PAGE SCROLLING! User is never trapped!
            if (gestureDirection === 'vertical') {
                return;
            }

            // Horizontal swipe: Fly through 3D corridor with 1:1 finger tracking
            if (e.cancelable) {
                e.preventDefault();
            }

            wasTouchDragging = true;
            const now = performance.now();
            const dt = Math.max(1, now - touchLastTime);
            const stepDeltaX = touchLastX - t.clientX; // Swipe left advances forward (+Z), swipe right goes back (-Z)

            const sensitivity = window.innerWidth <= 480 ? 2.4 : 2.0;
            const zDelta = stepDeltaX * sensitivity;
            currentCameraZ = Math.max(0, Math.min(maxCameraZ, currentCameraZ + zDelta));

            const instantVelocity = (zDelta / dt) * 16.6667;
            touchVelocityZ = touchVelocityZ * 0.4 + instantVelocity * 0.6;

            touchLastX = t.clientX;
            touchLastY = t.clientY;
            touchLastTime = now;
        }, { passive: false });

        corridorViewport.addEventListener('touchend', () => {
            if (!isTouching) return;
            isTouching = false;

            if (wasTouchDragging) {
                setTimeout(() => { wasTouchDragging = false; }, 150);
            }

            if (gestureDirection === 'horizontal') {
                const absV = Math.abs(touchVelocityZ);
                if (absV > 7) {
                    targetVelocity = Math.max(-50, Math.min(50, touchVelocityZ * 0.8));
                    cameraVelocity = targetVelocity;
                } else {
                    // Gentle release: smoothly center nearest card
                    const currentIdx = Math.round(currentCameraZ / zStep);
                    const targetIdx = Math.max(0, Math.min(filteredCollection.length, currentIdx));
                    mobileTargetCameraZ = targetIdx * zStep;
                    targetVelocity = 0;
                    cameraVelocity = 0;
                }
            }
        });

        corridorViewport.addEventListener('touchcancel', () => {
            isTouching = false;
        });

        // Desktop Pointer Drag (Click & Drag to explore corridor)
        let pointerStartX = 0;
        let pointerStartY = 0;
        let pointerLastX = 0;
        let pointerLastY = 0;

        corridorViewport.addEventListener('pointerdown', (e) => {
            if (e.pointerType === 'touch') return;
            if (e.target.closest('button, a, input, select, textarea, .dossier-modal-overlay, #hud-progress-container')) return;

            isDragging = true;
            pointerStartX = e.clientX;
            pointerStartY = e.clientY;
            pointerLastX = e.clientX;
            pointerLastY = e.clientY;
            mobileTargetCameraZ = null;
            isReturningToEntrance = false;
            cameraVelocity = 0;
            targetVelocity = 0;

            try { corridorViewport.setPointerCapture(e.pointerId); } catch (err) {}
        });

        corridorViewport.addEventListener('pointermove', (e) => {
            if (e.pointerType === 'touch' || !isDragging || isReturningToEntrance) return;

            const deltaX = pointerLastX - e.clientX;
            const deltaY = pointerLastY - e.clientY;
            pointerLastX = e.clientX;
            pointerLastY = e.clientY;

            const dominantDelta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
            const clampedDelta = Math.max(-70, Math.min(70, dominantDelta * 2.2));
            targetVelocity += clampedDelta * 0.45;
            targetVelocity = Math.max(-55, Math.min(55, targetVelocity));
        });

        corridorViewport.addEventListener('pointerup', (e) => {
            if (isDragging) {
                isDragging = false;
                try { corridorViewport.releasePointerCapture(e.pointerId); } catch (err) {}
                if (Math.abs(cameraVelocity) < 4 && Math.abs(targetVelocity) < 4) {
                    const currentIdx = Math.round(currentCameraZ / zStep);
                    mobileTargetCameraZ = Math.max(0, Math.min(filteredCollection.length, currentIdx)) * zStep;
                    targetVelocity = 0;
                    cameraVelocity = 0;
                }
            }
        });

        corridorViewport.addEventListener('pointercancel', () => {
            isDragging = false;
        });
    }

    // Prev / Next Navigation Arrows (Smooth one-card step advance)
    if (corridorNavPrev) {
        corridorNavPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isReturningToEntrance) return;
            const currentIdx = Math.round(currentCameraZ / zStep);
            const targetIdx = Math.max(0, currentIdx - 1);
            mobileTargetCameraZ = targetIdx * zStep;
            targetVelocity = 0;
            cameraVelocity = 0;
        });
    }

    if (corridorNavNext) {
        corridorNavNext.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isReturningToEntrance) return;
            const currentIdx = Math.round(currentCameraZ / zStep);
            const targetIdx = Math.min(filteredCollection.length, currentIdx + 1);
            mobileTargetCameraZ = targetIdx * zStep;
            targetVelocity = 0;
            cameraVelocity = 0;
        });
    }

    // Wheel Event Handler with Intelligent Delta Smoothing & Auto-Snap
    let wheelSnapTimeout = null;

    window.addEventListener('wheel', (e) => {
        if (!corridorViewport) return;
        if (isReturningToEntrance) {
            e.preventDefault();
            return;
        }

        // Only capture wheel when mouse is over the corridor viewport
        const isOverCorridor = e.target.closest('#corridor-viewport');
        if (!isOverCorridor) {
            return; // Natural page scrolling over header, footer, and margins
        }

        if (e.target.closest('button, a, input, select, textarea, .dossier-modal-overlay, #photo-dossier-modal, .filter-btn, .final-return-btn')) {
            return;
        }

        const rawDelta = e.deltaY !== undefined ? e.deltaY : (e.detail ? e.detail * 40 : 0);
        if (Math.abs(rawDelta) < 0.5) return;

        // Boundary passthrough:
        // At entrance and scrolling UP: allow normal page scroll up
        if (currentCameraZ <= 2 && rawDelta < 0) return;

        // At final frame and scrolling DOWN: allow normal page scroll down to footer
        if (currentCameraZ >= maxCameraZ - 2 && rawDelta > 0) return;

        e.preventDefault();
        mobileTargetCameraZ = null;

        // Normalized delta power-curve: handles both trackpads (continuous ~2px) and physical notched wheels (~100px)
        const sign = Math.sign(rawDelta);
        const absD = Math.abs(rawDelta);
        const normalized = sign * Math.min(60, Math.pow(absD, 0.75) * 2.2);

        targetVelocity += normalized;
        targetVelocity = Math.max(-50, Math.min(50, targetVelocity));

        // When wheel scrolling stops, gently glide to nearest card showcase position
        clearTimeout(wheelSnapTimeout);
        wheelSnapTimeout = setTimeout(() => {
            if (!isTouching && !isDragging && !isReturningToEntrance && Math.abs(cameraVelocity) < 6) {
                const currentIdx = Math.round(currentCameraZ / zStep);
                mobileTargetCameraZ = Math.max(0, Math.min(filteredCollection.length, currentIdx)) * zStep;
                targetVelocity = 0;
            }
        }, 180);
    }, { passive: false });

    // Smooth Non-Destructive Responsive Resize Listener (zero DOM thrashing, zero image reloads)
    window.addEventListener('resize', () => {
        currentGeom = getResponsiveWallGeometry(window.innerWidth);
        endSceneZ = -(filteredCollection.length * zStep);
        maxCameraZ = filteredCollection.length * zStep;
        if (currentCameraZ > maxCameraZ) {
            currentCameraZ = maxCameraZ;
        }
        updateHUDTracker();
    });

    // Keyboard Arrow Keys Impulse
    document.addEventListener('keydown', (e) => {
        if (isReturningToEntrance) return;
        if (modalOverlay && modalOverlay.classList.contains('active')) {
            if (e.key === 'Escape') closeDossierModal();
            return;
        }

        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
            targetVelocity += 22;
            targetVelocity = Math.max(-50, Math.min(50, targetVelocity));
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
            targetVelocity -= 22;
            targetVelocity = Math.max(-50, Math.min(50, targetVelocity));
        }
    });

    // Modal Close Events
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeDossierModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeDossierModal();
        });
    }

    // Modal Download Button (Downloads full original high-resolution photo)
    if (modalDownloadBtn) {
        modalDownloadBtn.addEventListener('click', () => {
            if (!currentModalPhoto) return;
            const a = document.createElement('a');
            a.href = currentModalPhoto.image;
            a.download = `${currentModalPhoto.title.replace(/\s+/g, '_')}_Pravaah.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

    // Initialize Corridor Stage and Start Animation Loop
    buildCorridorStage();
    requestAnimationFrame(updateCorridorFrame);
});