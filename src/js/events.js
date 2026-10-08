document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       NAV
       ========================================================= */

    const activeNav = document.querySelector('.nav-item.active');
    const pill = document.getElementById('nav-indicator-pill');

    if (activeNav && pill) {
        setTimeout(() => {
            pill.style.left = `${activeNav.offsetLeft}px`;
            pill.style.width = `${activeNav.offsetWidth}px`;
        }, 100);
    }


    /* =========================================================
       VERSES
       ========================================================= */

    const verses = [
        {
            key: 'tech',
            label: 'TECH EVENT',
            heading: 'TECHNICAL EVENTS',
            color: 'var(--tech-color)',
            angle: -90
        },
        {
            key: 'cult',
            label: 'CULT EVENT',
            heading: 'CULTURAL EVENTS',
            color: 'var(--cult-color)',
            angle: 30
        },
        {
            key: 'ent',
            label: 'ENT EVENT',
            heading: 'ENTREPRENEUR EVENTS',
            color: 'var(--ent-color)',
            angle: 150
        }
    ];


    /* =========================================================
       EVENT DATA
       ========================================================= */

    const eventsData = [

        /* ---------------- TECH ---------------- */

        {
            id: 'tech-1',
            verse: 'tech',
            verseName: 'TECH EVENT',
            name: 'Robo Soccer',
            icon: '🤖',
            desc: 'Build a customized autonomous or manual robot to battle in a futuristic arena and claim the championship trophy.',
            date: 'Oct 15, 10:00 AM',
            day: '1',
            venue: 'Robotics Bay A',
            prize: '₹75,000',
            team: '2 - 4 Members',
            rules: [
                'Robot dimensions must not exceed 30cm x 30cm x 30cm at start.',
                'Max weight allowance is 5.0 kg including battery.',
                'Match duration: 2 halves of 4 minutes each with 1 min break.',
                'No damaging weapons or entanglement mechanisms allowed.'
            ]
        },

        {
            id: 'tech-2',
            verse: 'tech',
            verseName: 'TECH EVENT',
            name: 'Code-A-Thon',
            icon: '💻',
            desc: 'A grueling 24-hour sprint where developer teams solve complex algorithmic problems and real-world system challenges.',
            date: 'Oct 16, 09:00 AM',
            day: '2',
            venue: 'Matrix Lab 3',
            prize: '₹60,000',
            team: '1 - 3 Members',
            rules: [
                '24-hour non-stop algorithmic sprint.',
                'Submissions tested against rigorous hidden test suites.',
                'Languages supported: C++, Java, Python, Rust, Go.',
                'Use of AI assistance tools is strictly monitored and scored.'
            ]
        },

        {
            id: 'tech-3',
            verse: 'tech',
            verseName: 'TECH EVENT',
            name: 'AI Odyssey',
            icon: '🧠',
            desc: 'Design and train a deep learning model to navigate, classify, and resolve dimensional anomalies in noisy datasets.',
            date: 'Oct 17, 11:30 AM',
            day: '3',
            venue: 'Neuromorphic Hall',
            prize: '₹50,000',
            team: '1 - 2 Members',
            rules: [
                'Dataset provided at 11:30 AM on Day 3.',
                'Model evaluation based on F1-Score, latency, and parameter size.',
                'Final presentations to AI faculty and industry judges.'
            ]
        },

        {
            id: 'tech-4',
            verse: 'tech',
            verseName: 'TECH EVENT',
            name: 'WebCraft UI/UX',
            icon: '🌐',
            desc: 'Create futuristic, ultra-smooth interactive web experiences using modern canvas, WebGL, and reactive component frameworks.',
            date: 'Oct 15, 02:00 PM',
            day: '1',
            venue: 'Cyber Center 1',
            prize: '₹40,000',
            team: '1 - 2 Members',
            rules: [
                'Theme announced at the start of the 6-hour hack session.',
                'Judged on aesthetics, micro-interactions, responsive fluidity, and performance.',
                'Live deployment required on GitHub Pages / Vercel.'
            ]
        },

        {
            id: 'tech-5',
            verse: 'tech',
            verseName: 'TECH EVENT',
            name: 'Mech-Trix CAD Design',
            icon: '⚙️',
            desc: 'CAD 3D modeling challenge to construct aerodynamic space exploration rovers and drone frameworks.',
            date: 'Oct 17, 03:00 PM',
            day: '3',
            venue: 'Simulation Annex',
            prize: '₹35,000',
            team: 'Individual / Duo',
            rules: [
                'Software: SolidWorks, Fusion 360, or CATIA.',
                'Designs must withstand stress-strain simulation analysis.'
            ]
        },


        /* ---------------- CULT ---------------- */

        {
            id: 'cult-1',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'Step Up Group Dance',
            icon: '💃',
            desc: 'Unleash street dance, hip-hop, or classical choreography in a high-octane stage showdown.',
            date: 'Oct 16, 06:00 PM',
            day: '2',
            venue: 'Main Arena Gate 1',
            prize: '₹80,000',
            team: '6 - 20 Members',
            rules: [
                'Time limit: 8 - 12 minutes including stage setup.',
                'Props allowed with prior declaration.',
                'Judged on synchronization, choreography, energy, and costumes.'
            ]
        },

        {
            id: 'cult-2',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'Symphony Rock Battle',
            icon: '🎸',
            desc: 'The ultimate rock and fusion band championship. Feel acoustic decibels shake the multiverse.',
            date: 'Oct 17, 07:00 PM',
            day: '3',
            venue: 'The Amphitheater',
            prize: '₹100,000',
            team: '3 - 8 Members',
            rules: [
                'Performance slot: 20 minutes including 5 min line check.',
                'At least one original composition or creative adaptation required.',
                'Full drum kit and sound amplification provided.'
            ]
        },

        {
            id: 'cult-3',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'Dramatics & Street Play',
            icon: '🎭',
            desc: 'Intense street theatre competition portraying contemporary social realities and cosmic satire.',
            date: 'Oct 15, 12:00 PM',
            day: '1',
            venue: 'Central Plaza',
            prize: '₹45,000',
            team: '8 - 25 Members',
            rules: [
                'Acoustic instruments and live vocals only (no mic/speakers).',
                'Performance duration: 15 minutes max.'
            ]
        },

        {
            id: 'cult-4',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'Voice of Pravaah',
            icon: '🎤',
            desc: 'Solo vocal competition spanning classical, western pop, rock, and Bollywood melodies.',
            date: 'Oct 16, 02:00 PM',
            day: '2',
            venue: 'Auditorium Prime',
            prize: '₹30,000',
            team: 'Solo + 1 Accompanist',
            rules: [
                'Time limit: 5 minutes.',
                'Backing tracks or 1 instrumentalist permitted.'
            ]
        },

        {
            id: 'cult-5',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'Vogue Cosmic Fashion',
            icon: '✨',
            desc: 'Futuristic fashion runway reflecting themes of cyberpunk, neon retro-futurism, and sustainable haute couture.',
            date: 'Oct 18, 08:00 PM',
            day: '4',
            venue: 'The Galaxy Runway',
            prize: '₹90,000',
            team: '10 - 18 Models + Crew',
            rules: [
                'Runway time: 12 - 15 minutes.',
                'Original themed background music track and narration required.'
            ]
        },


        /* ---------------- ENTREPRENEUR ---------------- */

        {
            id: 'ent-1',
            verse: 'ent',
            verseName: 'ENT EVENT',
            name: 'Pitchers // Shark Arena',
            icon: '💼',
            desc: 'Pitch your early-stage startup or tech innovation directly to real angel investors and VC partners for funding.',
            date: 'Oct 16, 11:00 AM',
            day: '2',
            venue: 'Incubation Center',
            prize: '₹120,000 Funding + Grants',
            team: '1 - 4 Founders',
            rules: [
                '10 minutes pitch deck presentation followed by 5 minutes Q&A.',
                'Must have a working prototype or validated MVP.'
            ]
        },

        {
            id: 'ent-2',
            verse: 'ent',
            verseName: 'ENT EVENT',
            name: 'B-Plan Showdown',
            icon: '📊',
            desc: 'Draft comprehensive corporate business plans detailing market sizing, unit economics, and go-to-market strategies.',
            date: 'Oct 15, 03:00 PM',
            day: '1',
            venue: 'Seminar Room C',
            prize: '₹50,000',
            team: '2 - 4 Members',
            rules: [
                'Executive summary submitted prior to fest.',
                'Finalists present financial models on stage.'
            ]
        },

        {
            id: 'ent-3',
            verse: 'ent',
            verseName: 'ENT EVENT',
            name: 'Crypto & Market Quest',
            icon: '📈',
            desc: 'Live high-frequency simulated stock and crypto market trading platform. Read news feeds and execute trades.',
            date: 'Oct 17, 10:00 AM',
            day: '3',
            venue: 'Finance Lab B',
            prize: '₹35,000',
            team: 'Solo / Duo',
            rules: [
                'Initial virtual capital: $1,000,000.',
                'Highest portfolio valuation at market close wins.'
            ]
        },

        {
            id: 'ent-4',
            verse: 'ent',
            verseName: 'ENT EVENT',
            name: 'Ad-Mad Creative Pitch',
            icon: '📣',
            desc: 'Brainstorm, script, and perform humorous or viral advertisements for bizarre futuristic gadgets.',
            date: 'Oct 15, 11:00 AM',
            day: '1',
            venue: 'Media Auditorium',
            prize: '₹25,000',
            team: '2 - 5 Members',
            rules: [
                'Product allocated on spot with 30 min preparation.',
                '3 minutes live act on stage.'
            ]
        },

        {
            id: 'ent-5',
            verse: 'ent',
            verseName: 'ENT EVENT',
            name: 'Young Innovator Cup',
            icon: '🚀',
            desc: 'Ideation challenge for school and junior college innovators creating tech prototypes for sustainability.',
            date: 'Oct 18, 02:00 PM',
            day: '4',
            venue: 'Incubation Center',
            prize: '₹30,000',
            team: '1 - 3 Students',
            rules: [
                'Working model or poster presentation.',
                'Certificate of Excellence for all participants.'
            ]
        }
    ];


    /* =========================================================
       WHAT YOU LEARN
       ========================================================= */

    const learnById = {

        'tech-1': [
            'Build and control a competition-ready robot.',
            'Apply autonomous/manual decision making under match pressure.',
            'Work on mechanical reliability, strategy, and team coordination.'
        ],

        'tech-2': [
            'Solve algorithmic and system-level programming problems.',
            'Write efficient, testable code under a strict time limit.',
            'Collaborate using modern development workflows and debugging.'
        ],

        'tech-3': [
            'Design practical deep-learning pipelines for noisy data.',
            'Compare model quality, latency, and parameter efficiency.',
            'Present technical results clearly to evaluators.'
        ],

        'tech-4': [
            'Design responsive interfaces with strong interaction quality.',
            'Use modern web rendering and component techniques.',
            'Balance aesthetics, usability, responsiveness, and performance.'
        ],

        'tech-5': [
            'Create precise 3D engineering models.',
            'Translate mechanical concepts into manufacturable CAD geometry.',
            'Evaluate designs with engineering simulation thinking.'
        ],

        'cult-1': [
            'Build synchronized group choreography.',
            'Develop stage presence, movement, and creative direction.',
            'Coordinate a large team under performance time limits.'
        ],

        'cult-2': [
            'Arrange and perform music as a coordinated band.',
            'Develop stage control, musical interpretation, and originality.',
            'Work with live instrumentation and sound constraints.'
        ],

        'cult-3': [
            'Develop a focused street-theatre narrative.',
            'Use performance to communicate contemporary social ideas.',
            'Coordinate cast, timing, and live-stage execution.'
        ],

        'cult-4': [
            'Improve vocal control and performance confidence.',
            'Interpret different musical styles effectively.',
            'Build a polished solo-stage presentation.'
        ],

        'cult-5': [
            'Translate a theme into a complete visual concept.',
            'Coordinate fashion, music, narration, and runway movement.',
            'Build a cohesive futuristic presentation.'
        ],

        'ent-1': [
            'Structure a startup idea into a compelling pitch.',
            'Think about market validation, MVPs, and funding.',
            'Defend the business model through investor-style Q&A.'
        ],

        'ent-2': [
            'Build a structured business plan.',
            'Work with market sizing and financial reasoning.',
            'Communicate strategy and viability to a judging panel.'
        ],

        'ent-3': [
            'Understand simulated market decision-making.',
            'Evaluate risk and portfolio performance.',
            'React to information while managing capital strategically.'
        ],

        'ent-4': [
            'Develop ideas quickly from an unexpected brief.',
            'Combine copywriting, performance, and visual storytelling.',
            'Deliver a concise creative pitch under time pressure.'
        ],

        'ent-5': [
            'Turn an idea into a practical sustainability-focused concept.',
            'Think about prototyping and real-world impact.',
            'Present an innovation clearly to an evaluation panel.'
        ]

    };


    /* =========================================================
       DOM
       ========================================================= */

    const portalNetworkContainer =
        document.getElementById('portal-network-container');

    const portalOrbitWrapper =
        document.getElementById('portal-orbit-wrapper');

    const networkSvg =
        document.getElementById('network-svg');

    const pravaahCore =
        document.getElementById('pravaah-core');

    const corePrompt =
        document.getElementById('core-deploy-prompt');

    const liveCoords =
        document.getElementById('live-coords');

    const eventsPortalHero =
        document.querySelector('.events-portal-hero');

    const verseEventListView =
        document.getElementById('verse-event-list-view');

    const verseEventList =
        document.getElementById('verse-event-list');

    const verseListBadge =
        document.getElementById('verse-list-badge');

    const verseListTitle =
        document.getElementById('verse-list-title');

    const verseListSubtitle =
        document.getElementById('verse-list-subtitle');

    const verseListCount =
        document.getElementById('verse-list-count');

    const backToVerses =
        document.getElementById('back-to-verses');

    const explorerView =
        document.getElementById('event-explorer-view');

    const backToCards =
        document.getElementById('back-to-event-cards');

    const explorerVerse =
        document.getElementById('explorer-verse');

    const explorerTitle =
        document.getElementById('explorer-title');

    const explorerDesc =
        document.getElementById('explorer-desc');

    const explorerDate =
        document.getElementById('explorer-date');

    const explorerVenue =
        document.getElementById('explorer-venue');

    const explorerTeam =
        document.getElementById('explorer-team');

    const explorerPrize =
        document.getElementById('explorer-prize');

    const explorerImage =
        document.getElementById('explorer-image');

    const explorerLearn =
        document.getElementById('explorer-learn');

    const explorerRules =
        document.getElementById('explorer-rules');

    const explorerRegister =
        document.getElementById('explorer-register');

    const explorerRuleCount =
        document.getElementById('explorer-rule-count');

    const eventsHeroTitle =
        document.querySelector('.events-hero-title');


    /* =========================================================
       STATE
       ========================================================= */

    let orbitAngle = 0;
    let isOrbitPaused = false;
    let isNetworkDeployed = false;
    let activeVerse = null;
    let activeEvent = null;


    /* =========================================================
       CATEGORY HEADING
       ========================================================= */

    function animateCategoryHeading(title) {

        if (!eventsHeroTitle) {
            return;
        }

        eventsHeroTitle.classList.remove(
            'category-heading-reveal'
        );

        eventsHeroTitle.innerHTML = '';

        eventsHeroTitle.setAttribute(
            'data-text',
            title
        );

        [...title].forEach((character, index) => {

            const span =
                document.createElement('span');

            span.className =
                'category-heading-letter';

            span.textContent =
                character === ' '
                    ? '\u00A0'
                    : character;

            span.style.animationDelay =
                `${index * 120}ms`;

            eventsHeroTitle.appendChild(
                span
            );

        });

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                eventsHeroTitle.classList.add(
                    'category-heading-reveal'
                );

            });

        });

    }


    /* =========================================================
       PORTAL NETWORK
       ========================================================= */

    function renderPortalNetwork() {

        if (
            !portalNetworkContainer ||
            !networkSvg ||
            !portalOrbitWrapper
        ) {
            return;
        }

        portalOrbitWrapper
            .querySelectorAll('.portal-node')
            .forEach(
                node => node.remove()
            );

        networkSvg.innerHTML = '';

        const rect =
            portalNetworkContainer.getBoundingClientRect();

        if (
            !rect.width ||
            !rect.height
        ) {
            return;
        }

        const cx =
            rect.width / 2;

        const cy =
            rect.height / 2;

        const isMobile =
            window.innerWidth <= 768;

        const minDimension =
            Math.min(
                rect.width,
                rect.height
            );

        const radius =
            isMobile
                ? minDimension * 0.32
                : minDimension * 0.38;


        const ring =
            document.createElementNS(
                'http://www.w3.org/2000/svg',
                'circle'
            );

        ring.setAttribute(
            'cx',
            cx
        );

        ring.setAttribute(
            'cy',
            cy
        );

        ring.setAttribute(
            'r',
            50
        );

        ring.setAttribute(
            'stroke',
            'rgba(255, 223, 122, 0.25)'
        );

        ring.setAttribute(
            'stroke-width',
            '2'
        );

        ring.setAttribute(
            'fill',
            'none'
        );

        ring.setAttribute(
            'id',
            'core-svg-ring'
        );

        ring.setAttribute(
            'opacity',
            isNetworkDeployed ? '1' : '0'
        );

        networkSvg.appendChild(
            ring
        );


        verses.forEach(
            verse => {

                const radians =
                    verse.angle *
                    Math.PI /
                    180;

                const px =
                    cx +
                    Math.cos(radians) *
                    radius;

                const py =
                    cy +
                    Math.sin(radians) *
                    radius;


                const path =
                    document.createElementNS(
                        'http://www.w3.org/2000/svg',
                        'path'
                    );

                path.setAttribute(
                    'd',
                    `M ${cx} ${cy} L ${px} ${py}`
                );

                path.setAttribute(
                    'stroke',
                    verse.color
                );

                path.setAttribute(
                    'stroke-width',
                    '2'
                );

                path.setAttribute(
                    'fill',
                    'none'
                );

                path.setAttribute(
                    'id',
                    `path-core-${verse.key}`
                );

                path.style.filter =
                    `drop-shadow(0 0 2px ${verse.color})`;

                path.style.opacity =
                    isNetworkDeployed
                        ? '0.55'
                        : '0';

                networkSvg.appendChild(
                    path
                );


                const portal =
                    document.createElement('div');

                portal.className =
                    `portal-node portal-${verse.key}`;

                portal.dataset.targetLeft =
                    px;

                portal.dataset.targetTop =
                    py;

                portal.dataset.verse =
                    verse.key;


                if (isNetworkDeployed) {

                    portal.style.left =
                        `${px}px`;

                    portal.style.top =
                        `${py}px`;

                    portal.style.transform =
                        'translate(-50%, -50%) scale(1)';

                    portal.style.opacity =
                        '1';

                    portal.style.pointerEvents =
                        'auto';

                } else {

                    portal.style.left =
                        `${cx}px`;

                    portal.style.top =
                        `${cy}px`;

                    portal.style.transform =
                        'translate(-50%, -50%) scale(0)';

                    portal.style.opacity =
                        '0';

                    portal.style.pointerEvents =
                        'none';

                }


                const moonCount =
                    verse.key === 'tech'
                        ? 2
                        : 1;

                let moons = '';

                for (
                    let i = 0;
                    i < moonCount;
                    i++
                ) {

                    const speed =
                        6 +
                        i * 5;

                    const offset =
                        isMobile
                            ? 35 + i * 6
                            : 65 + i * 10;

                    moons += `
                        <div
                            class="portal-moon-orbit"
                            style="
                                animation-name:${i === 1 ? 'spin-counter' : 'spin'};
                                animation-duration:${speed}s;
                            "
                        >
                            <div
                                class="portal-moon"
                                style="
                                    background-color:${verse.color};
                                    box-shadow:0 0 8px ${verse.color};
                                    top:${-offset}px;
                                "
                            ></div>
                        </div>
                    `;

                }


                portal.innerHTML = `
                    <div class="portal-upright-wrapper">

                        <div class="portal-ring-swirl"></div>

                        <div class="portal-center">
                            ${verse.key.toUpperCase().substring(0, 4)}
                        </div>

                        <span class="portal-label">
                            ${verse.label}
                        </span>

                        ${moons}

                    </div>
                `;


                portal.addEventListener(
                    'mouseenter',
                    () => {
                        isOrbitPaused = true;
                    }
                );


                portal.addEventListener(
                    'mouseleave',
                    () => {
                        isOrbitPaused = false;
                    }
                );


                portal.addEventListener(
                    'click',
                    event => {

                        event.stopPropagation();

                        activatePortalBranch(
                            verse.key
                        );

                    }
                );


                portalOrbitWrapper.appendChild(
                    portal
                );

            }
        );

    }


    /* =========================================================
       CARD SCROLL REVEAL
       ========================================================= */

    function revealVisibleEventCards() {

        if (
            !verseEventListView ||
            !verseEventList
        ) {
            return;
        }

        const viewportRect =
            verseEventListView.getBoundingClientRect();

        const visibleTop =
            viewportRect.top +
            viewportRect.height * 0.06;

        const visibleBottom =
            viewportRect.bottom -
            viewportRect.height * 0.06;

        const hiddenCards =
            [
                ...verseEventList.querySelectorAll(
                    '.reference-event-card:not(.is-visible)'
                )
            ].filter(
                card => {

                    const cardRect =
                        card.getBoundingClientRect();

                    return (
                        cardRect.top < visibleBottom &&
                        cardRect.bottom > visibleTop
                    );

                }
            );


        hiddenCards.forEach(
            (card, index) => {

                setTimeout(
                    () => {

                        card.classList.add(
                            'is-visible'
                        );

                    },
                    index * 120
                );

            }
        );

    }


    if (verseEventListView) {

        verseEventListView.addEventListener(
            'scroll',
            revealVisibleEventCards,
            {
                passive: true
            }
        );

    }


    /* =========================================================
       OPEN VERSE
       ========================================================= */

    function activatePortalBranch(
        verseKey
    ) {

        if (!isNetworkDeployed) {
            return;
        }

        const selectedVerse =
            verses.find(
                verse =>
                    verse.key ===
                    verseKey
            );

        if (!selectedVerse) {
            return;
        }

        activeVerse =
            verseKey;

        activeEvent =
            null;

        isOrbitPaused =
            true;


        verses.forEach(
            verse => {

                document.body.classList.remove(
                    `verse-${verse.key}-active`
                );

            }
        );


        document.body.classList.add(
            `verse-${verseKey}-active`
        );


        document
            .querySelectorAll(
                '.portal-node'
            )
            .forEach(
                node => {

                    const selected =
                        node.dataset.verse ===
                        verseKey;

                    node.classList.toggle(
                        'active-portal',
                        selected
                    );

                    node.classList.toggle(
                        'portal-dimmed',
                        !selected
                    );

                }
            );


        renderVerseEventList(
            selectedVerse
        );


        eventsPortalHero?.classList.add(
            'event-list-open'
        );


        verseEventListView?.classList.add(
            'visible'
        );


        verseEventListView?.setAttribute(
            'aria-hidden',
            'false'
        );


        /*
         * IMPORTANT:
         * The list was hidden when the cards were created.
         * Wait until the browser has painted the visible list,
         * then calculate which cards are currently visible.
         */

        requestAnimationFrame(
            () => {

                requestAnimationFrame(
                    () => {

                        revealVisibleEventCards();

                    }
                );

            }
        );

    }


    /* =========================================================
       RENDER EVENT CARDS
       ========================================================= */

    function renderVerseEventList(
        verse
    ) {

        if (!verseEventList) {
            return;
        }

        const verseEvents =
            eventsData.filter(
                event =>
                    event.verse ===
                    verse.key
            );


        verseListBadge.textContent =
            verse.label;

        verseListBadge.style.setProperty(
            '--event-color',
            verse.color
        );


        verseListTitle.textContent =
            verse.heading;


        verseListSubtitle.textContent =
            `Explore all ${verseEvents.length} events in the ${verse.label}.`;


        verseListCount.textContent =
            `${verseEvents.length} EVENTS`;


        animateCategoryHeading(
            verse.heading
        );


        verseEventList.innerHTML =
            verseEvents
                .map(
                    event => `

                    <article
                        class="reference-event-card"
                        data-event-id="${event.id}"
                        style="--event-color:${verse.color}"
                    >

                        <div class="reference-card-top-ornament">
                            <span></span>
                        </div>


                        <div class="reference-card-frame">

                            <div class="reference-card-image-wrap">

                                <img
                                    src="assets/images/page5_gallery.jpg"
                                    alt="${event.name}"
                                    loading="lazy"
                                >

                            </div>


                            <div class="reference-card-lower">

                                <div class="reference-card-title-area">

                                    <h3 class="reference-card-title">
                                        ${event.name}
                                    </h3>

                                    <p class="reference-card-description">
                                        ${event.desc}
                                    </p>

                                </div>


                                <div class="reference-card-actions">

                                    <button
                                        type="button"
                                        class="reference-explore-btn"
                                        data-event-id="${event.id}"
                                    >
                                        EXPLORE
                                    </button>


                                    <a
                                        class="reference-register-btn"
                                        href="${registrationHref(event)}"
                                    >
                                        REGISTER
                                    </a>

                                </div>


                                <div class="reference-price-bar">
                                    Prize:
                                    <strong>
                                        ${event.prize}
                                    </strong>
                                </div>

                            </div>

                        </div>

                    </article>

                `
                )
                .join('');


        /* Explore buttons */

        verseEventList
            .querySelectorAll(
                '.reference-explore-btn'
            )
            .forEach(
                button => {

                    button.addEventListener(
                        'click',
                        event => {

                            event.stopPropagation();

                            const selectedEvent =
                                eventsData.find(
                                    item =>
                                        item.id ===
                                        button.dataset.eventId
                                );

                            if (selectedEvent) {

                                openExplorer(
                                    selectedEvent
                                );

                            }

                        }
                    );

                }
            );

    }


    /* =========================================================
       REGISTRATION
       ========================================================= */

    function registrationHref(
        event
    ) {

        return (
            `register.html?event=${encodeURIComponent(event.name)}` +
            `&day=${encodeURIComponent(event.day || '1')}` +
            `&verse=${encodeURIComponent(event.verse)}`
        );

    }


    /* =========================================================
       EVENT EXPLORER
       ========================================================= */

    function openExplorer(
        event
    ) {

        if (!explorerView) {
            return;
        }


        activeEvent =
            event.id;


        const selectedVerse =
            verses.find(
                verse =>
                    verse.key ===
                    event.verse
            );


        explorerVerse.textContent =
            selectedVerse?.label ||
            event.verseName;


        explorerVerse.style.setProperty(
            '--event-color',
            selectedVerse?.color ||
            'var(--tech-color)'
        );


        explorerTitle.textContent =
            event.name;


        explorerDesc.textContent =
            event.desc;


        explorerDate.textContent =
            event.date;


        explorerVenue.textContent =
            event.venue;


        explorerTeam.textContent =
            event.team;


        explorerPrize.textContent =
            event.prize;


        explorerImage.src =
            'assets/images/page5_gallery.jpg';


        explorerImage.alt =
            event.name;


        const learn =
            learnById[event.id] ||
            [
                'Build practical skills through the event challenge.',
                'Apply the concepts in a real competition setting.',
                'Present your work clearly to the judges.'
            ];


        explorerLearn.innerHTML =
            learn
                .map(
                    item =>
                        `<li>${item}</li>`
                )
                .join('');


        explorerRules.innerHTML =
            (event.rules || [])
                .map(
                    rule =>
                        `<li>${rule}</li>`
                )
                .join('');


        explorerRuleCount.textContent =
            `${(event.rules || []).length} RULES`;


        explorerRegister.href =
            registrationHref(event);


        eventsPortalHero?.classList.add(
            'event-explore-open'
        );


        explorerView.classList.add(
            'visible'
        );


        explorerView.setAttribute(
            'aria-hidden',
            'false'
        );


        verseEventListView?.classList.remove(
            'visible'
        );


        verseEventListView?.setAttribute(
            'aria-hidden',
            'true'
        );

    }


    /* =========================================================
       BACK TO CARDS
       ========================================================= */

    function closeExplorerToCards() {

        activeEvent =
            null;


        eventsPortalHero?.classList.remove(
            'event-explore-open'
        );


        explorerView?.classList.remove(
            'visible'
        );


        explorerView?.setAttribute(
            'aria-hidden',
            'true'
        );


        verseEventListView?.classList.add(
            'visible'
        );


        verseEventListView?.setAttribute(
            'aria-hidden',
            'false'
        );


        requestAnimationFrame(
            () => {

                requestAnimationFrame(
                    () => {

                        revealVisibleEventCards();

                    }
                );

            }
        );

    }


    /* =========================================================
       DEPLOY NETWORK
       ========================================================= */

    function deployNetwork() {

        if (!portalNetworkContainer) {
            return;
        }


        isNetworkDeployed =
            !isNetworkDeployed;


        const universePage =
            document.getElementById(
                'universe-page'
            );


        if (isNetworkDeployed) {

            universePage?.classList.remove(
                'network-undeployed'
            );

            universePage?.classList.add(
                'network-deployed'
            );


            corePrompt?.classList.add(
                'fade-out'
            );


            document
                .querySelectorAll(
                    '.portal-node'
                )
                .forEach(
                    node => {

                        node.style.left =
                            `${node.dataset.targetLeft}px`;

                        node.style.top =
                            `${node.dataset.targetTop}px`;

                        node.style.transform =
                            'translate(-50%, -50%) scale(1)';

                        node.style.opacity =
                            '1';

                        node.style.pointerEvents =
                            'auto';

                    }
                );


            document
                .querySelectorAll(
                    '[id^="path-core-"]'
                )
                .forEach(
                    line => {

                        line.style.opacity =
                            '0.55';

                    }
                );


            const ring =
                document.getElementById(
                    'core-svg-ring'
                );


            if (ring) {
                ring.style.opacity =
                    '1';
            }


        } else {

            universePage?.classList.remove(
                'network-deployed'
            );

            universePage?.classList.add(
                'network-undeployed'
            );


            corePrompt?.classList.remove(
                'fade-out'
            );


            activeVerse =
                null;

            activeEvent =
                null;


            eventsPortalHero?.classList.remove(
                'event-list-open',
                'event-explore-open'
            );


            verseEventListView?.classList.remove(
                'visible'
            );


            explorerView?.classList.remove(
                'visible'
            );


            verseEventListView?.setAttribute(
                'aria-hidden',
                'true'
            );


            explorerView?.setAttribute(
                'aria-hidden',
                'true'
            );


            isOrbitPaused =
                false;


            animateCategoryHeading(
                'MULTIVERSE EVENTS'
            );


            const cx =
                portalNetworkContainer.clientWidth / 2;

            const cy =
                portalNetworkContainer.clientHeight / 2;


            document
                .querySelectorAll(
                    '.portal-node'
                )
                .forEach(
                    node => {

                        node.style.left =
                            `${cx}px`;

                        node.style.top =
                            `${cy}px`;

                        node.style.transform =
                            'translate(-50%, -50%) scale(0)';

                        node.style.opacity =
                            '0';

                        node.style.pointerEvents =
                            'none';

                        node.classList.remove(
                            'active-portal',
                            'portal-dimmed'
                        );

                    }
                );


            document
                .querySelectorAll(
                    '[id^="path-core-"]'
                )
                .forEach(
                    line => {

                        line.style.opacity =
                            '0';

                    }
                );


            const ring =
                document.getElementById(
                    'core-svg-ring'
                );


            if (ring) {
                ring.style.opacity =
                    '0';
            }

        }

    }


    /* =========================================================
       BUTTON EVENTS
       ========================================================= */

    if (pravaahCore) {

        pravaahCore.addEventListener(
            'click',
            event => {

                event.stopPropagation();

                deployNetwork();

            }
        );

    }


    if (corePrompt) {

        corePrompt.addEventListener(
            'click',
            event => {

                event.stopPropagation();

                if (!isNetworkDeployed) {
                    deployNetwork();
                }

            }
        );

    }


    if (backToCards) {

        backToCards.addEventListener(
            'click',
            event => {

                event.preventDefault();
                event.stopPropagation();

                closeExplorerToCards();

            }
        );

    }


    if (backToVerses) {

        backToVerses.addEventListener(
            'click',
            event => {

                event.preventDefault();
                event.stopPropagation();


                activeVerse =
                    null;

                activeEvent =
                    null;

                isOrbitPaused =
                    false;


                eventsPortalHero?.classList.remove(
                    'event-list-open',
                    'event-explore-open'
                );


                verseEventListView?.classList.remove(
                    'visible'
                );


                explorerView?.classList.remove(
                    'visible'
                );


                verseEventListView?.setAttribute(
                    'aria-hidden',
                    'true'
                );


                explorerView?.setAttribute(
                    'aria-hidden',
                    'true'
                );


                document
                    .querySelectorAll(
                        '.portal-node'
                    )
                    .forEach(
                        node => {

                            node.classList.remove(
                                'active-portal',
                                'portal-dimmed'
                            );

                        }
                    );


                animateCategoryHeading(
                    'MULTIVERSE EVENTS'
                );

            }
        );

    }


    /* =========================================================
       ORBIT
       ========================================================= */

    function animateOrbit() {

        if (
            !isOrbitPaused &&
            isNetworkDeployed &&
            portalOrbitWrapper
        ) {

            orbitAngle =
                (
                    orbitAngle +
                    0.05
                ) % 360;


            portalOrbitWrapper.style.transform =
                `rotate(${orbitAngle}deg)`;


            document
                .querySelectorAll(
                    '.portal-upright-wrapper'
                )
                .forEach(
                    wrapper => {

                        wrapper.style.transform =
                            `rotate(${-orbitAngle}deg)`;

                    }
                );

        }


        requestAnimationFrame(
            animateOrbit
        );

    }


    requestAnimationFrame(
        animateOrbit
    );


    /* =========================================================
       TELEMETRY
       ========================================================= */

    if (liveCoords) {

        setInterval(
            () => {

                const x =
                    (
                        180 +
                        Math.random() * 10
                    ).toFixed(4);


                const y =
                    (
                        -490 -
                        Math.random() * 10
                    ).toFixed(4);


                liveCoords.textContent =
                    `X: ${x} | Y: ${y}`;

            },
            1200
        );

    }


    /* =========================================================
       RESIZE
       ========================================================= */

    window.addEventListener(
        'resize',
        () => {

            renderPortalNetwork();

        }
    );


    /* =========================================================
       INITIAL LOAD
       ========================================================= */

    setTimeout(
        () => {

            renderPortalNetwork();

        },
        150
    );

});