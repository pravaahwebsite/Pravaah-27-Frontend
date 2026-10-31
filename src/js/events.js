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
            name: 'Group Dance',
            icon: '💃',
            image: 'assets/Events_images/Group Dance.jpeg',
            desc: 'Showcase coordination, creativity, and collective stage expression in the premier collegiate group dance championship.',
            date: 'Feb 8, 2026',
            day: '3',
            venue: 'Auditorium, IIT Bhubaneswar',
            prize: 'Mementos & Certificates',
            team: '4 - 30 Members',
            rulebookPage: 31,
            rules: [
                'Team Size: 4 to 30 participants per team. All dance forms permitted.',
                'Performance time limit: 5 to 12 minutes including entry and stage exit.',
                'Audio track or medley must be submitted to coordinators by 11:59 PM prior day.',
                'Judged on Coordination (25%), Choreography (20%), Energy (20%), Expression (15%), and Creativity (10%).'
            ]
        },

        {
            id: 'cult-2',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'Fashion Show',
            icon: '✨',
            image: 'assets/Events_images/Fashion Show.jpeg',
            desc: 'Step onto the runway and express your creativity, embracing grace, theme-driven elegance, and haute couture.',
            date: 'Feb 7, 2026',
            day: '2',
            venue: 'Auditorium, IIT Bhubaneswar',
            prize: '₹10,000',
            team: '6 - 20 Models + 3 Crew',
            rulebookPage: 43,
            rules: [
                'Open Theme: Celebrate elegance, creativity, cultural sensitivity, and stage presence.',
                'Time limit: Maximum 15 minutes including stage setup and live narration.',
                'Judged on Ramp Walk & Choreography (35%), Costumes (35%), Theme Relevance (15%), and Stage Impact (15%).',
                'Green rooms provided for makeup, changing, and backstage preparation.'
            ]
        },

        {
            id: 'cult-3',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'Street Battle',
            icon: '🔥',
            image: 'assets/Events_images/Street Battle.jpeg',
            desc: 'Head-to-head knockout dance battles where dancers showcase high-energy freestyle skills, popping, and breaking.',
            date: 'Feb 7, 2026',
            day: '2',
            venue: 'SAC Open Arena',
            prize: '₹6,000',
            team: 'Solo (Individual)',
            rulebookPage: 35,
            rules: [
                'Solo street-style dance face-offs with knockout elimination format.',
                'All street dance styles permitted (hip-hop, popping, locking, breaking, krump).',
                'Three rounds of battle face-offs with spontaneous live music drops.',
                'Judged on Choreography (35%), Energy (30%), Expressions (25%), and Technicality (10%).'
            ]
        },

        {
            id: 'cult-4',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'Abhinay',
            icon: '🎭',
            image: 'assets/Events_images/Abhinay.jpeg',
            desc: 'Flagship stage play competition bringing original scripts, dramatic intensity, and gripping theatrical acting to life.',
            date: 'Feb 6, 09:00 AM',
            day: '1',
            venue: 'Community Centre',
            prize: '₹10,000',
            team: 'Up to 30 Members',
            rulebookPage: 39,
            rules: [
                'Stage Play duration: 45 to 60 minutes from empty stage to empty stage.',
                'Performance permitted in Hindi, English, or bilingual presentation.',
                'Original scripts and adaptations welcome; team manages own audio/sound.',
                'Judged on Script & Direction (35%), Acting (35%), Lights & Music (15%), and Creativity (10%).'
            ]
        },

        {
            id: 'cult-5',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'Tamasha',
            icon: '📢',
            image: 'assets/Events_images/Tamasha.jpeg',
            desc: 'Thunderous Nukkad Natak (street play) in a 30x30ft arena delivering sharp social messages with booming choruses.',
            date: 'Feb 6, 2026',
            day: '1',
            venue: 'BB Court',
            prize: '₹10,000',
            team: 'Up to 25 Members',
            rulebookPage: 41,
            rules: [
                'Performed inside a taped 30ft x 30ft boundary circle.',
                'Acoustic live instruments and powerful vocal projection only.',
                'Time limit: Up to 30 minutes with strict stage boundary rules.',
                'Judged on Acting, Energy & Voice (40%), Script (20%), Direction (20%), and Impact (20%).'
            ]
        },

        {
            id: 'cult-6',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'Spotlight',
            icon: '🎬',
            image: 'assets/Events_images/Spotlight.jpeg',
            desc: 'Commanding monoact theatrical competition celebrating solo dramatic range, character conviction, and stage delivery.',
            date: 'Feb 7, 2026',
            day: '2',
            venue: 'Community Centre, IIT Bhubaneswar',
            prize: '₹6,500',
            team: 'Solo (Individual)',
            rulebookPage: 37,
            rules: [
                'Solo acting performance in Hindi, English, or bilingual dialogue.',
                'Performance time limit: Maximum 10 minutes.',
                'Props permitted with prior declaration; team brings own laptop for sound cue.',
                'Judged on Script & Direction (35%), Acting (35%), Creativity & Stage Setting (15%), and Lights & Music (10%).'
            ]
        },

        {
            id: 'cult-7',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'Face Painting',
            icon: '🎨',
            image: 'assets/Events_images/Face Painting.jpeg',
            desc: 'Transform human canvas with colors, brush strokes, and visionary imagination in this nocturnal creative contest.',
            date: 'Feb 6, Night',
            day: '1',
            venue: 'Campus Arena',
            prize: '₹3,000',
            team: 'Individual / Duo',
            rulebookPage: 45,
            rules: [
                'Paints and materials provided by Pravaah organizing team.',
                'Conducted during the night with theme revealed at the start of the event.',
                'Only one official high-resolution photograph submission allowed per individual.',
                'Judged on Creativity (30%), Theme Relevance (30%), Execution & Technique (30%), and Color Palette (10%).'
            ]
        },

        {
            id: 'cult-8',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'View Finder',
            icon: '📷',
            image: 'assets/Events_images/View Finder.jpeg',
            desc: 'Creative photography competition spanning Infra Pulse architecture, Motion and Emotion storytelling, and Altered Reality.',
            date: 'Feb 5 - 8, 2026',
            day: '1-3',
            venue: 'Campus Wide',
            prize: '₹3,000 Per Theme',
            team: 'Solo (Open to All)',
            rulebookPage: 46,
            rules: [
                'Three themes: Infra Pulse (Architecture), Motion & Emotion, and Altered Reality (Photoshop Blend).',
                'DSLRs, mirrorless cameras, and smartphones permitted.',
                'Submission requires edited/non-edited JPEG with EXIF data along with RAW image.',
                'Judged on Creativity, Composition & Framing, Theme Reflection, and Technical Execution.'
            ]
        },

        {
            id: 'cult-9',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'Flow Frames',
            icon: '📸',
            image: 'assets/Events_images/Flow Frames.jpeg',
            desc: 'Capture the spirit, pulsating energy, and fleeting aesthetic memories of Pravaah through your lens.',
            date: 'Feb 5 - 8, 2026',
            day: '1-3',
            venue: 'IIT Bhubaneswar Campus',
            prize: '₹4,000',
            team: 'Individual',
            rulebookPage: 48,
            rules: [
                'Photographs must be shot on campus during Pravaah 2026 (Feb 5-8).',
                'Maximum 3 entries per participant, each accompanied by an English or Hindi caption.',
                'Submit JPG/JPEG along with original unedited RAW files in a single zip package.',
                'Judged on Creativity, Originality, and Adherence to Festival Spirit.'
            ]
        },

        {
            id: 'cult-10',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: '51hr Film Making',
            icon: '🎥',
            image: 'assets/Events_images/51hr Film Making.jpeg',
            desc: 'Conceive, shoot, edit, and score an original cinematic short film within a thrilling 51-hour creative countdown.',
            date: 'Feb 6, 2026',
            day: '1',
            venue: 'IIT Bhubaneswar Campus',
            prize: 'Awards & Festival Screening',
            team: '4 - 17 Members',
            rulebookPage: 50,
            rules: [
                'Short film runtime: 3 to 8 minutes including title and end credits.',
                'Theme revealed at event kickoff; 51-hour submission deadline begins immediately.',
                'Filmed exclusively within designated areas of IIT Bhubaneswar campus.',
                'Judged on Cinematography & Direction (30%), Story & Screenplay (25%), Editing (25%), and Impact (15%).'
            ]
        },

        {
            id: 'cult-11',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'Kavodyay',
            icon: '🖋️',
            image: 'assets/Events_images/Kavodyay.jpeg',
            desc: 'Hindi Slam Poetry competition where poets evoke deep emotion, lyrical rhythm, and evocative spoken-word storytelling.',
            date: 'Feb 6 - 7, 2026',
            day: '1-2',
            venue: 'Online / Live Stream',
            prize: '₹6,000',
            team: 'Solo (Individual)',
            rulebookPage: 67,
            rules: [
                'Original self-composed poetry in Hindi only; plagiarism results in disqualification.',
                'Each poet allotted a maximum of 5 minutes for reciting their piece.',
                'Acoustic spoken-word delivery without background tracks or digital distortion.',
                'Judged on Vocabulary & Language (30%), Performance & Diction (30%), Creativity (20%), and Impact (20%).'
            ]
        },

        {
            id: 'cult-12',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'General Quiz',
            icon: '🧠',
            image: 'assets/Events_images/General Quiz.jpeg',
            desc: 'Battle of sharpest collegiate minds navigating general trivia, science, history, cinema, pop culture, and business.',
            date: 'Feb 7, 2026',
            day: '2',
            venue: 'Lecture Hall Complex',
            prize: '₹10,000',
            team: 'Up to 3 Members',
            rulebookPage: 24,
            rules: [
                'Two-round competition: 20-question written Preliminary Round + Grand Stage Finals.',
                'Top 8 qualifying teams advance to the live Quiz Master finals.',
                'Questions centered around science, business, technology, arts, and world trivia.',
                'Electronic devices and external assistance strictly prohibited.'
            ]
        },

        {
            id: 'cult-13',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'Solo Dance',
            icon: '🕺',
            image: 'assets/Events_images/Solo Dance.jpeg',
            desc: 'Command the central stage alone and mesmerize the crowd with technique, rhythm, expressive grace, and storytelling.',
            date: 'Feb 8, 09:30 AM',
            day: '3',
            venue: 'Auditorium, IIT Bhubaneswar',
            prize: 'Mementos, T-shirts & Certificates',
            team: 'Solo (Individual)',
            rulebookPage: 33,
            rules: [
                'Open to all dance styles (contemporary, classical, western, hip-hop, folk).',
                'Performance time limit: 1 minute 30 seconds to 4 minutes including entry and exit.',
                'Audio track or medley must be submitted to coordinators by 11:59 PM prior day.',
                'Judged on Choreography (30%), Energy (25%), Expressions (20%), Creativity (15%), and Technicality (10%).'
            ]
        },

        {
            id: 'cult-14',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'meme mania',
            icon: '🤣',
            image: 'assets/Events_images/meme mania.jpeg',
            desc: 'Invoke the memer inside you and be the reason for laughter in this ultimate creative meme-making showdown.',
            date: 'Feb 5 - 8, 2026',
            day: '1-3',
            venue: 'Online / Instagram @iitbbs.pravaah',
            prize: '₹5,000 + Instagram Feature',
            team: 'Solo / Creator',
            rulebookPage: 65,
            rules: [
                'Submit original memes based on the given fest theme via the official Google Form.',
                'No limit on the number of creative meme submissions per participant.',
                'Top 3 memes featured on the official Instagram page @iitbbs.pravaah.',
                'Judged on Creativity (40%), Theme Correctness (30%), and Audience Engagement (30%).'
            ]
        },

        {
            id: 'cult-15',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'Sci and tech quiz',
            icon: '🔬',
            image: 'assets/Events_images/Sci and tech Quiz.jpeg',
            desc: 'High-stakes battle of scientific minds testing knowledge across astronomy, modern physics, technology, and discoveries.',
            date: 'Feb 7, 2026',
            day: '2',
            venue: 'Lecture Hall Complex',
            prize: 'Cash Prizes & Certificates',
            team: 'Up to 2 Members or Lone Wolves',
            rulebookPage: 26,
            rules: [
                'Two-round contest: 20-question Preliminary Round followed by Grand Finals.',
                'Teams of up to two members or individual lone wolf participants permitted.',
                'Top 8 qualifying teams advance to the live audio-visual finals.',
                'Questions centered around science, aerospace, engineering, and tech innovations.'
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
            'Master high-synchronization group choreography under performance constraints.',
            'Develop spatial awareness, stage formation transitions, and energy distribution.',
            'Collaborate closely across large team dynamics under competition pressure.'
        ],

        'cult-2': [
            'Conceive a unified fashion aesthetic reflecting narrative theme and grace.',
            'Master runway pacing, choreography, and confident couture presentation.',
            'Coordinate costumes, hair, lighting, and narration seamlessly backstage.'
        ],

        'cult-3': [
            'Sharpen spontaneous freestyle improvisation and musicality on live beat drops.',
            'Develop aggressive yet respectful battle stage presence in face-off formats.',
            'Execute advanced power moves, isolation, and street dance techniques.'
        ],

        'cult-4': [
            'Execute dramatic script direction, character embodiment, and stage blocking.',
            'Master voice modulation, projection, and emotional tempo in a large hall.',
            'Operate coordinated theatrical lighting, live sound, and set transitions.'
        ],

        'cult-5': [
            'Harness the raw, acoustic power of street theatre in a 360-degree audience circle.',
            'Deliver sharp social commentary with synchronized choral voice and physical formations.',
            'Captivate spontaneous crowds with high energy, rhythm, and crisp dialogue delivery.'
        ],

        'cult-6': [
            'Command the stage single-handedly with sustained emotional gravity and nuance.',
            'Master solo dramatic timing, character transformation, and physical storytelling.',
            'Deliver nuanced monologues under focused theatrical spotlight conditions.'
        ],

        'cult-7': [
            'Translate creative concepts into living face-art compositions.',
            'Work with skin-safe pigments, brush blending, highlighting, and contouring.',
            'Deliver aesthetic storytelling through expressive human facial canvases.'
        ],

        'cult-8': [
            'Master architectural geometry, perspective, and lighting composition.',
            'Capture decisive emotion and motion through precision shutter timing.',
            'Perform advanced digital blending and post-production techniques in Photoshop.'
        ],

        'cult-9': [
            'Develop an instinct for photojournalism and authentic candid event coverage.',
            'Work under rapidly changing concert lighting, pyrotechnics, and crowds.',
            'Curate a cohesive portfolio capturing the soul and spirit of the festival.'
        ],

        'cult-10': [
            'Conceive, storyboard, shoot, and cut a complete narrative under a 51-hour timer.',
            'Manage fast guerrilla filmmaking production with real location constraints.',
            'Perform high-pressure audio mixing, color grading, and subtitle delivery.'
        ],

        'cult-11': [
            'Refine poetic metre, rhyme schemes, and linguistic depth in Hindi poetry.',
            'Develop evocative spoken-word cadence, pauses, and emotional delivery.',
            'Connect deeply with audiences through relatable, heartfelt verse.'
        ],

        'cult-12': [
            'Synthesize broad general knowledge across disparate fields under time limits.',
            'Develop strategic team deduction, risk analysis, and round-play tactics.',
            'Handle rapid buzzer rounds and multi-layer lateral-thinking questions.'
        ],

        'cult-13': [
            'Showcase individual technical virtuosity, flexibility, and physical stamina.',
            'Convey powerful narrative arc and emotional depth through solo body movement.',
            'Command the audience and judges with confident, charismatic stage presence.'
        ],

        'cult-14': [
            'Master visual comedy, pop-culture satire, and viral storytelling.',
            'Develop relatable, punchy digital content with creative timing.',
            'Analyze audience resonance, social trends, and engagement metrics.'
        ],

        'cult-15': [
            'Deepen cross-disciplinary knowledge in frontier science and technology.',
            'Develop rapid deduction, logical inference, and round strategy.',
            'Sharpen quick recall and precision under intense buzzer rounds.'
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
        if (!verseEventList) {
            return;
        }

        const visibleTop = window.innerHeight * 0.06;
        const visibleBottom = window.innerHeight * 0.92;

        const hiddenCards = [
            ...verseEventList.querySelectorAll(
                '.reference-event-card:not(.is-visible):not(.is-revealing)'
            )
        ].filter(card => {
            const rect = card.getBoundingClientRect();

            return (
                rect.top < visibleBottom &&
                rect.bottom > visibleTop
            );
        });

        hiddenCards.forEach((card, index) => {
            card.classList.add('is-revealing');

            setTimeout(() => {
                card.classList.remove('is-revealing');

                // Restart the same CSS animation reliably.
                void card.offsetWidth;

                card.classList.add('is-visible');
            }, index * 120);
        });
    }

    if (verseEventListView) {

        // Reveal cards as the PAGE scrolls.
        window.addEventListener(
            'scroll',
            revealVisibleEventCards,
            { passive: true }
        );

        window.addEventListener(
            'resize',
            revealVisibleEventCards
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

    function renderVerseEventList(verse) {

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
                                    src="${event.image ? encodeURI(event.image) : 'assets/images/page5_gallery.jpg'}"
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

                                    <a
                                        class="reference-explore-btn"
                                        href="${event.rulebookPage ? rulebookHref(event) : '#'}"
                                        ${event.rulebookPage ? 'target="_blank" rel="noopener noreferrer"' : ''}
                                        data-event-id="${event.id}"
                                    >
                                        EXPLORE
                                    </a>


                                    <a
                                        class="reference-register-btn"
                                        href="${registrationHref(event)}"
                                    >
                                        REGISTER
                                    </a>

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

                                if (selectedEvent.rulebookPage) {
                                    event.preventDefault();
                                    const pdfUrl = rulebookHref(selectedEvent);
                                    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
                                    return;
                                }

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

    function rulebookHref(
        event
    ) {
        if (event && event.rulebookPage) {
            return `assets/PRAVAAH'26%20Rulebook.pdf#page=${event.rulebookPage}`;
        }
        return `assets/PRAVAAH'26%20Rulebook.pdf`;
    }


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
            event.image ? encodeURI(event.image) : 'assets/images/page5_gallery.jpg';


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

        const explorerRulebook = document.getElementById('explorer-rulebook');
        if (explorerRulebook) {
            if (event.rulebookPage) {
                explorerRulebook.style.display = 'flex';
                explorerRulebook.href = rulebookHref(event);
                explorerRulebook.textContent = `RULEBOOK (PAGE ${event.rulebookPage}) ↗`;
            } else {
                explorerRulebook.style.display = 'none';
            }
        }


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
        activeEvent = null;

        eventsPortalHero?.classList.remove(
            'event-explore-open'
        );

        explorerView?.classList.remove('visible');

        explorerView?.setAttribute(
            'aria-hidden',
            'true'
        );

        verseEventListView?.classList.add('visible');

        verseEventListView?.setAttribute(
            'aria-hidden',
            'false'
        );

        // Reset the previous card animation states.
        verseEventList?.querySelectorAll(
            '.reference-event-card'
        ).forEach(card => {
            card.classList.remove(
                'is-visible',
                'is-revealing'
            );
        });

        // Let the list become visible before restarting
        // the entrance animation.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                revealVisibleEventCards();
            });
        });
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