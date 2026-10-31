/**
 * PRAVAAH 2026 - SPONSORS & PARTNERS ENGINE
 * Seamless Navigation, 3D Interactive Card Tilt, and Asset Transmission
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Navigation indicator alignment for cosmic nav wheel
    const activeNav = document.querySelector('.nav-item.active');
    const pill = document.getElementById('nav-indicator-pill');
    if (activeNav && pill) {
        setTimeout(() => {
            pill.style.left = `${activeNav.offsetLeft}px`;
            pill.style.width = `${activeNav.offsetWidth}px`;
        }, 100);
    }

    // 2. 3D Card Hover Tilt Effect & Specular Glow
    const sponsorCards = document.querySelectorAll('.sponsor-card');
    sponsorCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
        });
    });

    // 3. Sponsorship Brochure PDF Download Trigger
    const brochureBox = document.getElementById('downloadBrochureBtn');
    if (brochureBox) {
        brochureBox.addEventListener('click', () => {
            window.open('assets/sponsorship-brochure.pdf', '_blank');
        });
    }

    // 4. Become a Sponsor CTA Action
    const becomeSponsorBtn = document.getElementById('becomeSponsorBtn');
    if (becomeSponsorBtn) {
        becomeSponsorBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Opens email client prefilled for sponsorship lead, with fallback to contact page
            window.location.href = "mailto:coord.pravaah@iitbbs.ac.in?subject=Pravaah%202026%20Sponsorship%20Inquiry";
        });
    }
});
