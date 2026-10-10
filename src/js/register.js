/**
 * PRAVAAH 2026 - FULLPAGE 3D ROOM REGISTRATION MATRIX ENGINE
 * Features 360° Rotational 3D Cube Chamber, Mouse Parallax Tilt, Drag & Wheel Side-Scroll
 */

document.addEventListener("DOMContentLoaded", () => {
    // ========================================================
    // 1. Cosmic Nav Wheel Active Indicator Pill Alignment
    // ========================================================
    const activeNav = document.querySelector('.nav-item.active');
    const pill = document.getElementById('nav-indicator-pill');
    
    if (activeNav && pill) {
        const updatePill = () => {
            pill.style.left = `${activeNav.offsetLeft}px`;
            pill.style.width = `${activeNav.offsetWidth}px`;
        };
        updatePill();
        setTimeout(updatePill, 100);
        window.addEventListener('resize', updatePill);
    }

    // ========================================================
    // 2. Interactive Festival Pass Selection
    // ========================================================
    const passCards = document.querySelectorAll(".pass-tower-card, .pass-card");
    const selectedPassTitle = document.getElementById("selectedPassTitle");
    const selectedCardTitle = document.getElementById("selectedCardTitle");
    const selectedCardNotice = document.getElementById("selectedCardNotice");

    if (passCards.length > 0) {
        passCards.forEach(card => {
            card.addEventListener("click", () => {
                passCards.forEach(c => c.classList.remove("selected"));
                card.classList.add("selected");

                const name = card.dataset.name || "Pass";
                const notice = card.dataset.notice || "";

                if (selectedPassTitle) {
                    selectedPassTitle.textContent = `Selected: ${name}`;
                }
                if (selectedCardTitle) {
                    selectedCardTitle.textContent = name;
                }
                if (selectedCardNotice) {
                    if (name.toLowerCase().includes("starnite")) {
                        selectedCardNotice.textContent = "IITBBS students need not register for Starnite.";
                        selectedCardNotice.style.color = "#00ff88";
                    } else {
                        selectedCardNotice.textContent = notice;
                        selectedCardNotice.style.color = "rgba(255, 255, 255, 0.85)";
                    }
                }
            });
        });
    }

    // ========================================================
    // 3. 3D Room Matrix Controller
    // ========================================================
    const viewport = document.getElementById("room3dViewport");
    const stage = document.getElementById("room3dStage");
    const box = document.getElementById("room3dBox");
    const walls = document.querySelectorAll(".room-wall, .room-3d-wall");
    const tabs = document.querySelectorAll(".chamber-tab-btn");
    const dots = document.querySelectorAll(".wall-pill-dot, .chamber-dot");
    const prevBtn = document.getElementById("roomPrevBtn");
    const nextBtn = document.getElementById("roomNextBtn");
    const progressFill = document.getElementById("chamberProgressFill");
    const telemetryLabel = document.getElementById("activeChamberTelemetry");

    const telemetryDescriptions = [
        "WALL 01 [FRONT] // FESTIVAL PASS VAULT",
        "WALL 02 [RIGHT] // DELEGATE IDENTITY MATRIX",
        "WALL 03 [REAR] // FESTIVAL PROTOCOLS",
        "WALL 04 [LEFT] // PASS SUMMARY & PORTAL"
    ];

    let currentWallIndex = 0;

    // Rotate to specific wall (0: Front, 1: Right, 2: Back, 3: Left)
    function rotateToWall(index, withZoom = true) {
        if (!box) return;
        index = (index + walls.length) % walls.length;
        currentWallIndex = index;

        const targetRotY = -90 * index;
        box.style.setProperty("--room-rot-y", `${targetRotY}deg`);

        if (withZoom) {
            // Camera slight pull-back on 3D rotation
            box.style.setProperty("--room-zoom-z", "-5vw");
            setTimeout(() => {
                box.style.setProperty("--room-zoom-z", "0px");
            }, 300);
        }

        // Update Wall Active States
        walls.forEach((wall, i) => {
            if (i === index) {
                wall.classList.add("active");
            } else {
                wall.classList.remove("active");
            }
        });

        // Update Tabs
        tabs.forEach((tab, i) => {
            if (i === index) {
                tab.classList.add("active");
                tab.setAttribute("aria-selected", "true");
            } else {
                tab.classList.remove("active");
                tab.setAttribute("aria-selected", "false");
            }
        });

        // Update Dots
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });

        // Update Progress Bar
        if (progressFill) {
            const pct = ((index + 1) / walls.length) * 100;
            progressFill.style.width = `${pct}%`;
        }

        // Update Telemetry
        if (telemetryLabel && telemetryDescriptions[index]) {
            telemetryLabel.textContent = telemetryDescriptions[index];
        }
    }

    // ========================================================
    // 4. One Rotation Per Scroll Gesture Controller
    // ========================================================
    let isScrollLocked = false;
    let isTransitioning = false;
    let wheelResetTimer = null;

    if (viewport) {
        viewport.addEventListener("wheel", (e) => {
            // Check if user is scrolling inside an internal scrollable container
            const scrollableParent = e.target.closest(".wall-content-wrapper");
            if (scrollableParent) {
                const canScrollDown = e.deltaY > 0 && scrollableParent.scrollTop < (scrollableParent.scrollHeight - scrollableParent.clientHeight - 8);
                const canScrollUp = e.deltaY < 0 && scrollableParent.scrollTop > 8;
                if (canScrollDown || canScrollUp) {
                    return; // Allow internal vertical scrolling
                }
            }

            e.preventDefault();

            // Reset idle timer on every wheel event in this gesture stream
            clearTimeout(wheelResetTimer);
            wheelResetTimer = setTimeout(() => {
                // User has fully finished this scroll gesture (fingers lifted / wheel stopped)
                isScrollLocked = false;
            }, 300);

            // If this scroll gesture has already fired its single rotation, ignore further events
            if (isScrollLocked || isTransitioning) return;

            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            if (Math.abs(delta) < 18) return;

            // Lock this scroll gesture immediately to prevent multi-wall skips
            isScrollLocked = true;
            isTransitioning = true;

            // Trigger exactly ONE rotation
            if (delta > 0) {
                rotateToWall(currentWallIndex + 1);
            } else {
                rotateToWall(currentWallIndex - 1);
            }

            // Keep transition lock for the duration of the 3D animation
            setTimeout(() => {
                isTransitioning = false;
            }, 650);
        }, { passive: false });
    }

    // ========================================================
    // 5. Interactive Mouse Drag / Touch Swipe to Rotate 3D Room
    // ========================================================
    let isDragging = false;
    let startX = 0;
    let currentDragDelta = 0;

    function handleDragStart(clientX) {
        isDragging = true;
        startX = clientX;
        currentDragDelta = 0;
        if (box) box.classList.add("dragging");
    }

    function handleDragMove(clientX) {
        if (!isDragging || !box) return;
        currentDragDelta = clientX - startX;
        const baseRotY = -90 * currentWallIndex;
        const liveRotY = baseRotY + (currentDragDelta * 0.18);
        box.style.setProperty("--room-rot-y", `${liveRotY}deg`);
    }

    function handleDragEnd() {
        if (!isDragging || !box) return;
        isDragging = false;
        box.classList.remove("dragging");

        if (currentDragDelta < -60) {
            rotateToWall(currentWallIndex + 1);
        } else if (currentDragDelta > 60) {
            rotateToWall(currentWallIndex - 1);
        } else {
            rotateToWall(currentWallIndex, false);
        }
        currentDragDelta = 0;
    }

    if (stage) {
        stage.addEventListener("mousedown", (e) => {
            if (e.target.closest("input, button, a, label")) return;
            handleDragStart(e.clientX);
        });

        window.addEventListener("mousemove", (e) => {
            if (isDragging) handleDragMove(e.clientX);
        });

        window.addEventListener("mouseup", () => {
            if (isDragging) handleDragEnd();
        });

        // Touch Drag
        stage.addEventListener("touchstart", (e) => {
            if (e.target.closest("input, button, a, label")) return;
            if (e.touches.length === 1) handleDragStart(e.touches[0].clientX);
        }, { passive: true });

        stage.addEventListener("touchmove", (e) => {
            if (isDragging && e.touches.length === 1) handleDragMove(e.touches[0].clientX);
        }, { passive: true });

        stage.addEventListener("touchend", () => {
            if (isDragging) handleDragEnd();
        });
    }

    // ========================================================
    // 6. 3D Spatial Mouse Parallax Tilt
    // ========================================================
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    function renderParallax() {
        currentTiltX += (targetTiltX - currentTiltX) * 0.08;
        currentTiltY += (targetTiltY - currentTiltY) * 0.08;

        if (box && !isDragging) {
            box.style.setProperty("--room-tilt-x", `${currentTiltX.toFixed(2)}deg`);
            box.style.setProperty("--room-tilt-y", `${currentTiltY.toFixed(2)}deg`);
        }

        requestAnimationFrame(renderParallax);
    }

    if (viewport) {
        viewport.addEventListener("mousemove", (e) => {
            const relX = (e.clientX / window.innerWidth) - 0.5;
            const relY = (e.clientY / window.innerHeight) - 0.5;

            targetTiltX = -relY * 8; // -4deg to 4deg
            targetTiltY = relX * 10; // -5deg to 5deg
        });

        viewport.addEventListener("mouseleave", () => {
            targetTiltX = 0;
            targetTiltY = 0;
        });

        requestAnimationFrame(renderParallax);
    }

    // ========================================================
    // 7. Interactive Controls (Tabs, Arrows, Dots, Actions)
    // ========================================================
    // Tab Clicks
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const wallIdx = parseInt(tab.dataset.wall, 10);
            if (!isNaN(wallIdx)) rotateToWall(wallIdx);
        });
    });

    // Dot Clicks
    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const wallIdx = parseInt(dot.dataset.wall, 10);
            if (!isNaN(wallIdx)) rotateToWall(wallIdx);
        });
    });

    // Arrow Buttons
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            rotateToWall(currentWallIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            rotateToWall(currentWallIndex + 1);
        });
    }

    // Wall Action Buttons ([data-goto])
    const gotoButtons = document.querySelectorAll("[data-goto]");
    gotoButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetIdx = parseInt(btn.dataset.goto, 10);
            if (!isNaN(targetIdx)) {
                rotateToWall(targetIdx);
            }
        });
    });

    // Keyboard Arrow Keys
    window.addEventListener("keydown", (e) => {
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
        if (activeTag === "input" || activeTag === "textarea") return;

        if (e.key === "ArrowRight") {
            e.preventDefault();
            rotateToWall(currentWallIndex + 1);
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            rotateToWall(currentWallIndex - 1);
        }
    });

    // Initialize Fullpage 3D Room at Wall 0
    rotateToWall(0, false);
});
