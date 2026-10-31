/**
 * PRAVAAH 2026 - COMMAND TRANSMISSION & HELPDESK ENGINE
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

    // Modal elements
    const contactDispatchForm = document.getElementById("contactDispatchForm");
    const contactSuccessModal = document.getElementById("contactSuccessModal");
    const closeContactModalBtn = document.getElementById("closeContactModalBtn");
    const modalTicketRef = document.getElementById("modalTicketRef");
    const modalCtName = document.getElementById("modalCtName");
    const modalCtCategory = document.getElementById("modalCtCategory");

    if (contactDispatchForm) {
        contactDispatchForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameVal = document.getElementById("ct-name") ? document.getElementById("ct-name").value : "Alex Mercer";
            const categoryVal = document.getElementById("ct-category") ? document.getElementById("ct-category").value : "General Query";
            const refNum = "TKT-2026-C" + Math.floor(1000 + Math.random() * 9000);

            if (modalTicketRef) modalTicketRef.textContent = refNum;
            if (modalCtName) modalCtName.textContent = nameVal;
            if (modalCtCategory) modalCtCategory.textContent = categoryVal;

            if (contactSuccessModal) {
                contactSuccessModal.classList.add("modal-open");
            }
        });
    }

    if (closeContactModalBtn) {
        closeContactModalBtn.addEventListener("click", () => {
            if (contactSuccessModal) {
                contactSuccessModal.classList.remove("modal-open");
            }
        });
    }
});
