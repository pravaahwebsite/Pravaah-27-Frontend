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
    // 2. Interactive Festival Pass Selection (Toggle & Outside-Click to Unselect)
    // ========================================================
    const passCards = document.querySelectorAll(".pass-tower-card, .pass-card");
    const selectedPassTitle = document.getElementById("selectedPassTitle");
    const selectedCardTitle = document.getElementById("selectedCardTitle");
    const selectedCardNotice = document.getElementById("selectedCardNotice");

    function unselectPass() {
        passCards.forEach(c => {
            c.classList.remove("selected");
            const prompt = c.querySelector(".pass-select-prompt, .btn-pass-select");
            if (prompt) {
                prompt.textContent = "CLICK TO SELECT";
            }
        });

        if (selectedPassTitle) {
            selectedPassTitle.textContent = "No Pass Selected";
        }
        if (selectedCardTitle) {
            selectedCardTitle.textContent = "Please Select a Pass";
        }
        if (selectedCardNotice) {
            selectedCardNotice.textContent = "Choose a festival pass on Wall 01 to proceed.";
            selectedCardNotice.style.color = "rgba(255, 255, 255, 0.7)";
        }
    }

    function selectPass(card) {
        passCards.forEach(c => {
            c.classList.remove("selected");
            const prompt = c.querySelector(".pass-select-prompt, .btn-pass-select");
            if (prompt) {
                prompt.textContent = "CLICK TO SELECT";
            }
        });

        card.classList.add("selected");
        const activePrompt = card.querySelector(".pass-select-prompt, .btn-pass-select");
        if (activePrompt) {
            activePrompt.textContent = "ACTIVE PASS";
        }

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
                selectedCardNotice.textContent = notice || "Standard access pass.";
                selectedCardNotice.style.color = "rgba(255, 255, 255, 0.85)";
            }
        }
    }

    if (passCards.length > 0) {
        passCards.forEach(card => {
            card.addEventListener("click", (e) => {
                e.stopPropagation();
                if (card.classList.contains("selected")) {
                    unselectPass();
                } else {
                    selectPass(card);
                }
            });
        });

        // Click anywhere outside pass cards to unselect
        document.addEventListener("click", (e) => {
            if (e.target.closest(".pass-tower-card, .pass-card, button, a, input, select, textarea, .room-step-tab, .chamber-tab-btn, .room-3d-arrow, .hud-indicator-pip")) {
                return;
            }
            const hasSelected = Array.from(passCards).some(c => c.classList.contains("selected"));
            if (hasSelected) {
                unselectPass();
            }
        });

        // Ensure everything starts in a clean unselected state on page load
        unselectPass();
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
