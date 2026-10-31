/**
 * PRAVAAH 2026 - TEAM DIRECTORY ENGINE
 */

document.addEventListener("DOMContentLoaded", () => {
    // Cosmic Nav indicator alignment
    const activeNav = document.querySelector('.nav-item.active');
    const pill = document.getElementById('nav-indicator-pill');
    if (activeNav && pill) {
        setTimeout(() => {
            pill.style.left = `${activeNav.offsetLeft}px`;
            pill.style.width = `${activeNav.offsetWidth}px`;
        }, 120);
    }
});
