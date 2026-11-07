/**
 * PHOTO GALLERY — CONTINUOUS VELOCITY-DRIVEN 3D WALL CORRIDOR ENGINE
 * Features 14 wall-mounted photo cards at 900px depth spacing, targetVelocity filtering,
 * frame-rate independent deltaTime lerping, capped sway, and "THE FINAL FRAME" portal.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 14 Photo Dossier Collection
    const photoCollection = [
        {
            id: 'photo-1',
            title: 'FASHION SHOW',
            category: 'TECH & ROBOTICS',
            badge: 'FLAGSHIP TECH',
            edition: 'PRAVAAH 2026',
            resolution: '3712 x 4100',
            image: 'assets/images/gallery/Fashion_show.jpg',
            description: 'A high-energy stage event where students showcase creativity, costume design, and runway presence. It blends design, music, choreography, and dramatic lighting.',
            highlights: [
                'Captured during high-speed goal scoring sequence.',
                'Multi-angle arena lighting with cyan backdrop glow.',
                'Featured in Pravaah 2026 Official Aftermovie.'
            ]
        },
        {
            id: 'photo-2',
            title: 'FACE PAINTING',
            category: 'CULTURAL & PRONITES',
            badge: 'STAR NIGHT',
            edition: 'PRAVAAH 2026',
            resolution: '5472 x 3648 (RAW)',
            image: 'assets/images/gallery/Face_painting.jpg',
            description: 'A vibrant, interactive art competition and stall activity commonly featured in college fests. It transforms the human face and neck into a live canvas to showcase creativity, storytelling, and technical skill.',
            highlights: [
                'Wide-angle stadium capture from the central sound mixing tower.',
                'Synchronized pyrotechnic laser beam array overhead.',
                'Peak festival attendance record moment.'
            ]
        },
        {
            id: 'photo-3',
            title: 'INFORMAL NIGHT',
            category: 'TECH & ROBOTICS',
            badge: 'COMBAT ARENA',
            edition: 'PRAVAAH 2026',
            resolution: '6000 x 4000 (RAW)',
            image: 'assets/images/gallery/Informal_night.jpg',
            description: 'A energetic, relaxed, and highly interactive singing and dancing and star-studded concert nights',
            highlights: [
                'High-speed shutter capture at 1/4000s.',
                'Full arena spark ignition frame.',
                'Judged as Best Action Shot of Pravaah 2026.'
            ]
        },
        {
            id: 'photo-4',
            title: 'GROUP DANCE',
            category: 'ESPORTS ARENA',
            badge: '5v5 LAN',
            edition: 'PRAVAAH 2026',
            resolution: '5760 x 3840 (RAW)',
            image: 'assets/images/gallery/Group_dance.jpg',
            description: 'One of the most exciting and high-energy competitive events at a college cultural fest, bringing together synchronization, storytelling, and crowd appeal.',
            highlights: [
                'Stage lighting synced to team color scheme.',
                'Live shoutcasting booth visible in foreground background.',
                'Over 500 spectators in live audience seating.'
            ]
        },
        {
            id: 'photo-5',
            title: 'COMEDY NIGHT',
            category: 'STAGE & SHOWCASE',
            badge: 'RUNWAY',
            edition: 'PRAVAAH 2026',
            resolution: '6000 x 4000 (RAW)',
            image: 'assets/images/gallery/CN.jpg',
            description: ' Professional, well-known comedians are booked to perform a marquee set, often drawing the largest ticketed or open-air campus crowds.',
            highlights: [
                'Dramatic low-angle runway perspective.',
                'Custom neon LED attire illumination.',
                'National inter-college fashion competition winner.'
            ]
        },
        {
            id: 'photo-6',
            title: 'ROBO LEAGUE',
            category: 'CULTURAL & PRONITES',
            badge: 'LIVE MUSIC',
            edition: 'PRAVAAH 2026',
            resolution: '5184 x 3456 (RAW)',
            image: 'assets/images/gallery/Robo_League.jpg',
            description: 'One of the most popular and high-energy robotics competitions hosted during college technical festivals. In this event, student teams design, build, and control robots that compete in a fast-paced, soccer-style match inside a structured arena.',
            highlights: [
                'Stage fog diffusion with atmospheric backlighting.',
                'Action motion blur on drum kit background.',
                'Captured during peak 90-second guitar solo.'
            ]
        },
        {
            id: 'photo-7',
            title: 'BLAST OFF',
            category: 'STAGE & SHOWCASE',
            badge: 'VENTURE PITCH',
            edition: 'PRAVAAH 2026',
            resolution: '6000 x 4000 (RAW)',
            image: 'assets/images/gallery/Blast_off.jpg',
            description: ' Teams build custom aerodynamic rockets using plastic bottles. The propulsion system relies entirely on a mix of pressurized air and water.',
            highlights: [
                'Interactive pitch deck slide projection overlay.',
                'Q&A jury panel engaged response.',
                '₹1.5 Lakh seed grant award ceremony moment.'
            ]
        },
        {
            id: 'photo-8',
            title: 'INNOVATIO EXPO',
            category: 'TECH & ROBOTICS',
            badge: 'FPV RACING',
            edition: 'PRAVAAH 2026',
            resolution: '6000 x 4000 (RAW)',
            image: 'assets/images/gallery/Innovatio_Expo.jpg',
            description: 'A flagship technical event in a college fest where students showcase research, working models, and software prototypes. Participants present working prototypes and explain their methodology to visitors and peers.',
            highlights: [
                'Motion track trail along LED gate border.',
                'Autonomous flight path telemetry verified.',
                'Record lap time finish moment.'
            ]
        },
        {
            id: 'photo-9',
            title: 'IPL AUCTION',
            category: 'TECH & ROBOTICS',
            badge: 'HACKATHON',
            edition: 'PRAVAAH 2026',
            resolution: '6000 x 4000 (RAW)',
            image: 'assets/images/gallery/IPL_auction.jpg',
            description: 'Simulates the excitement of a real-life cricket franchise auction, combining sports strategy, mental math, and tactical bidding.',
            highlights: [
                'Jeopardy CTF scoreboard live update background.',
                '24-hour non-stop hacking challenge.',
                'Top 3 qualifying teams from 120 national entries.'
            ]
        },
        {
            id: 'photo-10',
            title: 'CULT AND HANDMADE CRAFTS',
            category: 'CULTURAL & PRONITES',
            badge: 'COSPLAY ARENA',
            edition: 'PRAVAAH 2026',
            resolution: '5760 x 3840 (RAW)',
            image: 'assets/images/gallery/Startup_Expo.jpg',
            description: 'Setting up an artisan or craft-centered stall like this at a college fest is a fantastic way to promote cultural heritage, support regional artisans, and offer students unique, sustainable souvenirs.',
            highlights: [
                'Custom 3D printed mech armor details.',
                'Crowd interaction and photography showcase.',
                'Judged on armor craftsmanship and stage walk.'
            ]
        },
        {
            id: 'photo-11',
            title: 'FOOD STALL',
            category: 'ESPORTS ARENA',
            badge: 'MOBILE LAN',
            edition: 'PRAVAAH 2026',
            resolution: '6000 x 4000 (RAW)',
            image: 'assets/images/gallery/Food_stall.jpg',
            description: 'Combine creative cooking, fast service, and a hands-on introduction to running a small business.',
            highlights: [
                'Final circle clutch victory finish.',
                'Live audience shouting reaction.',
                'Over 10,000 online live streaming viewers.'
            ]
        },
        {
            id: 'photo-12',
            title: 'GENERAL QUIZ',
            category: 'CULTURAL & PRONITES',
            badge: 'STREET DANCE',
            edition: 'PRAVAAH 2026',
            resolution: '5184 x 3456 (RAW)',
            image: 'assets/images/gallery/General_quiz.jpg',
            description: 'A high-energy competition that tests participants on a wide range of subjects beyond regular textbooks.',
            highlights: [
                'Mid-air freeze frame capture.',
                'Live beatbox background accompaniment.',
                'Inter-college street battle championship.'
            ]
        },
        {
            id: 'photo-13',
            title: 'DATA SCIENCE HACKATHON',
            category: 'STAGE & SHOWCASE',
            badge: 'DESIGN EXPO',
            edition: 'PRAVAAH 2026',
            resolution: '6000 x 4000 (RAW)',
            image: 'assets/images/gallery/Data_science_hackathon.jpg',
            description: 'A competitive event where student teams use data analysis, statistics, and machine learning to solve real-world problems within a tight deadline',
            highlights: [
                'Interactive digital screen artwork displays.',
                'Generative prompt art gallery tour.',
                'Exhibition attended by industry design directors.'
            ]
        },
        {
            id: 'photo-14',
            title: 'SOLO DANCE STREET CLASH',
            category: 'STAGE & SHOWCASE',
            badge: 'INAUGURATION',
            edition: 'PRAVAAH 2026',
            resolution: '6000 x 4000 (RAW)',
            image: 'assets/images/gallery/Street_Battle.jpg',
            description: 'One of the most high-energy, crowd-pulling, and electrifying events at any college cultural festival. Unlike formal stage dance events, a street battle shifts the spotlight to raw, urban styles, freestyle improvisation, and face-to-face competitive confrontation. It brings an underground subculture right into the heart of campus life.',
            highlights: [
                'Holographic logo lighting sequence.',
                'Official festival launch ceremony moment.',
                'Dignitaries and student committee stage assembly.'
            ]
        }
    ];

    // Camera Physics & Geometry Configuration
    let filteredCollection = [...photoCollection];
    const zStep = 900; // Fixed 900px depth spacing between cards
    let currentCameraZ = 0;
    let mobileTargetCameraZ = null;
    let cameraVelocity = 0;
    let targetVelocity = 0;
    let lastTimestamp = 0;
    let isReturningToEntrance = false;
    let isTouching = false;
    let isDragging = false;
    
    // Bounds: (filteredCollection.length * zStep)
    let endSceneZ = -(filteredCollection.length * zStep);
    let maxCameraZ = filteredCollection.length * zStep + 400;

    // DOM Elements
    const corridorStage = document.getElementById('corridor-stage');
    const corridorViewport = document.getElementById('corridor-viewport');
    const floorPlane = document.getElementById('floor-plane');
    const ceilingPlane = document.getElementById('ceiling-plane');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const hudProgressContainer = document.getElementById('hud-progress-container');
    const hudProgressBar = document.getElementById('hud-progress-bar');
    const hudProgressThumb = document.getElementById('hud-progress-thumb');
    const corridorNavPrev = document.getElementById('corridor-nav-prev');
    const corridorNavNext = document.getElementById('corridor-nav-next');
    let wasTouchDragging = false;
    
    // Modal Elements
    const modalOverlay = document.getElementById('photo-dossier-modal');
    const modalImage = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalDownloadBtn = document.getElementById('modal-download-btn');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    let currentModalPhoto = null;

    // Responsive Geometry Function (Calculates continuous wall metrics for any viewport width)
    function getResponsiveWallGeometry(width) {
        if (width <= 360) {
            return {
                wallOffset: 45,
                wallAngle: 7,
                centerBlendDist: 750,
                centerOffsetRatio: 0.0,
                driftAmount: 140
            };
        } else if (width <= 480) {
            return {
                wallOffset: 65,
                wallAngle: 9,
                centerBlendDist: 750,
                centerOffsetRatio: 0.0,
                driftAmount: 160
            };
        } else if (width <= 768) {
            return {
                wallOffset: 120,
                wallAngle: 11,
                centerBlendDist: 750,
                centerOffsetRatio: 0.08,
                driftAmount: 200
            };
        } else if (width <= 1024) {
            return {
                wallOffset: 220,
                wallAngle: 14,
                centerBlendDist: 700,
                centerOffsetRatio: 0.35,
                driftAmount: 260
            };
        } else {
            return {
                wallOffset: 360,
                wallAngle: 18,
                centerBlendDist: 650,
                centerOffsetRatio: 0.65,
                driftAmount: 340
            };
        }
    }

    // Build 3D Stage (Photo Cards on alternating Left/Right walls + THE FINAL FRAME End Scene)
    function buildCorridorStage() {
        if (!corridorStage) return;

        corridorStage.innerHTML = '';
        endSceneZ = -(filteredCollection.length * zStep);
        maxCameraZ = filteredCollection.length * zStep + 400;

        // Render Photo Cards
        filteredCollection.forEach((photo, idx) => {
            const card = document.createElement('article');
            card.className = 'orbit-corridor-card';
            card.setAttribute('data-id', photo.id);
            card.setAttribute('data-index', idx);
            card.dataset.cardIndex = idx;

            card.innerHTML = `
                <div class="corridor-card-img-box">
                    <img src="${photo.image}" alt="${photo.title}" loading="lazy" onerror="if (!this.dataset.fallback) { this.dataset.fallback = '1'; this.src = this.src.endsWith('.jpg') ? this.src.replace(/\\.jpg$/i, '.JPG') : this.src.replace(/\\.JPG$/i, '.jpg'); }" />
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
                <div class="final-small-line">END OF ARCHIVE // PRAVAAH VISUAL MEMORY</div>
            </div>

            <button class="final-return-btn" id="final-return-btn" type="button">
                <span>✦ RETURN TO ENTRANCE ✦</span>
            </button>
        `;

        corridorStage.appendChild(finalFrame);

        // Return to Entrance button triggers smooth return animation
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
    }

    // Frame-Rate Independent Animation Frame Loop with Seamless Continuous Transforms
    function updateCorridorFrame(timestamp) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const deltaTime = Math.min((timestamp - lastTimestamp) / 16.6667, 2);
        lastTimestamp = timestamp;

        // Smooth Return to Entrance Animation
        if (isReturningToEntrance) {
            mobileTargetCameraZ = null;
            const dist = 0 - currentCameraZ;
            currentCameraZ += dist * Math.min(1, 0.12 * deltaTime);
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
                currentCameraZ += dist * Math.min(1, 0.14 * deltaTime);
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
            cameraVelocity += (targetVelocity - cameraVelocity) * 0.16;
            currentCameraZ += cameraVelocity * deltaTime;
            targetVelocity *= Math.pow(0.90, deltaTime);

            if (Math.abs(targetVelocity) < 0.01 && Math.abs(cameraVelocity) < 0.01) {
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
        const velSwayY = Math.max(-3, Math.min(3, cameraVelocity * 0.12));
        const velRoll = Math.max(-0.35, Math.min(0.35, cameraVelocity * 0.018));
        const swayY = Math.sin(currentCameraZ * 0.0012) * 2 + velSwayY;
        const swayRoll = Math.cos(currentCameraZ * 0.0012) * 0.12 + velRoll;

        // Apply 3D Stage Camera Transform
        if (corridorStage) {
            corridorStage.style.transform = `translate3d(0px, ${swayY.toFixed(2)}px, ${currentCameraZ.toFixed(1)}px) rotateZ(${swayRoll.toFixed(2)}deg)`;
        }

        // Parallax for Floor & Ceiling Planes
        const parallaxZ = currentCameraZ * 0.25;
        if (floorPlane) {
            floorPlane.style.transform = `rotateX(85deg) translateY(${(parallaxZ * 0.3).toFixed(1)}px)`;
        }
        if (ceilingPlane) {
            ceilingPlane.style.transform = `rotateX(-85deg) translateY(${(-parallaxZ * 0.3).toFixed(1)}px)`;
        }

        // Responsive geometry metrics dynamically calculated per frame
        const geom = getResponsiveWallGeometry(window.innerWidth);

        // Update Wall Photo Cards
        const cards = corridorStage.querySelectorAll('.orbit-corridor-card');
        let nearestCardIdx = 0;
        let minAbsZ = Infinity;

        cards.forEach((card) => {
            const idx = parseInt(card.dataset.cardIndex, 10);
            const cardZ = -idx * zStep;
            const isLeftWall = idx % 2 === 0;
            const origX = isLeftWall ? -geom.wallOffset : geom.wallOffset;
            const origRotateY = isLeftWall ? geom.wallAngle : -geom.wallAngle;

            const relZ = cardZ + currentCameraZ;
            const absRelZ = Math.abs(relZ);

            if (absRelZ < minAbsZ) {
                minAbsZ = absRelZ;
                nearestCardIdx = idx;
            }

            if (relZ > 450) {
                // Fully behind viewer
                card.style.opacity = '0';
                card.style.pointerEvents = 'none';
                card.classList.remove('is-nearest');
            } else if (relZ > 0) {
                // Smooth continuous exit drift (0 < relZ <= 450)
                const exitRatio = relZ / 450;
                const exitEase = exitRatio * exitRatio;

                const focalX = origX * geom.centerOffsetRatio;
                const focalRotateY = origRotateY * 0.15;

                const exitX = focalX + (origX >= 0 ? geom.driftAmount : -geom.driftAmount) * exitEase;
                const exitRotate = focalRotateY + (origX >= 0 ? -12 : 12) * exitRatio;
                const scale = 1.0 + 0.22 * exitRatio;
                const opacity = Math.max(0, 1 - exitRatio * 1.35);

                card.style.transform = `translate3d(${exitX.toFixed(1)}px, 0px, ${cardZ}px) rotateY(${exitRotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
                card.style.opacity = opacity.toFixed(3);
                card.style.pointerEvents = 'none';
                card.classList.remove('is-nearest');
            } else if (relZ >= -3600) {
                // In view corridor (-3600 <= relZ <= 0)
                const depthRatio = (relZ + 3600) / 3600;
                const scale = 0.35 + 0.65 * depthRatio;
                const opacity = Math.min(1, Math.max(0.1, depthRatio * 1.35));

                let activeX = origX;
                let activeRotateY = origRotateY;

                if (relZ > -geom.centerBlendDist) {
                    const focalProgress = (relZ + geom.centerBlendDist) / geom.centerBlendDist;
                    const smoothEase = focalProgress * focalProgress * (3 - 2 * focalProgress);
                    activeX = origX * (1 - smoothEase * (1 - geom.centerOffsetRatio));
                    activeRotateY = origRotateY * (1 - smoothEase * 0.85);
                }

                card.style.transform = `translate3d(${activeX.toFixed(1)}px, 0px, ${cardZ}px) rotateY(${activeRotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
                card.style.opacity = opacity.toFixed(3);
                card.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none';

                if (absRelZ < 350) {
                    card.classList.add('is-nearest');
                } else {
                    card.classList.remove('is-nearest');
                }
            } else {
                // Far horizon
                card.style.opacity = '0';
                card.style.pointerEvents = 'none';
                card.classList.remove('is-nearest');
            }
        });

        // Update Final Frame
        const finalFrame = document.getElementById('corridor-final-frame');
        if (finalFrame) {
            const finalRelZ = endSceneZ + currentCameraZ;
            const finalAbsZ = Math.abs(finalRelZ);

            if (finalRelZ > 450) {
                finalFrame.style.opacity = '0';
                finalFrame.style.pointerEvents = 'none';
            } else if (finalRelZ > 0) {
                const exitRatio = Math.min(1, finalRelZ / 450);
                const scale = 1.0 + 0.2 * exitRatio;
                const opacity = Math.max(0, 1 - exitRatio * 1.2);

                finalFrame.style.transform = `translate3d(0px, 0px, ${endSceneZ}px) rotateY(0deg) scale(${scale.toFixed(3)})`;
                finalFrame.style.opacity = opacity.toFixed(3);
                finalFrame.style.pointerEvents = 'none';
            } else if (finalRelZ >= -3600) {
                const depthRatio = (finalRelZ + 3600) / 3600;
                const scale = 0.4 + 0.6 * depthRatio;
                const opacity = Math.min(1, Math.max(0.08, depthRatio * 1.25));

                finalFrame.style.transform = `translate3d(0px, 0px, ${endSceneZ}px) rotateY(0deg) scale(${scale.toFixed(3)})`;
                finalFrame.style.opacity = opacity.toFixed(3);
                finalFrame.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
            } else {
                finalFrame.style.opacity = '0';
                finalFrame.style.pointerEvents = 'none';
            }
        }

        // Scroll Hint Fading
        const scrollHintEl = document.getElementById('corridor-scroll-hint-text');
        if (scrollHintEl) {
            scrollHintEl.style.opacity = currentCameraZ > 300 ? '0.35' : '1';
        }

        // HUD tracker
        updateHUDTracker();

        // Prev / Next button states
        if (corridorNavPrev) {
            corridorNavPrev.style.opacity = currentCameraZ <= 50 ? '0.35' : '1';
            corridorNavPrev.style.pointerEvents = currentCameraZ <= 50 ? 'none' : 'auto';
        }
        if (corridorNavNext) {
            corridorNavNext.style.opacity = currentCameraZ >= maxCameraZ - 50 ? '0.35' : '1';
            corridorNavNext.style.pointerEvents = currentCameraZ >= maxCameraZ - 50 ? 'none' : 'auto';
        }

        requestAnimationFrame(updateCorridorFrame);
    }

    // Update Compact Progress / Seek Line Fill, Thumb, and ARIA Value
    function updateHUDTracker() {
        const progress = maxCameraZ > 0 ? Math.min(1, Math.max(0, currentCameraZ / maxCameraZ)) : 0;
        const pctStr = `${progress * 100}%`;

        if (hudProgressBar) {
            hudProgressBar.style.width = pctStr;
        }
        if (hudProgressThumb) {
            hudProgressThumb.style.left = pctStr;
        }
        if (hudProgressContainer) {
            hudProgressContainer.setAttribute('aria-valuenow', Math.round(progress * 100));
        }
    }

    // Modal Operations
    function openDossierModal(photo) {
        if (!modalOverlay) return;
        currentModalPhoto = photo;

        modalImage.onerror = function() {
            if (!this.dataset.fallback) {
                this.dataset.fallback = '1';
                this.src = this.src.endsWith('.jpg') ? this.src.replace(/\\.jpg$/i, '.JPG') : this.src.replace(/\\.JPG$/i, '.jpg');
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

    // Interactive Progress Seek Line (Click & Drag to Seek Corridor)
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
    // TOUCH INTERACTION: Real-Time Smooth Touch Dragging with Momentum & Passthrough
    // =========================================================================
    let touchStartX = 0;
    let touchStartY = 0;
    let touchLastX = 0;
    let touchLastY = 0;
    let touchLastTime = 0;
    let touchVelocityZ = 0;
    let touchMoveDistance = 0;

    if (corridorViewport) {
        corridorViewport.addEventListener('touchstart', (e) => {
            if (e.target.closest('.final-return-btn, .card-action-btn, .corridor-nav-btn, .return-entrance-btn, #hud-progress-container')) {
                return;
            }
            if (e.touches.length !== 1) return;

            // Immediate touch capture: cancel any active programmatic snap or return
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
            touchMoveDistance = 0;
            isTouching = true;
            wasTouchDragging = false;
        }, { passive: true });

        corridorViewport.addEventListener('touchmove', (e) => {
            if (!isTouching || e.touches.length !== 1) return;

            const t = e.touches[0];
            const now = performance.now();
            const dt = Math.max(1, now - touchLastTime);

            const deltaX = touchLastX - t.clientX;
            const deltaY = touchLastY - t.clientY;
            const totalDistX = Math.abs(t.clientX - touchStartX);
            const totalDistY = Math.abs(t.clientY - touchStartY);
            touchMoveDistance = Math.max(touchMoveDistance, Math.max(totalDistX, totalDistY));

            if (touchMoveDistance > 8) {
                wasTouchDragging = true;
            }

            // Swipe Up or Left advances forward; Swipe Down or Right goes backward
            const isHorizontalDominant = totalDistX > totalDistY * 1.2;
            const stepDelta = isHorizontalDominant ? deltaX : deltaY;

            // Boundary passthrough:
            // At entrance (currentCameraZ <= 5) and swiping down -> allow page scroll up
            // At final frame (currentCameraZ >= maxCameraZ - 5) and swiping up -> allow page scroll down
            if ((currentCameraZ <= 5 && stepDelta < 0 && !isHorizontalDominant) ||
                (currentCameraZ >= maxCameraZ - 5 && stepDelta > 0 && !isHorizontalDominant)) {
                touchLastX = t.clientX;
                touchLastY = t.clientY;
                touchLastTime = now;
                return;
            }

            if (e.cancelable) {
                e.preventDefault();
            }

            // Real-time smooth corridor movement with touch
            const sensitivity = window.innerWidth <= 480 ? 2.6 : 2.2;
            const zDelta = stepDelta * sensitivity;
            currentCameraZ = Math.max(0, Math.min(maxCameraZ, currentCameraZ + zDelta));

            // Instantaneous velocity calculation for release momentum
            const instantVelocity = (zDelta / dt) * 16.6667;
            touchVelocityZ = touchVelocityZ * 0.5 + instantVelocity * 0.5;

            touchLastX = t.clientX;
            touchLastY = t.clientY;
            touchLastTime = now;
        }, { passive: false });

        corridorViewport.addEventListener('touchend', (e) => {
            if (!isTouching) return;
            isTouching = false;

            if (wasTouchDragging) {
                setTimeout(() => { wasTouchDragging = false; }, 150);
            }

            if (touchMoveDistance < 10) return;

            const absV = Math.abs(touchVelocityZ);
            if (absV > 7) {
                // Flick gesture momentum
                targetVelocity = Math.max(-28, Math.min(28, touchVelocityZ * 0.75));
                cameraVelocity = targetVelocity;
            } else {
                // Gentle release: smoothly center nearest card
                const currentIdx = Math.round(currentCameraZ / zStep);
                const targetIdx = Math.max(0, Math.min(filteredCollection.length, currentIdx));
                mobileTargetCameraZ = targetIdx * zStep;
                targetVelocity = 0;
                cameraVelocity = 0;
            }
        });

        corridorViewport.addEventListener('touchcancel', () => {
            isTouching = false;
            wasTouchDragging = false;
        });
    }

    // Desktop Mouse Drag Movement
    let pointerStartY = 0;
    let pointerLastY = 0;

    if (corridorViewport) {
        corridorViewport.addEventListener('pointerdown', (e) => {
            if (isReturningToEntrance) return;
            if (e.pointerType === 'touch') return; // Handled by dedicated touch events
            if (e.target.closest('.final-return-btn, .card-action-btn, .corridor-nav-btn, .return-entrance-btn, #hud-progress-container')) return;
            isDragging = true;
            mobileTargetCameraZ = null;
            pointerStartY = e.clientY;
            pointerLastY = e.clientY;
            try { corridorViewport.setPointerCapture(e.pointerId); } catch (err) {}
        });

        corridorViewport.addEventListener('pointermove', (e) => {
            if (isReturningToEntrance || !isDragging) return;
            const deltaY = pointerLastY - e.clientY;
            pointerLastY = e.clientY;
            const clampedDelta = Math.max(-48, Math.min(48, deltaY * 2.2));
            targetVelocity += clampedDelta * 0.52;
            targetVelocity = Math.max(-26, Math.min(26, targetVelocity));
        });

        corridorViewport.addEventListener('pointerup', (e) => {
            if (isDragging) {
                isDragging = false;
                try { corridorViewport.releasePointerCapture(e.pointerId); } catch (err) {}
                if (Math.abs(cameraVelocity) < 3 && Math.abs(targetVelocity) < 3) {
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

    // Prev / Next Fly Buttons (One-tap step advance for touch screens & mouse)
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

    // Wheel Event Handler with Boundary Passthrough
    window.addEventListener('wheel', (e) => {
        if (!corridorViewport) return;
        if (isReturningToEntrance) {
            e.preventDefault();
            return;
        }

        if (e.target.closest('button, a, input, select, textarea, .dossier-modal-overlay, #photo-dossier-modal, .filter-btn, .final-return-btn')) {
            return;
        }

        let rawDelta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
        if (e.deltaMode === 1) rawDelta *= 16;
        else if (e.deltaMode === 2) rawDelta *= 300;

        // Boundary passthrough:
        // At entrance and scrolling UP: allow normal page scroll up
        if (currentCameraZ <= 0 && rawDelta < 0) return;

        // At final frame and scrolling DOWN: allow normal page scroll down to footer
        if (currentCameraZ >= maxCameraZ && rawDelta > 0) return;

        const rect = corridorViewport.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight - 100 && rect.bottom > 100;
        if (!isInViewport) return;

        e.preventDefault();
        mobileTargetCameraZ = null; // Wheel input overrides programmatic snap

        const normalizedDelta = rawDelta * 0.45;
        const clampedDelta = Math.max(-48, Math.min(48, normalizedDelta));
        targetVelocity += clampedDelta * 0.50;
        targetVelocity = Math.max(-26, Math.min(26, targetVelocity));
    }, { passive: false });

    // Smooth Non-Destructive Responsive Resize Listener (zero DOM thrashing, zero image reloads)
    window.addEventListener('resize', () => {
        endSceneZ = -(filteredCollection.length * zStep);
        maxCameraZ = filteredCollection.length * zStep + 400;
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
            targetVelocity += 12;
            targetVelocity = Math.max(-24, Math.min(24, targetVelocity));
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
            targetVelocity -= 12;
            targetVelocity = Math.max(-24, Math.min(24, targetVelocity));
        }
    });

    // Modal Button Handlers
    if (modalDownloadBtn) {
        modalDownloadBtn.addEventListener('click', () => {
            if (!currentModalPhoto || !currentModalPhoto.image) return;
            const a = document.createElement('a');
            a.href = currentModalPhoto.image;
            a.download = (currentModalPhoto.title || 'pravaah-photo').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeDossierModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeDossierModal();
            }
        });
    }

    // Build 3D Stage & Launch Persistent Animation Loop
    buildCorridorStage();
    requestAnimationFrame(updateCorridorFrame);
});
