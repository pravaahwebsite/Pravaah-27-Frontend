/**
 * PRAVAAH 2026 - CORPORATE SPONSORS & PARTNERSHIPS ENGINE
 * Interactive Filters, 3D Tilt Pedestals & Telemetry Simulator
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Navigation indicator alignment
    const activeNav = document.querySelector('.nav-item.active');
    const pill = document.getElementById('nav-indicator-pill');
    if (activeNav && pill) {
        setTimeout(() => {
            pill.style.left = `${activeNav.offsetLeft}px`;
            pill.style.width = `${activeNav.offsetWidth}px`;
        }, 100);
    }

    // 2. Interactive Category Filter Switcher
    const filterBtns = document.querySelectorAll(".cat-filter-btn");
    const tierBlocks = document.querySelectorAll(".sponsor-tier-block");
    const becomeSponsorSec = document.getElementById("become-sponsor");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;

            // Handle "Become a Sponsor" smooth scroll
            if (filter === "proposal") {
                if (becomeSponsorSec) {
                    becomeSponsorSec.scrollIntoView({ behavior: "smooth", block: "start" });
                }
                return;
            }

            // Update active state on buttons
            filterBtns.forEach(b => {
                if (b.dataset.filter !== "proposal") {
                    b.classList.remove("active");
                }
            });
            btn.classList.add("active");

            // Filter blocks with smooth fade
            tierBlocks.forEach(block => {
                const category = block.dataset.category;
                if (filter === "all" || category === filter) {
                    block.style.display = "flex";
                    setTimeout(() => {
                        block.style.opacity = "1";
                        block.style.transform = "translateY(0)";
                    }, 20);
                } else {
                    block.style.opacity = "0";
                    block.style.transform = "translateY(15px)";
                    setTimeout(() => {
                        block.style.display = "none";
                    }, 300);
                }
            });
        });
    });

    // 3. Holographic 3D Tilt Card Interaction
    const tiltCards = document.querySelectorAll("[data-tilt]");
    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Subtle rotation angles (max ~5 degrees for smooth cyber feel)
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    });

    // 4. Tier Simulator Interactive Engine
    const simBtns = document.querySelectorAll(".sim-btn");
    const simReach = document.getElementById("simReach");
    const simStalls = document.getElementById("simStalls");
    const simKeynote = document.getElementById("simKeynote");

    let currentSelectedTier = "Title Sponsor";

    simBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            simBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            currentSelectedTier = btn.textContent.trim() + " Sponsor";

            if (simReach) simReach.textContent = btn.dataset.reach || "50,000+ Footfall & 5M+ Digital";
            if (simStalls) simStalls.textContent = btn.dataset.stalls || "3 Exclusive VIP Stalls";
            if (simKeynote) simKeynote.textContent = btn.dataset.keynote || "Mainstage Keynote & Title Naming";
        });
    });

    // 5. Form Submission & Confirmation Modal
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
});
