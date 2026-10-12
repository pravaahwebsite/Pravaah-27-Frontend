/**
 * PRAVAAH 2026 - CORPORATE SPONSORS & PARTNERSHIPS ENGINE
 * Interactive Filters, Live Search, 3D Tilt Pedestals, Telemetry Simulator,
 * Infinite Marquee Stream & Holographic Dossier Terminal
 */

document.addEventListener("DOMContentLoaded", () => {
    // =========================================================
    // 1. Navigation indicator alignment
    // =========================================================
    const activeNav = document.querySelector('.nav-item.active');
    const pill = document.getElementById('nav-indicator-pill');
    if (activeNav && pill) {
        setTimeout(() => {
            pill.style.left = `${activeNav.offsetLeft}px`;
            pill.style.width = `${activeNav.offsetWidth}px`;
        }, 100);
    }

    // =========================================================
    // 2. Metrics Telemetry Counter Roll
    // =========================================================
    const metricVals = document.querySelectorAll(".metric-card .m-val[data-counter-target]");
    let metricsAnimated = false;

    const animateMetrics = () => {
        if (metricsAnimated) return;
        metricsAnimated = true;

        metricVals.forEach(el => {
            const target = parseInt(el.getAttribute("data-counter-target"), 10);
            if (isNaN(target)) return;

            let current = 0;
            const step = Math.max(1, Math.floor(target / 40));
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                    el.textContent = target >= 1000 ? `${target.toLocaleString()}+` : `${target}+`;
                } else {
                    el.textContent = target >= 1000 ? `${current.toLocaleString()}+` : `${current}+`;
                }
            }, 30);
        });
    };

    const metricsStrip = document.querySelector(".sponsors-metrics-strip");
    if (metricsStrip && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateMetrics();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(metricsStrip);
    } else {
        animateMetrics();
    }

    // =========================================================
    // 3. Interactive Category Filter Switcher & Live Search
    // =========================================================
    const filterBtns = document.querySelectorAll(".cat-filter-btn");
    const tierBlocks = document.querySelectorAll(".sponsor-tier-block");
    const searchInput = document.getElementById("sponsorSearchInput");
    const clearSearchBtn = document.getElementById("clearSearchBtn");
    const searchStatusCounter = document.getElementById("searchStatusCounter");
    const proposalSection = document.getElementById("proposalSection");

    let currentCategoryFilter = "all";
    let currentSearchQuery = "";

    const getAllSponsorCards = () => {
        return document.querySelectorAll(".title-sponsor-card, .sponsor-card, .sponsor-mini-card");
    };

    const updateFilterVisibility = () => {
        const allCards = getAllSponsorCards();
        let visibleCount = 0;
        const totalCount = allCards.length;

        tierBlocks.forEach(block => {
            const blockCat = block.dataset.category;
            const categoryMatch = (currentCategoryFilter === "all" || blockCat === currentCategoryFilter);

            let blockVisibleCards = 0;
            const cardsInBlock = block.querySelectorAll(".title-sponsor-card, .sponsor-card, .sponsor-mini-card");

            cardsInBlock.forEach(card => {
                // Text search matching
                const cardText = (card.textContent || "").toLowerCase();
                const searchMatch = !currentSearchQuery || cardText.includes(currentSearchQuery);

                if (categoryMatch && searchMatch) {
                    card.style.display = "";
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                    visibleCount++;
                    blockVisibleCards++;
                } else {
                    card.style.display = "none";
                }
            });

            // If no cards match in this entire tier, hide the block header too
            if (categoryMatch && blockVisibleCards > 0) {
                block.style.display = "flex";
                block.style.opacity = "1";
            } else {
                block.style.display = "none";
            }
        });

        // Update counter text
        if (searchStatusCounter) {
            if (currentSearchQuery) {
                searchStatusCounter.textContent = `MATCHED ${visibleCount} OF ${totalCount} ALLIANCES`;
            } else if (currentCategoryFilter !== "all") {
                searchStatusCounter.textContent = `SHOWING ${visibleCount} ${currentCategoryFilter.toUpperCase()} ALLIANCES`;
            } else {
                searchStatusCounter.textContent = `SHOWING 15 OF 15 ALLIANCES`;
            }
        }
    };

    // Category Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;

            // Handle "Become a Sponsor" smooth scroll
            if (filter === "proposal") {
                if (proposalSection) {
                    proposalSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
                return;
            }

            filterBtns.forEach(b => {
                if (b.dataset.filter !== "proposal") {
                    b.classList.remove("active");
                }
            });
            btn.classList.add("active");

            currentCategoryFilter = filter;
            updateFilterVisibility();
        });
    });

    // Live Search Input
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentSearchQuery = e.target.value.trim().toLowerCase();
            if (clearSearchBtn) {
                clearSearchBtn.classList.toggle("visible", currentSearchQuery.length > 0);
            }
            updateFilterVisibility();
        });

        // Keyboard hotkeys: '/' to focus, 'Escape' to clear
        document.addEventListener("keydown", (e) => {
            if (e.key === "/" && document.activeElement !== searchInput && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
                e.preventDefault();
                searchInput.focus();
            } else if (e.key === "Escape" && document.activeElement === searchInput) {
                searchInput.value = "";
                currentSearchQuery = "";
                if (clearSearchBtn) clearSearchBtn.classList.remove("visible");
                searchInput.blur();
                updateFilterVisibility();
            }
        });
    }

    if (clearSearchBtn && searchInput) {
        clearSearchBtn.addEventListener("click", () => {
            searchInput.value = "";
            currentSearchQuery = "";
            clearSearchBtn.classList.remove("visible");
            searchInput.focus();
            updateFilterVisibility();
        });
    }

    // =========================================================
    // 4. Clickable Marquee Chips (Jump to Sponsor with Highlight)
    // =========================================================
    const marqueeChips = document.querySelectorAll(".marquee-chip");
    marqueeChips.forEach(chip => {
        chip.addEventListener("click", () => {
            const targetId = chip.dataset.target;
            const targetCard = document.getElementById(targetId);
            if (targetCard) {
                // If filtered out, reset category to "all" to reveal card
                if (targetCard.style.display === "none") {
                    currentCategoryFilter = "all";
                    currentSearchQuery = "";
                    if (searchInput) searchInput.value = "";
                    if (clearSearchBtn) clearSearchBtn.classList.remove("visible");
                    filterBtns.forEach(b => {
                        b.classList.toggle("active", b.dataset.filter === "all");
                    });
                    updateFilterVisibility();
                }

                targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
                targetCard.classList.remove("card-spotlight-active");
                void targetCard.offsetWidth; // Trigger reflow
                targetCard.classList.add("card-spotlight-active");

                setTimeout(() => {
                    targetCard.classList.remove("card-spotlight-active");
                }, 2500);
            }
        });
    });

    // =========================================================
    // 5. Holographic 3D Tilt Card Interaction & Specular Light
    // =========================================================
    const tiltCards = document.querySelectorAll("[data-tilt]");
    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Update mouse coordinates for CSS radial highlight
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);

            // Subtle rotation angles
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    });

    // =========================================================
    // 6. Tier Simulator Interactive Engine & Telemetry Meters
    // =========================================================
    const simBtns = document.querySelectorAll(".sim-btn");
    const simReach = document.getElementById("simReach");
    const simStalls = document.getElementById("simStalls");
    const simKeynote = document.getElementById("simKeynote");

    const meterReach = document.getElementById("meterReach");
    const meterStalls = document.getElementById("meterStalls");
    const meterKeynote = document.getElementById("meterKeynote");

    const meterPctReach = document.getElementById("meterPctReach");
    const meterPctStalls = document.getElementById("meterPctStalls");
    const meterPctKeynote = document.getElementById("meterPctKeynote");

    const tierTelemetryData = {
        title: {
            reachPct: "100%", reachLabel: "100% EXPOSURE",
            stallsPct: "100%", stallsLabel: "3 EXCLUSIVE UNITS",
            keynotePct: "100%", keynoteLabel: "TIER-1 PRIVILEGES"
        },
        platinum: {
            reachPct: "75%", reachLabel: "75% EXPOSURE",
            stallsPct: "66%", stallsLabel: "2 ARENA UNITS",
            keynotePct: "80%", keynoteLabel: "CATEGORY NAMING"
        },
        gold: {
            reachPct: "50%", reachLabel: "50% EXPOSURE",
            stallsPct: "33%", stallsLabel: "1 ARENA UNIT",
            keynotePct: "55%", keynoteLabel: "STAGE BRANDING"
        },
        event: {
            reachPct: "25%", reachLabel: "25% EXPOSURE",
            stallsPct: "20%", stallsLabel: "1 EVENT KIOSK",
            keynotePct: "35%", keynoteLabel: "TITLE RIGHTS"
        }
    };

    let currentSelectedTier = "Title Sponsor";

    simBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            simBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const tierKey = btn.dataset.tier || "title";
            currentSelectedTier = btn.textContent.trim() + " Sponsor";

            if (simReach) simReach.textContent = btn.dataset.reach || "50,000+ Footfall & 5M+ Digital";
            if (simStalls) simStalls.textContent = btn.dataset.stalls || "3 Exclusive VIP Stalls";
            if (simKeynote) simKeynote.textContent = btn.dataset.keynote || "Mainstage Keynote & Title Naming";

            const telemetry = tierTelemetryData[tierKey] || tierTelemetryData.title;
            if (meterReach) meterReach.style.width = telemetry.reachPct;
            if (meterStalls) meterStalls.style.width = telemetry.stallsPct;
            if (meterKeynote) meterKeynote.style.width = telemetry.keynotePct;

            if (meterPctReach) meterPctReach.textContent = telemetry.reachLabel;
            if (meterPctStalls) meterPctStalls.textContent = telemetry.stallsLabel;
            if (meterPctKeynote) meterPctKeynote.textContent = telemetry.keynoteLabel;
        });
    });

    // =========================================================
    // 7. Expandable Tier Benefits Matrix Table Toggle
    // =========================================================
    const toggleMatrixBtn = document.getElementById("toggleMatrixBtn");
    const tierMatrixDrawer = document.getElementById("tierMatrixDrawer");

    if (toggleMatrixBtn && tierMatrixDrawer) {
        toggleMatrixBtn.addEventListener("click", () => {
            const isOpen = tierMatrixDrawer.classList.toggle("open");
            toggleMatrixBtn.classList.toggle("active", isOpen);
        });
    }

    // =========================================================
    // 8. Sponsor Holographic Dossier Modal
    // =========================================================
    const sponsorDossierModal = document.getElementById("sponsorDossierModal");
    const closeDossierModalBtn = document.getElementById("closeDossierModalBtn");
    const dossierCloseBtn = document.getElementById("dossierCloseBtn");
    const dossierPartnerBtn = document.getElementById("dossierPartnerBtn");

    const dossierBrandName = document.getElementById("dossierBrandName");
    const dossierCategory = document.getElementById("dossierCategory");
    const dossierDesc = document.getElementById("dossierDesc");
    const dossierPerk = document.getElementById("dossierPerk");

    const dossierTriggers = document.querySelectorAll(".card-dossier-trigger");

    const openDossierForCard = (card) => {
        if (!card) return;

        const titleEl = card.querySelector(".brand-title, .mega-brand-title, h4");
        const catEl = card.querySelector(".brand-category, .brand-badge-pill, .mini-info span");
        const descEl = card.querySelector(".brand-desc, .card-desc");
        const perkEl = card.querySelector(".card-perk-pill, .b-perk");

        const brandTitle = titleEl ? titleEl.textContent.trim() : "CORPORATE PARTNER";
        const categoryText = catEl ? catEl.textContent.trim() : "OFFICIAL ALLIANCE";
        const descText = descEl ? descEl.textContent.trim() : "Official partner supporting student innovation and technical excellence at Pravaah '26.";
        const perkText = perkEl ? perkEl.textContent.trim() : "Verified Arena Partner Benefits";

        if (dossierBrandName) dossierBrandName.textContent = brandTitle;
        if (dossierCategory) dossierCategory.textContent = categoryText;
        if (dossierDesc) dossierDesc.textContent = descText;
        if (dossierPerk) dossierPerk.innerHTML = `<i class="fa-solid fa-shield-halved"></i> ${perkText}`;

        if (sponsorDossierModal) {
            sponsorDossierModal.classList.add("open");
            sponsorDossierModal.setAttribute("aria-hidden", "false");
        }
    };

    dossierTriggers.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const card = btn.closest(".holo-glow-card");
            openDossierForCard(card);
        });
    });

    const closeDossier = () => {
        if (sponsorDossierModal) {
            sponsorDossierModal.classList.remove("open");
            sponsorDossierModal.setAttribute("aria-hidden", "true");
        }
    };

    if (closeDossierModalBtn) closeDossierModalBtn.addEventListener("click", closeDossier);
    if (dossierCloseBtn) dossierCloseBtn.addEventListener("click", closeDossier);

    if (sponsorDossierModal) {
        sponsorDossierModal.addEventListener("click", (e) => {
            if (e.target === sponsorDossierModal) closeDossier();
        });
    }

    if (dossierPartnerBtn) {
        dossierPartnerBtn.addEventListener("click", () => {
            closeDossier();
            if (proposalSection) {
                proposalSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeDossier();
            if (sponsorSuccessModal) sponsorSuccessModal.classList.remove("modal-open");
        }
    });

    // =========================================================
    // 9. Form Submission & Confirmation Modal
    // =========================================================
    const sponsorProposalForm = document.getElementById("sponsorProposalForm");
    const sponsorSuccessModal = document.getElementById("sponsorSuccessModal");
    const closeSponsorModalBtn = document.getElementById("closeSponsorModalBtn");
    const modalSpCompany = document.getElementById("modalSpCompany");
    const modalSpRep = document.getElementById("modalSpRep");
    const modalSpTier = document.getElementById("modalSpTier");

    if (sponsorProposalForm) {
        sponsorProposalForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const companyVal = document.getElementById("sp-company") ? document.getElementById("sp-company").value : "Corporate Partner";
            const repVal = document.getElementById("sp-rep") ? document.getElementById("sp-rep").value : "Delegate";

            if (modalSpCompany) modalSpCompany.textContent = companyVal;
            if (modalSpRep) modalSpRep.textContent = repVal;
            if (modalSpTier) modalSpTier.textContent = currentSelectedTier;

            if (sponsorSuccessModal) {
                sponsorSuccessModal.classList.add("modal-open");
            }
        });
    }

    if (closeSponsorModalBtn) {
        closeSponsorModalBtn.addEventListener("click", () => {
            if (sponsorSuccessModal) {
                sponsorSuccessModal.classList.remove("modal-open");
            }
        });
    }

    if (sponsorSuccessModal) {
        sponsorSuccessModal.addEventListener("click", (e) => {
            if (e.target === sponsorSuccessModal) {
                sponsorSuccessModal.classList.remove("modal-open");
            }
        });
    }
});
