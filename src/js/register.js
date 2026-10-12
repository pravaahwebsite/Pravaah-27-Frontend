/**
 * PRAVAAH 2026 - STABLE 3D ROOM REGISTRATION MATRIX ENGINE
 * Stable 3D Cube: Tilting removed, rotates strictly via nav bar and side buttons.
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
    // 3. Stable 3D Room Controller
    // ========================================================
    const box = document.getElementById("room3dBox");
    const walls = document.querySelectorAll(".room-wall, .room-3d-wall");
    const tabs = document.querySelectorAll(".chamber-tab-btn");
    const dots = document.querySelectorAll(".wall-pill-dot, .chamber-dot");
    const prevBtn = document.getElementById("roomPrevBtn");
    const nextBtn = document.getElementById("roomNextBtn");

    let currentWallIndex = 0;

    // Rotate strictly to specific wall (0: Front, 1: Right, 2: Back, 3: Left)
    function rotateToWall(index, withZoom = true) {
        if (!box) return;
        index = (index + walls.length) % walls.length;
        currentWallIndex = index;

        const targetRotY = -90 * index;
        box.style.setProperty("--room-rot-y", `${targetRotY}deg`);

        if (withZoom) {
            box.style.setProperty("--room-zoom-z", "-4vw");
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

        // Update Nav Bar Tabs
        tabs.forEach((tab, i) => {
            if (i === index) {
                tab.classList.add("active");
                tab.setAttribute("aria-selected", "true");
            } else {
                tab.classList.remove("active");
                tab.setAttribute("aria-selected", "false");
            }
        });

        // Update Indicator Dots
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    // ========================================================
    // 4. Navigation Controls (Nav Bar Tabs & Side Buttons ONLY)
    // ========================================================

    // 1) Nav Bar Tab Buttons
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const wallIdx = parseInt(tab.dataset.wall, 10);
            if (!isNaN(wallIdx)) rotateToWall(wallIdx);
        });
    });

    // 2) Floating Side Navigation Arrows
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

    // 3) In-Wall Step CTA Buttons
    const gotoButtons = document.querySelectorAll("[data-goto]");
    gotoButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetIdx = parseInt(btn.dataset.goto, 10);
            if (!isNaN(targetIdx)) {
                rotateToWall(targetIdx);
            }
        });
    });

    // 4) Bottom Wall Pill Indicators
    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const wallIdx = parseInt(dot.dataset.wall, 10);
            if (!isNaN(wallIdx)) rotateToWall(wallIdx);
        });
    });

    // Initialize Stable 3D Room at Wall 0
    rotateToWall(0, false);
});
