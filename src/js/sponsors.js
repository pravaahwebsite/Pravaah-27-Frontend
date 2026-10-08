/**
 * PRAVAAH 2026 - CORPORATE SPONSORS & PARTNERSHIPS ENGINE
 */

document.addEventListener("DOMContentLoaded", () => {
    // Nav indicator alignment
    const activeNav = document.querySelector('.nav-item.active');
    const pill = document.getElementById('nav-indicator-pill');
    if (activeNav && pill) {
        setTimeout(() => {
            pill.style.left = `${activeNav.offsetLeft}px`;
            pill.style.width = `${activeNav.offsetWidth}px`;
        }, 100);
    }

    // Tier Simulator Buttons
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

    // Form submit handler
    const sponsorProposalForm = document.getElementById("sponsorProposalForm");
    const sponsorSuccessModal = document.getElementById("sponsorSuccessModal");
    const closeSponsorModalBtn = document.getElementById("closeSponsorModalBtn");
    const modalSpCompany = document.getElementById("modalSpCompany");
    const modalSpRep = document.getElementById("modalSpRep");
    const modalSpTier = document.getElementById("modalSpTier");

    if (sponsorProposalForm) {
        sponsorProposalForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const companyVal = document.getElementById("sp-company") ? document.getElementById("sp-company").value : "Acme Corp";
            const repVal = document.getElementById("sp-rep") ? document.getElementById("sp-rep").value : "Sarah Jenkins";

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
