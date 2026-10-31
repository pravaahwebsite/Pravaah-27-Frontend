// Glitch Navigation & Cosmic Nav Controller (Pravāah '26)
document.addEventListener('DOMContentLoaded', () => {
    // 1. Ensure Screen Glitch Overlay exists in DOM with full shard set
    let glitchOverlay = document.getElementById('screen-glitch-overlay');
    if (!glitchOverlay) {
        glitchOverlay = document.createElement('div');
        glitchOverlay.id = 'screen-glitch-overlay';
        glitchOverlay.className = 'screen-glitch-overlay';
        document.body.appendChild(glitchOverlay);
    }
    const existingShards = glitchOverlay.querySelectorAll('.glitch-shard');
    if (existingShards.length < 24) {
        let shardsHtml = '<div class="glitch-halftone"></div>\n';
        for (let i = 1; i <= 24; i++) {
            shardsHtml += `            <div class="glitch-shard shard-${i}"></div>\n`;
        }
        shardsHtml += '            <div class="glitch-noise"></div>';
        glitchOverlay.innerHTML = shardsHtml;
    }

    // 2. Ensure Cosmic Page Loader (Circular Dotted Loader) exists in DOM
    function ensurePageLoader() {
        let pageLoader = document.getElementById('cosmic-page-loader');
        if (!pageLoader) {
            pageLoader = document.createElement('div');
            pageLoader.id = 'cosmic-page-loader';
            pageLoader.className = 'cosmic-page-loader';
            pageLoader.setAttribute('aria-hidden', 'true');
            pageLoader.innerHTML = `
                <div class="loader-content">
                    <div class="circular-dotted-loader-container">
                        <svg class="circular-dotted-svg" viewBox="0 0 160 160" width="160" height="160">
                            <defs>
                                <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <filter id="dot-glow-intense" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <g class="dotted-ring-group">
                                <circle cx="140.00" cy="80.00" r="1.40" fill="#00f2fe" opacity="0.15" filter="url(#dot-glow)" class="loader-dot dot-0" />
                                <circle cx="137.96" cy="95.53" r="1.63" fill="#00f2fe" opacity="0.19" filter="url(#dot-glow)" class="loader-dot dot-1" />
                                <circle cx="131.96" cy="110.00" r="1.85" fill="#00f2fe" opacity="0.22" filter="url(#dot-glow)" class="loader-dot dot-2" />
                                <circle cx="122.43" cy="122.43" r="2.08" fill="#00f2fe" opacity="0.26" filter="url(#dot-glow)" class="loader-dot dot-3" />
                                <circle cx="110.00" cy="131.96" r="2.30" fill="#00f2fe" opacity="0.30" filter="url(#dot-glow)" class="loader-dot dot-4" />
                                <circle cx="95.53" cy="137.96" r="2.53" fill="#00f2fe" opacity="0.33" filter="url(#dot-glow)" class="loader-dot dot-5" />
                                <circle cx="80.00" cy="140.00" r="2.76" fill="#00f2fe" opacity="0.37" filter="url(#dot-glow)" class="loader-dot dot-6" />
                                <circle cx="64.47" cy="137.96" r="2.98" fill="#00f2fe" opacity="0.41" filter="url(#dot-glow)" class="loader-dot dot-7" />
                                <circle cx="50.00" cy="131.96" r="3.21" fill="#00f2fe" opacity="0.45" filter="url(#dot-glow)" class="loader-dot dot-8" />
                                <circle cx="37.57" cy="122.43" r="3.43" fill="#0066ff" opacity="0.48" filter="url(#dot-glow)" class="loader-dot dot-9" />
                                <circle cx="28.04" cy="110.00" r="3.66" fill="#0066ff" opacity="0.52" filter="url(#dot-glow)" class="loader-dot dot-10" />
                                <circle cx="22.04" cy="95.53" r="3.89" fill="#0066ff" opacity="0.56" filter="url(#dot-glow)" class="loader-dot dot-11" />
                                <circle cx="20.00" cy="80.00" r="4.11" fill="#0066ff" opacity="0.59" filter="url(#dot-glow)" class="loader-dot dot-12" />
                                <circle cx="22.04" cy="64.47" r="4.34" fill="#0066ff" opacity="0.63" filter="url(#dot-glow)" class="loader-dot dot-13" />
                                <circle cx="28.04" cy="50.00" r="4.57" fill="#0066ff" opacity="0.67" filter="url(#dot-glow-intense)" class="loader-dot dot-14" />
                                <circle cx="37.57" cy="37.57" r="4.79" fill="#0066ff" opacity="0.70" filter="url(#dot-glow-intense)" class="loader-dot dot-15" />
                                <circle cx="50.00" cy="28.04" r="5.02" fill="#0066ff" opacity="0.74" filter="url(#dot-glow-intense)" class="loader-dot dot-16" />
                                <circle cx="64.47" cy="22.04" r="5.24" fill="#bd00ff" opacity="0.78" filter="url(#dot-glow-intense)" class="loader-dot dot-17" />
                                <circle cx="80.00" cy="20.00" r="5.47" fill="#bd00ff" opacity="0.82" filter="url(#dot-glow-intense)" class="loader-dot dot-18" />
                                <circle cx="95.53" cy="22.04" r="5.70" fill="#bd00ff" opacity="0.85" filter="url(#dot-glow-intense)" class="loader-dot dot-19" />
                                <circle cx="110.00" cy="28.04" r="5.92" fill="#bd00ff" opacity="0.89" filter="url(#dot-glow-intense)" class="loader-dot dot-20" />
                                <circle cx="122.43" cy="37.57" r="6.15" fill="#bd00ff" opacity="0.93" filter="url(#dot-glow-intense)" class="loader-dot dot-21" />
                                <circle cx="131.96" cy="50.00" r="6.37" fill="#bd00ff" opacity="0.96" filter="url(#dot-glow-intense)" class="loader-dot dot-22" />
                                <circle cx="137.96" cy="64.47" r="6.60" fill="#bd00ff" opacity="1.00" filter="url(#dot-glow-intense)" class="loader-dot dot-23" />
                            </g>
                        </svg>
                    </div>
                    <div class="loader-info">
                        <div class="loader-tag">PRAVAAH '26 // MULTIVERSE TRANSIT</div>
                        <div class="loader-status" id="loader-status-text">WARPING TO DIMENSIONS...</div>
                    </div>
                </div>
            `;
            document.body.appendChild(pageLoader);
        }
        return pageLoader;
    }

    const pageLoader = ensurePageLoader();

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

    // 3. Navigation lifecycle handling with 1.5 seconds loading effect duration
    const REQUIRED_LOADER_DURATION = 1500; // 1.5 seconds duration
    const isTransitArrival = sessionStorage.getItem('pravaahPortalTransit') === 'true';
    const startTimeStr = sessionStorage.getItem('pravaahTransitStartTime');
    const startTime = startTimeStr ? parseInt(startTimeStr, 10) : Date.now();

    let loaderFaded = false;

    function revealDestination() {
        if (loaderFaded) return;

        const elapsedTime = Date.now() - startTime;
        const remainingTime = isTransitArrival ? Math.max(0, REQUIRED_LOADER_DURATION - elapsedTime) : 0;

        setTimeout(() => {
            if (loaderFaded) return;
            loaderFaded = true;

            sessionStorage.removeItem('pravaahPortalTransit');
            sessionStorage.removeItem('pravaahTransitStartTime');

            if (pageLoader && pageLoader.classList.contains('loader-active')) {
                pageLoader.classList.remove('loader-active');
                setTimeout(() => {
                    triggerGlitch();
                }, 100);
            } else {
                triggerGlitch();
            }
        }, remainingTime);
    }

    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';
    if (isHomePage) {
        document.body.classList.add('pravaah-home');
        sessionStorage.removeItem('pravaahPortalTransit');
        sessionStorage.removeItem('pravaahTransitStartTime');
    } else {
        document.body.classList.add('pravaah-subpage');
        if (isTransitArrival) {
            if (pageLoader) pageLoader.classList.add('loader-active');
        }
    }

    // Connect fade out to page load readiness + 1.5s total minimum duration
    if (document.readyState === 'complete') {
        revealDestination();
    } else {
        window.addEventListener('load', revealDestination);
        // Fallback safety timeout if load event takes long
        setTimeout(revealDestination, 2500);
    }

    // Dismiss loader if restored from browser bfcache / history navigation
    window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
            loaderFaded = false;
            sessionStorage.removeItem('pravaahPortalTransit');
            sessionStorage.removeItem('pravaahTransitStartTime');
            if (pageLoader) pageLoader.classList.remove('loader-active');
            triggerGlitch();
        }
    });

    // 4. Attach circular dotted loading transition to all internal navigation links & icons
    function getCleanPageTitle(link, href) {
        const text = (link.textContent || link.innerText || '').trim().replace(/[\r\n\t]+/g, ' ');
        if (text && text.length < 30) {
            return text.toUpperCase();
        }
        const file = href.split('/').pop().split('#')[0].replace('.html', '');
        return file ? file.toUpperCase() : 'PRAVAAH';
    }

    function processLinkClick(link, e) {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
            return;
        }

        if (link.getAttribute('target') === '_blank') {
            return;
        }

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const targetPage = href.split('/').pop().split('#')[0] || 'index.html';

        if (targetPage !== currentPage && (targetPage !== 'index.html' || currentPage !== '')) {
            e.preventDefault();

            const destName = getCleanPageTitle(link, href);
            const statusText = document.getElementById('loader-status-text');
            if (statusText) {
                statusText.textContent = `WARPING TO ${destName}...`;
            }

            // Display circular dotted loader overlay on current page
            if (pageLoader) {
                pageLoader.classList.add('loader-active');
            }

            try {
                sessionStorage.setItem('pravaahPortalTransit', 'true');
                sessionStorage.setItem('pravaahTransitStartTime', Date.now().toString());
            } catch (err) {}

            // Real lifecycle navigation
            window.location.href = href;
        }
    }

    document.querySelectorAll('a.nav-item, .nav-wheel-track a, .footer-links-list a, .footer-col a, .portal-action-btn, a[href$=".html"], a.card-link, a.event-card, .quick-link a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            processLinkClick(link, e);
        });
    });

    // Event delegation on document body for dynamically created links/icons
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a[href]');
        if (link && !e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
            processLinkClick(link, e);
        }
    });

    // 5. Cosmic Nav Wheel Active Indicator & Hover Pill Tracker
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

    // 6. Cosmic Hamburger Navigation for All Subpages
    function initSubpageHamburgerNav() {
        if (isHomePage) return;

        // Hide original wheel on subpage
        const oldWheel = document.getElementById('cosmic-nav-wheel');
        if (oldWheel) {
            oldWheel.style.display = 'none';
        }

        let subpageNav = document.getElementById('cosmic-subpage-nav');
        if (!subpageNav) {
            subpageNav = document.createElement('nav');
            subpageNav.id = 'cosmic-subpage-nav';
            subpageNav.className = 'cosmic-subpage-nav';
            subpageNav.setAttribute('aria-label', 'Main Navigation');

            const navItemsData = [
                { href: 'index.html', text: 'HOME', index: '01' },
                { href: 'events.html', text: 'EVENTS', index: '02' },
                { href: 'register.html', text: 'REGISTER', index: '03' },
                { href: 'accommodation.html', text: 'ACCOMMODATION', index: '04' },
                { href: 'photo-gallery.html', text: 'PHOTO GALLERY', index: '05' },
                { href: 'sponsors.html', text: 'SPONSORS', index: '06' },
                { href: 'contact.html', text: 'CONTACT US', index: '07' },
                { href: 'profile.html', text: 'PROFILE', index: '08' }
            ];

            const currentFile = (window.location.pathname.split('/').pop() || 'index.html').split('#')[0];

            let listHtml = '';
            navItemsData.forEach(item => {
                const isActive = item.href === currentFile;
                listHtml += `
                    <li class="hud-nav-item-wrapper" role="none">
                        <a href="${item.href}" class="hud-nav-link nav-item ${isActive ? 'active' : ''}" role="menuitem">
                            <span class="hud-link-index">${item.index}</span>
                            <span class="hud-link-text">${item.text}</span>
                            ${isActive ? '<span class="hud-link-badge">ACTIVE</span>' : ''}
                        </a>
                    </li>
                `;
            });

            subpageNav.innerHTML = `
                <button class="cosmic-hamburger-btn" id="cosmic-hamburger-btn" aria-label="Toggle Navigation Menu" aria-expanded="false" type="button">
                    <div class="hamburger-box">
                        <span class="hamburger-bar bar-1"></span>
                        <span class="hamburger-bar bar-2"></span>
                        <span class="hamburger-bar bar-3"></span>
                    </div>
                    <span class="hamburger-label" id="hamburger-label">MENU</span>
                    <span class="hamburger-pulse-dot" aria-hidden="true"></span>
                </button>

                <div class="cosmic-nav-backdrop" id="cosmic-nav-backdrop" aria-hidden="true"></div>

                <div class="cosmic-hud-dropdown" id="cosmic-hud-dropdown" role="dialog" aria-modal="true" aria-label="Navigation Menu">
                    <div class="hud-dropdown-header">
                        <div class="hud-dropdown-tag">PRAVAAH '27 // HUD NAV</div>
                        <div class="hud-status-badge"><span class="status-live-dot"></span> ONLINE</div>
                    </div>
                    <div class="hud-dropdown-divider"></div>
                    <ul class="hud-nav-list" role="menu">
                        ${listHtml}
                    </ul>
                    <div class="hud-dropdown-footer">
                        <span class="hud-footer-coord">DIMENSION // 2027</span>
                        <span class="hud-footer-sub">TRANSMISSION ACTIVE</span>
                    </div>
                </div>
            `;
            document.body.appendChild(subpageNav);
        }

        const toggleBtn = document.getElementById('cosmic-hamburger-btn');
        const dropdown = document.getElementById('cosmic-hud-dropdown');
        const backdrop = document.getElementById('cosmic-nav-backdrop');
        const hamburgerLabel = document.getElementById('hamburger-label');

        function openNav() {
            if (!toggleBtn || !dropdown) return;
            toggleBtn.classList.add('is-open');
            toggleBtn.setAttribute('aria-expanded', 'true');
            if (hamburgerLabel) hamburgerLabel.textContent = 'CLOSE';
            dropdown.classList.add('is-open');
            if (backdrop) backdrop.classList.add('is-open');
            document.body.classList.add('cosmic-nav-modal-open');
        }

        function closeNav() {
            if (!toggleBtn || !dropdown) return;
            toggleBtn.classList.remove('is-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
            if (hamburgerLabel) hamburgerLabel.textContent = 'MENU';
            dropdown.classList.remove('is-open');
            if (backdrop) backdrop.classList.remove('is-open');
            document.body.classList.remove('cosmic-nav-modal-open');
        }

        function toggleNav() {
            if (dropdown && dropdown.classList.contains('is-open')) {
                closeNav();
            } else {
                openNav();
            }
        }

        if (toggleBtn) {
            toggleBtn.onclick = (e) => {
                e.stopPropagation();
                toggleNav();
            };
        }

        if (backdrop) {
            backdrop.onclick = (e) => {
                e.stopPropagation();
                closeNav();
            };
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && dropdown && dropdown.classList.contains('is-open')) {
                closeNav();
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (dropdown && dropdown.classList.contains('is-open')) {
                if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
                    closeNav();
                }
            }
        });

        // Close on navigation link click & attach transit
        if (dropdown) {
            dropdown.querySelectorAll('.hud-nav-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    closeNav();
                    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    processLinkClick(link, e);
                });
            });
        }
    }

    initSubpageHamburgerNav();
});

