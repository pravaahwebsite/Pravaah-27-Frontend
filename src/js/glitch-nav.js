// Glitch Navigation & Cosmic Nav Controller
document.addEventListener('DOMContentLoaded', () => {
    // 1. Ensure Screen Glitch Overlay exists in DOM
    let glitchOverlay = document.getElementById('screen-glitch-overlay');
    if (!glitchOverlay) {
        glitchOverlay = document.createElement('div');
        glitchOverlay.id = 'screen-glitch-overlay';
        glitchOverlay.className = 'screen-glitch-overlay';
        glitchOverlay.innerHTML = `
            <div class="glitch-halftone"></div>
            <div class="glitch-shard shard-1"></div>
            <div class="glitch-shard shard-2"></div>
            <div class="glitch-shard shard-3"></div>
            <div class="glitch-shard shard-4"></div>
            <div class="glitch-shard shard-5"></div>
            <div class="glitch-noise"></div>
        `;
        document.body.appendChild(glitchOverlay);
    }

    // 2. Ensure Cosmic Page Loader exists in DOM
    let pageLoader = document.getElementById('cosmic-page-loader');
    if (!pageLoader) {
        pageLoader = document.createElement('div');
        pageLoader.id = 'cosmic-page-loader';
        pageLoader.className = 'cosmic-page-loader';
        pageLoader.setAttribute('aria-hidden', 'true');
        pageLoader.innerHTML = `
            <div class="loader-content">
                <div class="loader-portal-ring">
                    <div class="loader-ring ring-1"></div>
                    <div class="loader-ring ring-2"></div>
                    <div class="loader-ring ring-3"></div>
                    <div class="loader-core-pulse">
                        <span class="loader-core-glyph">✦</span>
                    </div>
                </div>
                <div class="loader-info">
                    <div class="loader-tag">PRAVAAH '26 // MULTIVERSE TRANSIT</div>
                    <div class="loader-status" id="loader-status-text">INITIALIZING QUANTUM JUMP...</div>
                    <div class="loader-progress-track">
                        <div class="loader-progress-bar"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(pageLoader);
    }

    function triggerGlitch() {
        if (!glitchOverlay) return;
        glitchOverlay.classList.remove('glitch-active');
        void glitchOverlay.offsetWidth;
        glitchOverlay.classList.add('glitch-active');

        const titles = document.querySelectorAll('.spider-title, .logo-title, .calendar-page-heading, .universe-page-heading, .events-hero-title, .pass-title, .contact-name, .agent-name, [data-text]');
        titles.forEach(t => {
            t.classList.remove('spider-glitch-active');
            void t.offsetWidth;
            t.classList.add('spider-glitch-active');
        });

        setTimeout(() => {
            glitchOverlay.classList.remove('glitch-active');
            titles.forEach(t => t.classList.remove('spider-glitch-active'));
        }, 220);
    }

    // 3. Handle arrival on new page: dissolve loader, then trigger glitch burst
    const isTransitArrival = sessionStorage.getItem('pravaahPortalTransit') === 'true';
    if (isTransitArrival) {
        sessionStorage.removeItem('pravaahPortalTransit');
        if (pageLoader) pageLoader.classList.add('loader-active');
        setTimeout(() => {
            if (pageLoader) pageLoader.classList.remove('loader-active');
            triggerGlitch();
        }, 140);
    } else {
        if (pageLoader) pageLoader.classList.remove('loader-active');
        triggerGlitch();
    }

    // Dismiss loader if restored from browser bfcache / history navigation
    window.addEventListener('pageshow', () => {
        if (pageLoader) pageLoader.classList.remove('loader-active');
    });

    // 4. Attach portal loading screen transition to navigation link clicks (WITHOUT glitching current page)
    function getCleanPageTitle(link, href) {
        const text = (link.textContent || '').trim().replace(/[\r\n\t]+/g, ' ');
        if (text && text.length < 30) {
            return text.toUpperCase();
        }
        const file = href.split('/').pop().replace('.html', '');
        return file.toUpperCase();
    }

    document.querySelectorAll('a.nav-item, .footer-links-list a, .footer-col a, .portal-action-btn, a[href$=".html"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !link.hasAttribute('target') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('javascript:')) {
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                const targetPage = href.split('/').pop();

                if (targetPage !== currentPage && (targetPage !== 'index.html' || currentPage !== '')) {
                    e.preventDefault();

                    const destName = getCleanPageTitle(link, href);
                    const statusText = document.getElementById('loader-status-text');
                    if (statusText) {
                        statusText.textContent = `WARPING TO ${destName}...`;
                    }

                    // Display loading screen on current page without triggering glitch
                    if (pageLoader) {
                        pageLoader.classList.add('loader-active');
                    }

                    try {
                        sessionStorage.setItem('pravaahPortalTransit', 'true');
                    } catch (err) {}

                    setTimeout(() => {
                        window.location.href = href;
                    }, 240);
                }
            }
        });
    });

    // 4. Cosmic Nav Wheel Active Indicator & Hover Pill Tracker
    function getActiveNav() {
        let activeNav = document.querySelector('.nav-item.active');
        if (!activeNav) {
            const path = window.location.pathname.split('/').pop() || 'index.html';
            activeNav = Array.from(document.querySelectorAll('.nav-item')).find(item => {
                const href = item.getAttribute('href');
                return href === path || (path === '' && href === 'index.html');
            }) || document.querySelector('.nav-item[href="index.html"]') || document.querySelector('.nav-item');
            if (activeNav) {
                activeNav.classList.add('active');
            }
        }
        return activeNav;
    }

    function updateNavPill() {
        const activeNav = getActiveNav();
        const pill = document.getElementById('nav-indicator-pill');
        if (activeNav && pill) {
            pill.style.left = `${activeNav.offsetLeft}px`;
            pill.style.width = `${activeNav.offsetWidth}px`;
        }
    }

    const navWheel = document.getElementById('cosmic-nav-wheel');
    const navTrack = document.querySelector('.nav-wheel-track');

    // Create or locate hover pill element
    let hoverPill = document.getElementById('nav-hover-pill');
    if (!hoverPill && navTrack) {
        hoverPill = document.createElement('div');
        hoverPill.id = 'nav-hover-pill';
        hoverPill.className = 'nav-hover-pill';
        navTrack.insertBefore(hoverPill, navTrack.firstChild);
    }

    function showHoverPill(item) {
        if (!hoverPill) return;
        const activeNav = getActiveNav();
        if (item === activeNav) {
            hideHoverPill();
            return;
        }
        hoverPill.style.left = `${item.offsetLeft}px`;
        hoverPill.style.width = `${item.offsetWidth}px`;
        hoverPill.classList.add('active-hover');
        hoverPill.style.opacity = '1';
    }

    function hideHoverPill() {
        if (!hoverPill) return;
        hoverPill.classList.remove('active-hover');
        hoverPill.style.opacity = '0';
    }

    updateNavPill();
    setTimeout(updateNavPill, 120);
    window.addEventListener('resize', () => {
        updateNavPill();
        hideHoverPill();
    });
    window.addEventListener('load', updateNavPill);

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            showHoverPill(item);
        });
        item.addEventListener('focus', () => {
            showHoverPill(item);
        });
    });

    if (navTrack) {
        navTrack.addEventListener('mouseleave', hideHoverPill);
        navTrack.addEventListener('focusout', (e) => {
            if (!navTrack.contains(e.relatedTarget)) {
                hideHoverPill();
            }
        });
    }

    if (navWheel) {
        navWheel.addEventListener('mouseleave', hideHoverPill);
    }
});
