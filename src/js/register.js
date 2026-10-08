/**
 * PRAVAAH 2026 - REGISTRATION PORTAL
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Nav indicator pill alignment for active REGISTER nav item
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

    // 2. Interactive Pass Selection
    const passCards = document.querySelectorAll(".pass-card");
    const selectedPassTitle = document.getElementById("selectedPassTitle");
    const selectedCardTitle = document.getElementById("selectedCardTitle");
    const selectedCardNotice = document.getElementById("selectedCardNotice");

    if (passCards.length > 0) {
        passCards.forEach(card => {
            card.addEventListener("click", () => {
                // Toggle active state
                passCards.forEach(c => c.classList.remove("selected"));
                card.classList.add("selected");

                const name = card.dataset.name || "Pass";
                const notice = card.dataset.notice || "";

                // Update selected pass details display
                if (selectedPassTitle) {
                    selectedPassTitle.textContent = `Selected: ${name}`;
                }
                if (selectedCardTitle) {
                    selectedCardTitle.textContent = name;
                }
                if (selectedCardNotice) {
                    // Exact required text for Starnite Pass
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

    function renderEvents(targetEventToHighlight) {
        eventsListContainer.innerHTML = "";
        selectedEvents.clear();

        let filtered = EVENTS_DATA.filter(e => selectedDays.includes(e.day));
        if (selectedVerseFilter !== "all") {
            filtered = filtered.filter(e => e.verse === selectedVerseFilter);
        }

        if (filtered.length === 0) {
            eventsListContainer.innerHTML = `<div class="empty-events-msg">No events matching filter for selected days.</div>`;
            return;
        }

        filtered.forEach((ev, idx) => {
            const row = document.createElement("label");
            row.className = "event-checkbox-row";
            const inputId = `event_check_${idx}`;

            const isTargetMatch = targetEventToHighlight && ev.name.toLowerCase() === targetEventToHighlight.toLowerCase();
            if (isTargetMatch) {
                row.classList.add("event-row-highlight");
            }

            // Auto-check events by default
            selectedEvents.add(ev.name);

            row.innerHTML = `
                <div class="ev-left">
                    <input type="checkbox" id="${inputId}" class="ev-cb" checked data-event-name="${ev.name}">
                    <span class="ev-icon">${ev.icon}</span>
                    <span class="ev-title">${ev.name}</span>
                    <span class="ev-verse-badge badge-${ev.verse.toLowerCase()}">${ev.verse}</span>
                </div>
                <div class="ev-right">
                    <span class="ev-day-pill">${ev.dayLabel}</span>
                    <a href="events.html" class="ev-link">📄 Details</a>
                </div>
            `;

            const cb = row.querySelector(".ev-cb");
            cb.addEventListener("change", (e) => {
                if (e.target.checked) {
                    selectedEvents.add(ev.name);
                } else {
                    selectedEvents.delete(ev.name);
                }
                updateCalculations();
            });

            eventsListContainer.appendChild(row);
        });

        updateCalculations();
    }

    function updateCalculations() {
        let total = 0;

        if (selectedPassType === "Fest Pass") {
            total = PRICES["Fest Pass"];
        } else if (selectedPassType === "Starnite VIP Pass") {
            total = PRICES["Starnite VIP Pass"];
        } else if (selectedPassType === "Day Pass") {
            selectedDays.forEach(d => {
                total += PRICES["Day Pass"][d] || 0;
            });
        } else if (selectedPassType === "Visitor Pass") {
            selectedDays.forEach(d => {
                total += PRICES["Visitor Pass"][d] || 0;
            });
        }

        // Live Ticket Preview updates
        if (livePassBadge) livePassBadge.textContent = selectedPassType.toUpperCase();
        if (livePrice) livePrice.textContent = `₹${total}`;
        if (totalPriceDisplay) totalPriceDisplay.textContent = `₹${total}`;
        if (liveEventsCount) liveEventsCount.textContent = `${selectedEvents.size} EVENTS`;

        if (liveDays) {
            if (selectedPassType === "Fest Pass") {
                liveDays.textContent = "ALL 4 DAYS";
            } else {
                liveDays.textContent = selectedDays.map(d => d.toUpperCase()).join(", ");
            }
        }
    }

    // Live form inputs update live ticket pass preview
    if (regName) {
        regName.addEventListener("input", (e) => {
            const val = e.target.value.trim();
            if (liveDelegateName) {
                liveDelegateName.textContent = val ? val.toUpperCase() : "ALEX MERCER";
            }
        });
    }

    if (regCollege) {
        regCollege.addEventListener("input", (e) => {
            const val = e.target.value.trim();
            if (liveCollege) {
                liveCollege.textContent = val ? val.toUpperCase() : "IIT BHUBANESWAR";
            }
        });
    }

    // URL parameter parsing (Redirection from Events page)
    function checkUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const targetEventParam = urlParams.get('event');
        const targetDayParam = urlParams.get('day');
        const targetVerseParam = urlParams.get('verse');

        if (targetEventParam) {
            const banner = document.getElementById('event-redirect-banner');
            const bannerEvName = document.getElementById('banner-event-name');
            if (banner && bannerEvName) {
                bannerEvName.textContent = targetEventParam;
                banner.classList.remove('hidden');
            }

            let foundEvent = EVENTS_DATA.find(e => e.name.toLowerCase() === targetEventParam.toLowerCase());
            let foundDay = foundEvent ? foundEvent.day : (targetDayParam ? (targetDayParam.startsWith("day") ? targetDayParam : `day${targetDayParam}`) : "day1");

            setPassType("Day Pass");
            selectedDays = [foundDay];
            renderDayPills("Day Pass");

            if (targetVerseParam && targetVerseParam.toUpperCase() !== "ALL") {
                selectedVerseFilter = targetVerseParam.toUpperCase();
                const vBtn = verseFilterPills ? verseFilterPills.querySelector(`[data-verse="${selectedVerseFilter}"]`) : null;
                if (vBtn) {
                    verseFilterPills.querySelectorAll(".verse-tab-btn").forEach(b => b.classList.remove("active"));
                    vBtn.classList.add("active");
                }
            }

            renderEvents(targetEventParam);

            setTimeout(() => {
                const redirectBanner = document.getElementById("event-redirect-banner");
                if (redirectBanner) {
                    redirectBanner.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }, 250);
        } else {
            setPassType("Fest Pass");
        }
    }

    // Submit handler
    if (registrationForm) {
        registrationForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameVal = regName && regName.value.trim() ? regName.value.trim() : "Alex Mercer";
            const collegeVal = regCollege && regCollege.value.trim() ? regCollege.value.trim() : "IIT Bhubaneswar";

            if (modalDelegate) modalDelegate.textContent = nameVal;
            if (modalPassType) modalPassType.textContent = selectedPassType;
            if (modalDays) modalDays.textContent = selectedDays.map(d => d.toUpperCase()).join(", ");
            if (modalEvents) modalEvents.textContent = `${selectedEvents.size} Events Selected`;
            if (modalTotal) modalTotal.textContent = totalPriceDisplay ? totalPriceDisplay.textContent : "₹449";

            const registrationData = {
                name: nameVal,
                college: collegeVal,
                ticketId: currentTicketId,
                passType: selectedPassType,
                days: selectedDays,
                eventsCount: selectedEvents.size,
                eventsList: Array.from(selectedEvents),
                total: totalPriceDisplay ? totalPriceDisplay.textContent : "₹449",
                registeredAt: new Date().toISOString()
            };
            try {
                localStorage.setItem("pravaahUserRegistration", JSON.stringify(registrationData));
            } catch (err) {}

            if (successModal) {
                successModal.classList.add("modal-open");
            }
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            if (successModal) {
                successModal.classList.remove("modal-open");
            }
        });
    }

    // Run Initializer
    checkUrlParameters();
});
