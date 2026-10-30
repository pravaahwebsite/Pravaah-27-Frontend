/**
 * PRAVAAH 2026 - 3D SOLID ROOM CHAMBER (ACCOMMODATION)
 * Full-viewport spatial room • 4-wall rigid 3D room rotation engine & interactive booking module
 */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       1. NAV INDICATOR PILL ALIGNMENT (Cosmic Nav Wheel)
       ========================================================================== */
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

    /* ==========================================================================
       2. SCROLL-DRIVEN 4-WALL RIGID ROOM ROTATION ENGINE
       ========================================================================== */
    const TOTAL_WALLS = 4;
    let currentWallIndex = 1;
    let isGestureLocked = false;

    const track = document.getElementById("roomScrollTrack");
    const stage = document.getElementById("roomStickyStage");
    const chamber = document.getElementById("roomChamber");
    const wallFaces = document.querySelectorAll(".room-wall-face[data-wall-index]");

    const isRoomActive = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop3D = isRoomActive;

    // Rotate the ENTIRE 4-wall room chamber around the viewer's position
    function setWall(targetIndex) {
        if (targetIndex < 1 || targetIndex > TOTAL_WALLS) return;

        currentWallIndex = targetIndex;

        if (chamber && isDesktop3D()) {
            // Turning right: room rotates by +90deg per wall index
            // Index 1 (Wall 1 front): 0deg
            // Index 2 (Wall 2 front): 90deg (Wall 2 from right moves to front, Wall 1 moves to left)
            // Index 3 (Wall 3 front): 180deg (Wall 3 from right moves to front, Wall 2 moves to left)
            // Index 4 (Wall 4 front): 270deg (Wall 4 from right moves to front, Wall 3 moves to left)
            const rotAngle = (currentWallIndex - 1) * 90;
            chamber.style.transform = `translateZ(var(--cam-z)) rotateY(${rotAngle}deg)`;
        }

        // Toggle active-wall & is-side-wall classes on the rotating chamber faces
        wallFaces.forEach(face => {
            const idx = parseInt(face.getAttribute("data-wall-index"), 10);
            if (idx === currentWallIndex) {
                // Active front wall: always visible, full content readable
                face.classList.add("active-wall");
                face.classList.remove("is-side-wall");
            } else {
                // Side/non-front walls: hide content layer, reveal ambient decorative grid
                face.classList.remove("active-wall");
                face.classList.add("is-side-wall");
            }
        });
    }

    // Smooth scroll helper with callback
    function smoothScrollTo(targetY, onComplete) {
        window.scrollTo({
            top: targetY,
            behavior: 'smooth'
        });

        if (onComplete) {
            setTimeout(onComplete, 700);
        }
    }

    // Direct navigation helper to target wall (Desktop & Mobile safe)
    function goToWall(targetIndex) {
        if (targetIndex < 1 || targetIndex > TOTAL_WALLS) return;

        setWall(targetIndex);

        if (isDesktop3D() && track) {
            const maxScroll = Math.max(1, track.offsetHeight - window.innerHeight);
            let targetY = 0;
            if (targetIndex === 1) targetY = 0;
            else if (targetIndex === 2) targetY = maxScroll * 0.35;
            else if (targetIndex === 3) targetY = maxScroll * 0.62;
            else if (targetIndex === 4) targetY = maxScroll * 0.88;

            isGestureLocked = true;
            smoothScrollTo(targetY, () => { isGestureLocked = false; });
        } else {
            // Mobile fallback: scroll directly to target section
            const targetSection = document.getElementById(`wall-${targetIndex}`);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    // Fail-safe Pinning & Scroll Progress Synchronizer for 4 Walls
    function updatePinningAndRotation() {
        if (!isDesktop3D() || !track || !stage) {
            if (stage) {
                stage.style.position = '';
                stage.style.top = '';
                stage.style.left = '';
                stage.style.width = '';
                stage.style.height = '';
            }
            if (chamber) {
                chamber.style.transform = '';
            }
            return;
        }

        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const maxScroll = Math.max(1, track.offsetHeight - window.innerHeight);

        if (scrollY < maxScroll) {
            // INSIDE ROOM: Pin room to viewport edge-to-edge
            stage.style.position = 'fixed';
            stage.style.top = '0px';
            stage.style.left = '0px';
            stage.style.width = '100%';
            stage.style.height = `${window.innerHeight}px`;

            // Calculate progress through room track [0, 1]
            const progress = Math.max(0, Math.min(1, scrollY / maxScroll));

            // 4 Wall Zones:
            // Wall 1: 0.00 to 0.25
            // Wall 2: 0.25 to 0.50
            // Wall 3: 0.50 to 0.75
            // Wall 4: 0.75 to 1.00
            let targetWall = 1;
            if (progress < 0.25) {
                targetWall = 1;
            } else if (progress < 0.50) {
                targetWall = 2;
            } else if (progress < 0.75) {
                targetWall = 3;
            } else {
                targetWall = 4;
            }

            if (targetWall !== currentWallIndex) {
                setWall(targetWall);
            }
        } else {
            // PAST ROOM TRACK: Dock stage at the bottom of the track so footer seamlessly appears
            stage.style.position = 'absolute';
            stage.style.top = `${maxScroll}px`;
            stage.style.left = '0px';
            stage.style.width = '100%';
            stage.style.height = `${window.innerHeight}px`;

            if (currentWallIndex !== 4) {
                setWall(4);
            }
        }
    }

    // Scroll listener (drives rotation and pin states)
    window.addEventListener("scroll", updatePinningAndRotation, { passive: true });

    // Initial setup
    setWall(1);
    updatePinningAndRotation();
    setTimeout(updatePinningAndRotation, 60);

    /* ==========================================================================
       3. WHEEL INTERACTION: SMOOTH 4-WALL NAVIGATION WITH COOLDOWN
       ========================================================================== */
    window.addEventListener("wheel", (e) => {
        if (!isDesktop3D() || !track) return;

        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const maxScroll = Math.max(1, track.offsetHeight - window.innerHeight);

        // If user is already past the room down in footer, allow normal downward scroll
        if (scrollY >= maxScroll && e.deltaY > 0) {
            return;
        }

        // Inside the 3D room experience:
        if (scrollY < maxScroll) {
            if (isGestureLocked) {
                e.preventDefault();
                return;
            }

            if (e.deltaY > 15) {
                // SCROLL DOWN -> Advance Wall 1 -> 2 -> 3 -> 4 -> Footer
                if (currentWallIndex === 1) {
                    e.preventDefault();
                    isGestureLocked = true;
                    smoothScrollTo(maxScroll * 0.35, () => { isGestureLocked = false; });
                } else if (currentWallIndex === 2) {
                    e.preventDefault();
                    isGestureLocked = true;
                    smoothScrollTo(maxScroll * 0.62, () => { isGestureLocked = false; });
                } else if (currentWallIndex === 3) {
                    e.preventDefault();
                    isGestureLocked = true;
                    smoothScrollTo(maxScroll * 0.88, () => { isGestureLocked = false; });
                } else if (currentWallIndex === 4) {
                    // On Wall 4, scrolling down moves to footer
                    isGestureLocked = true;
                    smoothScrollTo(maxScroll + 180, () => { isGestureLocked = false; });
                }
            } else if (e.deltaY < -15) {
                // SCROLL UP -> Reverse Wall 4 -> 3 -> 2 -> 1
                if (currentWallIndex === 4) {
                    e.preventDefault();
                    isGestureLocked = true;
                    smoothScrollTo(maxScroll * 0.62, () => { isGestureLocked = false; });
                } else if (currentWallIndex === 3) {
                    e.preventDefault();
                    isGestureLocked = true;
                    smoothScrollTo(maxScroll * 0.35, () => { isGestureLocked = false; });
                } else if (currentWallIndex === 2) {
                    e.preventDefault();
                    isGestureLocked = true;
                    smoothScrollTo(0, () => { isGestureLocked = false; });
                } else if (currentWallIndex === 1) {
                    if (scrollY > 0) {
                        e.preventDefault();
                        smoothScrollTo(0);
                    }
                }
            }
        } else if (scrollY >= maxScroll && e.deltaY < -15) {
            // Scrolling UP while in footer near the bottom of room track -> smoothly re-enter Wall 4
            if (scrollY <= maxScroll + 160) {
                e.preventDefault();
                isGestureLocked = true;
                smoothScrollTo(maxScroll * 0.88, () => { isGestureLocked = false; });
            }
        }
    }, { passive: false });

    /* ==========================================================================
       4. KEYBOARD CHAMBER NAVIGATION (4 Walls)
       ========================================================================== */
    window.addEventListener("keydown", (e) => {
        if (!isDesktop3D() || isGestureLocked || !track) return;

        // Do not intercept keystrokes when typing or interacting with form inputs/controls
        if (e.target && (e.target.matches("input, select, textarea, button") || e.target.isContentEditable)) {
            return;
        }

        const maxScroll = Math.max(1, track.offsetHeight - window.innerHeight);

        if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") {
            if (currentWallIndex === 1) {
                e.preventDefault();
                isGestureLocked = true;
                smoothScrollTo(maxScroll * 0.35, () => { isGestureLocked = false; });
            } else if (currentWallIndex === 2) {
                e.preventDefault();
                isGestureLocked = true;
                smoothScrollTo(maxScroll * 0.62, () => { isGestureLocked = false; });
            } else if (currentWallIndex === 3) {
                e.preventDefault();
                isGestureLocked = true;
                smoothScrollTo(maxScroll * 0.88, () => { isGestureLocked = false; });
            } else if (currentWallIndex === 4) {
                e.preventDefault();
                isGestureLocked = true;
                smoothScrollTo(maxScroll + 180, () => { isGestureLocked = false; });
            }
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
            if (currentWallIndex === 4) {
                e.preventDefault();
                isGestureLocked = true;
                smoothScrollTo(maxScroll * 0.62, () => { isGestureLocked = false; });
            } else if (currentWallIndex === 3) {
                e.preventDefault();
                isGestureLocked = true;
                smoothScrollTo(maxScroll * 0.35, () => { isGestureLocked = false; });
            } else if (currentWallIndex === 2) {
                e.preventDefault();
                isGestureLocked = true;
                smoothScrollTo(0, () => { isGestureLocked = false; });
            }
        }
    });

    /* ==========================================================================
       5. TOUCH SWIPE GESTURES (4 Walls)
       ========================================================================== */
    let touchStartX = 0;
    let touchStartY = 0;

    window.addEventListener("touchstart", (e) => {
        if (!isDesktop3D() || e.touches.length !== 1) return;
        // Do not intercept swipe when interacting with form controls or links
        if (e.target && e.target.closest("input, select, textarea, button, a")) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener("touchend", (e) => {
        if (!isDesktop3D() || isGestureLocked || !track) return;
        if (e.target && e.target.closest("input, select, textarea, button, a")) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        const maxScroll = Math.max(1, track.offsetHeight - window.innerHeight);

        // If touching inside a scrollable panel, prioritize vertical scrolling of the card;
        // only horizontal swipe turns the room. Outside the panel, both horizontal and vertical swipes turn the room.
        const inPanel = e.target && e.target.closest(".wall-glass-panel");
        const isHorizontalSwipe = Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.1;
        const isVerticalSwipe = !inPanel && Math.abs(diffY) > 40;

        if (isHorizontalSwipe || isVerticalSwipe) {
            if ((isHorizontalSwipe && diffX > 40) || (isVerticalSwipe && diffY > 40)) {
                // Swipe forward -> Turn room right (1 -> 2 -> 3 -> 4 -> footer)
                if (currentWallIndex === 1) {
                    isGestureLocked = true;
                    smoothScrollTo(maxScroll * 0.35, () => { isGestureLocked = false; });
                } else if (currentWallIndex === 2) {
                    isGestureLocked = true;
                    smoothScrollTo(maxScroll * 0.62, () => { isGestureLocked = false; });
                } else if (currentWallIndex === 3) {
                    isGestureLocked = true;
                    smoothScrollTo(maxScroll * 0.88, () => { isGestureLocked = false; });
                } else if (currentWallIndex === 4) {
                    isGestureLocked = true;
                    smoothScrollTo(maxScroll + 180, () => { isGestureLocked = false; });
                }
            } else if ((isHorizontalSwipe && diffX < -40) || (isVerticalSwipe && diffY < -40)) {
                // Swipe backward -> Turn room left (4 -> 3 -> 2 -> 1)
                if (currentWallIndex === 4) {
                    isGestureLocked = true;
                    smoothScrollTo(maxScroll * 0.62, () => { isGestureLocked = false; });
                } else if (currentWallIndex === 3) {
                    isGestureLocked = true;
                    smoothScrollTo(maxScroll * 0.35, () => { isGestureLocked = false; });
                } else if (currentWallIndex === 2) {
                    isGestureLocked = true;
                    smoothScrollTo(0, () => { isGestureLocked = false; });
                }
            }
        }
    }, { passive: true });



    /* ==========================================================================
       7. WALL 4 FORM: INTERACTIVE INPUTS, DYNAMIC HOSTEL SELECTION & VALIDATION
       ========================================================================== */
    const bookingForm = document.getElementById("accommodationBookingForm");
    const categorySelect = document.getElementById("acc-category");
    const hostelSelect = document.getElementById("acc-hostel");

    // Dynamic Hostels mapping per Category
    const HOSTEL_OPTIONS = {
        Girls: [
            "Sangam Hall of Residence",
            "Ganga Hall of Residence"
        ],
        Boys: [
            "Rusikulya Hall of Residence",
            "Brahmaputra Hall of Residence"
        ]
    };

    // Ensure every input and select field is directly clickable, focusable, and typable
    if (bookingForm) {
        const formFields = bookingForm.querySelectorAll("input, select");
        formFields.forEach(field => {
            field.addEventListener("click", (e) => {
                e.stopPropagation();
                field.focus();
            });
            field.addEventListener("mousedown", (e) => {
                e.stopPropagation();
            });
            field.addEventListener("focus", () => {
                field.classList.remove("has-error");
            });
        });

        // Clicking on an input wrapper or icon focuses the inner input
        bookingForm.querySelectorAll(".input-wrapper").forEach(wrapper => {
            wrapper.addEventListener("click", (e) => {
                const innerInput = wrapper.querySelector("input, select");
                if (innerInput && innerInput !== document.activeElement) {
                    innerInput.focus();
                }
            });
        });
    }

    // Fail-safe hit testing for Wall 4 inputs in 3D perspective
    window.addEventListener("click", (e) => {
        if (currentWallIndex !== 4) return;
        if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "SELECT")) return;

        const form = document.getElementById("accommodationBookingForm");
        if (!form) return;

        const inputs = form.querySelectorAll("input, select");
        for (const input of inputs) {
            const rect = input.getBoundingClientRect();
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                input.focus();
                break;
            }
        }
    });

    if (categorySelect && hostelSelect) {
        categorySelect.addEventListener("change", () => {
            const selectedCategory = categorySelect.value;
            const hostels = HOSTEL_OPTIONS[selectedCategory];

            // Reset and populate hostels
            hostelSelect.innerHTML = "";

            if (hostels && hostels.length > 0) {
                const defaultOption = document.createElement("option");
                defaultOption.value = "";
                defaultOption.textContent = `Select ${selectedCategory} Hostel`;
                defaultOption.disabled = true;
                defaultOption.selected = true;
                hostelSelect.appendChild(defaultOption);

                hostels.forEach(h => {
                    const opt = document.createElement("option");
                    opt.value = h;
                    opt.textContent = `${h} (${selectedCategory})`;
                    hostelSelect.appendChild(opt);
                });
            } else {
                const placeholder = document.createElement("option");
                placeholder.value = "";
                placeholder.textContent = "Select hostel";
                placeholder.disabled = true;
                placeholder.selected = true;
                hostelSelect.appendChild(placeholder);
            }

            clearError("acc-category");
            clearError("acc-hostel");
        });

        // Auto-synchronize category if user selects a hostel first
        hostelSelect.addEventListener("change", () => {
            clearError("acc-hostel");
            const val = hostelSelect.value;
            if (val && !categorySelect.value) {
                if (HOSTEL_OPTIONS.Girls.some(h => val.includes(h))) {
                    categorySelect.value = "Girls";
                    clearError("acc-category");
                } else if (HOSTEL_OPTIONS.Boys.some(h => val.includes(h))) {
                    categorySelect.value = "Boys";
                    clearError("acc-category");
                }
            }
        });
    }

    // Helper: Show Inline Error
    function showError(fieldId, errorMsg) {
        const inputElem = document.getElementById(fieldId);
        const errElem = document.getElementById(`err-${fieldId}`);
        if (inputElem) {
            inputElem.classList.add("has-error");
        }
        if (errElem) {
            errElem.textContent = errorMsg;
        }
    }

    // Helper: Clear Inline Error
    function clearError(fieldId) {
        const inputElem = document.getElementById(fieldId);
        const errElem = document.getElementById(`err-${fieldId}`);
        if (inputElem) {
            inputElem.classList.remove("has-error");
        }
        if (errElem) {
            errElem.textContent = "";
        }
    }

    // Live validation error clearing on input/change
    const formFieldIds = ["acc-fullname", "acc-email", "acc-phone", "acc-college", "acc-category", "acc-hostel"];
    formFieldIds.forEach(id => {
        const elem = document.getElementById(id);
        if (elem) {
            elem.addEventListener("input", () => clearError(id));
            elem.addEventListener("change", () => clearError(id));
        }
    });

    // Form submission validation
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let isValid = true;
            let firstInvalid = null;

            // 1. Full Name
            const nameInput = document.getElementById("acc-fullname");
            const nameVal = nameInput ? nameInput.value.trim() : "";
            if (!nameVal || nameVal.length < 2) {
                showError("acc-fullname", "Please enter your full name.");
                isValid = false;
                if (!firstInvalid) firstInvalid = nameInput;
            } else {
                clearError("acc-fullname");
            }

            // 2. Email Address
            const emailInput = document.getElementById("acc-email");
            const emailVal = emailInput ? emailInput.value.trim() : "";
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailVal || !emailRegex.test(emailVal)) {
                showError("acc-email", "Please enter a valid email address.");
                isValid = false;
                if (!firstInvalid) firstInvalid = emailInput;
            } else {
                clearError("acc-email");
            }

            // 3. Phone Number (10-digit Indian mobile)
            const phoneInput = document.getElementById("acc-phone");
            const phoneVal = phoneInput ? phoneInput.value.trim() : "";
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneVal || !phoneRegex.test(phoneVal)) {
                showError("acc-phone", "Please enter a valid 10-digit mobile number.");
                isValid = false;
                if (!firstInvalid) firstInvalid = phoneInput;
            } else {
                clearError("acc-phone");
            }

            // 4. College / Institution
            const collegeInput = document.getElementById("acc-college");
            const collegeVal = collegeInput ? collegeInput.value.trim() : "";
            if (!collegeVal || collegeVal.length < 2) {
                showError("acc-college", "Please enter your college or institution.");
                isValid = false;
                if (!firstInvalid) firstInvalid = collegeInput;
            } else {
                clearError("acc-college");
            }

            // 5. Participant Category
            const catVal = categorySelect ? categorySelect.value : "";
            if (!catVal) {
                showError("acc-category", "Please select your category.");
                isValid = false;
                if (!firstInvalid) firstInvalid = categorySelect;
            } else {
                clearError("acc-category");
            }

            // 6. Hostel Selection
            const hostelVal = hostelSelect ? hostelSelect.value : "";
            if (!hostelVal) {
                showError("acc-hostel", "Please select a hostel.");
                isValid = false;
                if (!firstInvalid) firstInvalid = hostelSelect;
            } else {
                clearError("acc-hostel");
            }

            if (!isValid && firstInvalid) {
                firstInvalid.focus();
            }
        });
    }

    /* ==========================================================================
       8. WINDOW RESIZE HANDLER
       ========================================================================== */
    window.addEventListener("resize", () => {
        updatePinningAndRotation();
    });

});
