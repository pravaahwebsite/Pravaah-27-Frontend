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
            name: 'Trekkon',
            icon: '⚡',
            image: 'assets/Events_images/lastyear/Trekkon_events.JPG',
            desc: 'Autonomous line-following robot challenge where precision bots race along complex tracks at maximum velocity.',
            date: 'Feb 6, 2026',
            day: '1',
            venue: 'Robotics Arena, IIT Bhubaneswar',
            prize: '₹20,000',
            team: '1 - 4 Members',
            rulebookPage: 4,
            rules: [
                'The robot must be completely autonomous and adhere to the black line throughout the track.',
                'Bot dimensions must fit within a 20cm x 20cm x 20cm cube; max weight 5kg.',
                'Maximum voltage anywhere in the robot must not exceed 12V DC.',
                'No ready-made kits or robots permitted; up to 3 restarts allowed per round.'
            ]
        },

        {
            id: 'tech-2',
            verse: 'tech',
            verseName: 'TECH EVENT',
            name: 'Robo Soccer',
            icon: '🤖',
            image: 'assets/Events_images/Robo Soccer.jpeg',
            desc: 'High-intensity robotic football tournament where teams maneuver custom bots to outscore opponents in qualifiers and knockouts.',
            date: 'Feb 6, 10:00 AM',
            day: '1',
            venue: 'Robotics Bay, IIT Bhubaneswar',
            prize: '₹20,000',
            team: 'Up to 5 Members',
            rulebookPage: 6,
            rules: [
                'Three rounds: Qualifiers (spot shooting), Knockouts, and Grand Finals (two 3-minute halves).',
                'Robot size limit: 30cm x 30cm x 15cm; max weight 15kg (bonus points for bots under 5kg).',
                'Wired or wireless control with maximum 12V supply; no ball-grabbing or trapping mechanisms.',
                'Tennis ball used in a 120cm x 200cm arena; intentional ramming or fouls lead to warnings/penalties.'
            ]
        },

        {
            id: 'tech-3',
            verse: 'tech',
            verseName: 'TECH EVENT',
            name: 'Data Science Hackathon',
            icon: '📊',
            image: 'assets/Events_images/lastyear/data sceince event.jpg',
            desc: 'A grueling 24-hour offline hackathon challenging developers to engineer predictive models, pipelines, and machine learning solutions.',
            date: 'Feb 6, 9:00 AM',
            day: '1-2',
            venue: 'UHL, IIT Bhubaneswar',
            prize: '₹25,000',
            team: '1 - 4 Members',
            rulebookPage: 9,
            rules: [
                '24-hour completely offline hackathon; common problem statement announced at kickoff.',
                'All code must be developed from scratch on campus and submitted to GitHub before the deadline.',
                'Submissions must include complete source code, dataset citations, and comprehensive PDF/Markdown reports.',
                'Evaluated on Technical Accuracy (50%), Innovation (20%), Functionality (15%), and Documentation (15%).'
            ]
        },

        {
            id: 'tech-4',
            verse: 'tech',
            verseName: 'TECH EVENT',
            name: 'Web Hackathon',
            icon: '💻',
            image: 'assets/Events_images/lastyear/WEB HACKTHON.jpg',
            desc: 'Sprint through a 24-hour offline build to architect functional, highly responsive, and innovative web applications.',
            date: 'Feb 7, 10:00 AM',
            day: '2-3',
            venue: 'UHL, IIT Bhubaneswar',
            prize: '₹20,000',
            team: '1 - 4 Members',
            rulebookPage: 12,
            rules: [
                'Completely offline 24-hour hackathon; theme and challenge revealed at event kickoff.',
                'All development must take place during the hackathon; pre-existing projects strictly disallowed.',
                'Submissions must include a working hosted/local demo, documented GitHub repo, and pitch slides (max 5).',
                'Judged on Functionality (30%), Implementation (25%), Innovation (20%), UI/UX (15%), and Theme (10%).'
            ]
        },

        {
            id: 'tech-5',
            verse: 'tech',
            verseName: 'TECH EVENT',
            name: 'Blast off',
            icon: '🚀',
            image: 'assets/images/gallery/Blast_off.jpg',
            desc: 'Water bottle rocketry showdown where teams design pressurized aerodynamic vessels for maximum distance and trajectory.',
            date: 'Feb 7, 10:00 AM',
            day: '2',
            venue: 'Hockey Ground, IIT Bhubaneswar',
            prize: '₹10,000',
            team: 'Up to 4 Members',
            rulebookPage: 15,
            rules: [
                'Rockets must be constructed from plastic water bottles (minimum 2 liters, neck diameter >= 1.5 in).',
                'Only water and air pressure can be used for propulsion; pressure must hold greater than 60 psi.',
                'Multiple staged rockets are not permitted; launching equipment provided or teams may bring their own.',
                'Two attempts allowed per team; the farthest horizontal/range distance counts as the final score.'
            ]
        },

        {
            id: 'tech-6',
            verse: 'tech',
            verseName: 'TECH EVENT',
            name: 'Robo Race',
            icon: '🏎️',
            image: 'assets/Events_images/Robo race.jpeg',
            desc: 'Tear through custom treacherous courses packed with active and passive obstacles in a high-speed knockout race.',
            date: 'Feb 7 - 8, 2026',
            day: '2-3',
            venue: 'Open Arena Track, IIT Bhubaneswar',
            prize: 'Cash Prizes & Trophies',
            team: 'Up to 4 Members',
            rulebookPage: 68,
            rules: [
                'Construct a manually controlled wireless robot capable of completing the obstacle race track.',
                'Bot dimensions must not exceed 25cm x 25cm x 20cm; maximum weight 5kg.',
                'Pre-fabricated LEGO or ready-made chassis kits are strictly prohibited.',
                'Bots must clear all sequential checkpoints; shortest track completion time wins.'
            ]
        },

        {
            id: 'tech-7',
            verse: 'tech',
            verseName: 'TECH EVENT',
            name: 'Free Fire Fury',
            icon: '🔥',
            image: 'assets/Events_images/lastyear/free fire.jpg',
            desc: 'Four-member squad battle royale tournament battling across Bermuda and Purgatory through qualifiers, playoffs, and Clash Squad finals.',
            date: 'Jan 26, 2026',
            day: 'Pre-Fest',
            venue: 'Online Gaming Arena',
            prize: '₹6,500',
            team: 'Squad (4 Members)',
            rulebookPage: 53,
            rules: [
                'Squad Mode tournament played in 3 rounds: Battle Royale Qualifiers, Semis, and Clash Squad Finals.',
                'Maps: Bermuda & Purgatory for Battle Royale format; Bermuda exclusively for Clash Squad.',
                'Scoring based on placement and kill points (1 pt per kill); emulators strictly banned.',
                'Minimum account level 40 required; fair play and anti-cheat policies strictly enforced.'
            ]
        },

        {
            id: 'tech-8',
            verse: 'tech',
            verseName: 'TECH EVENT',
            name: 'BGMI',
            icon: '🎯',
            image: 'assets/Events_images/BGMI.jpeg',
            desc: 'Epic Battlegrounds Mobile India showdown featuring 3 classic matches across Erangel, Sanhok, and Miramar for the chicken dinner.',
            date: 'Jan 25, 2026',
            day: 'Pre-Fest',
            venue: 'Online Gaming Arena',
            prize: '₹6,500',
            team: '2 - 4 Players (Squad)',
            rulebookPage: 57,
            rules: [
                'Online Squad Mode tournament consisting of 3 classic Battle Royale matches on Erangel, Sanhok, and Miramar.',
                'Scoring: 2 points per kill plus official placement points (15 pts for 1st place).',
                'Advanced room cards used; players must check-in 20 minutes before each match.',
                'Emulators, hacks, teaming up, or exploits lead to immediate team disqualification.'
            ]
        },

        {
            id: 'tech-9',
            verse: 'tech',
            verseName: 'TECH EVENT',
            name: 'Valorant',
            icon: '🎮',
            image: 'assets/Events_images/Valorant.jpeg',
            desc: 'Tactical 5v5 FPS tournament pitting sharpshooting collegiate teams in strategic map vetoes, plant/defuse rounds, and overtime duels.',
            date: 'Online Tournament',
            day: 'Pre-Fest',
            venue: 'Custom Tournament Servers',
            prize: 'Cash Prizes & Mementos',
            team: '5 Players per Team',
            rulebookPage: 60,
            rules: [
                'Standard 5v5 tournament format: Knockout rounds, Qualifiers, and Best-of-3 Grand Finals.',
                'Map pool: Ascent, Split, Fracture, Bind, Breeze, Icebox, Haven, Pearl with veto process.',
                'First to 13 rounds wins; 2-round overtime rule applies in case of 12-12 draws.',
                'No custom config files, exploits, or third-party assists permitted; squad must check-in 15 min prior.'
            ]
        },

        {
            id: 'tech-10',
            verse: 'tech',
            verseName: 'TECH EVENT',
            name: 'Clash Royal',
            icon: '👑',
            image: 'assets/Events_images/lastyear/clash royale.jpg',
            desc: 'Head-to-head tactical mobile card strategy tournament where players craft custom decks, counter elixir pushes, and take crowns.',
            date: 'Online Tournament',
            day: 'Pre-Fest',
            venue: 'Online Gaming Arena',
            prize: '₹6,500',
            team: 'Solo (Individual)',
            rulebookPage: 63,
            rules: [
                'Classic tournament battle format with Level 11 tournament standard card caps.',
                'Players may switch and build decks freely between matches; evolutions and champion cards permitted.',
                'Round duration 1 hour with a maximum of 5 losses allowed before elimination.',
                'Tournament tag and private password shared via official coordinator group prior to match.'
            ]
        },

        {
            id: 'tech-11',
            verse: 'tech',
            verseName: 'TECH EVENT',
            name: 'Sci and tech quiz',
            icon: '🔬',
            image: 'assets/Events_images/lastyear/general quiz.JPG',
            desc: 'High-stakes battle of scientific minds testing knowledge across astronomy, modern physics, engineering, and tech innovations.',
            date: 'Feb 7, 2026',
            day: '2',
            venue: 'Lecture Hall Complex, IIT Bhubaneswar',
            prize: '₹8,000',
            team: 'Up to 2 Members or Lone Wolves',
            rulebookPage: 26,
            rules: [
                'Two-round contest: 20-question Preliminary Round followed by live Grand Finals.',
                'Teams of up to two members or individual lone wolf participants permitted.',
                'Top 8 qualifying teams advance to the live audio-visual finals.',
                'Questions centered around frontier science, aerospace, engineering, and tech innovations.'
            ]
        },


        /* ---------------- CULT ---------------- */

        {
            id: 'cult-1',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'Group Dance',
            icon: '💃',
            image: 'assets/Events_images/lastyear/group Dance_events.JPG',
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
            image: 'assets/Events_images/lastyear/fashionshow_gallery.jpg',
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
            image: 'assets/Events_images/lastyear/StreetDanceBattle_events.jpg',
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
            id: 'cult-5',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'Tamasha',
            icon: '📢',
            image: 'assets/Events_images/lastyear/Tamasha_events.JPG',
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
            image: 'assets/Events_images/lastyear/fpainting (1).jpg',
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
            id: 'cult-12',
            verse: 'cult',
            verseName: 'CULT EVENT',
            name: 'General Quiz',
            icon: '🧠',
            image: 'assets/Events_images/lastyear/Marcatus.JPG',
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
            image: 'assets/Events_images/lastyear/solo dance (1).jpg',
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

        /* ---------------- ENTREPRENEUR ---------------- */

        {
            id: 'ent-1',
            verse: 'ent',
            verseName: 'ENT EVENT',
            name: 'Startup Expo',
            icon: '🚀',
            image: 'assets/Events_images/Startup Expo.jpeg',
            desc: 'Flagship exhibition stall showcase connecting early-stage startups with thousands of students, investors, and industry mentors.',
            date: 'Feb 6, 10:00 AM',
            day: '1',
            venue: 'Exhibition Arena, IIT Bhubaneswar',
            prize: 'Stall Grants & Investor Networking',
            team: '1 - 4 Founders',
            rulebookPage: 16,
            rules: [
                'Each registered venture is allotted a dedicated 10ft x 10ft stall to showcase products and services.',
                'Startups can sell merchandise, demonstrate live prototypes, and collect real customer feedback.',
                'Tables, display boards, and power supply provided upon advance coordination.',
                'Open to early-stage businesses, student ventures, and bootstrapped innovations.'
            ]
        },

        {
            id: 'ent-2',
            verse: 'ent',
            verseName: 'ENT EVENT',
            name: 'Innovation Expo',
            icon: '💡',
            image: 'assets/Events_images/Innovation Expo.jpeg',
            desc: 'Two-round prototype exposition where student innovators present working hardware/table-top models to esteemed faculty and juries.',
            date: 'Feb 7, 10:00 AM',
            day: '2',
            venue: 'IIT Bhubaneswar Campus',
            prize: '₹10,000',
            team: 'Up to 5 Members',
            rulebookPage: 18,
            rules: [
                'Round 1: Online screening round requiring submission of a graphical abstract PDF.',
                'Round 2: Offline live showcase with working table-top model, poster, or prototype plant.',
                'Ideas must demonstrate originality or tangible optimization over existing industry solutions.',
                'Evaluated by IIT Bhubaneswar professors and industry experts on feasibility and impact.'
            ]
        },

        {
            id: 'ent-3',
            verse: 'ent',
            verseName: 'ENT EVENT',
            name: 'B-Plan',
            icon: '📈',
            image: 'assets/Events_images/B-Plan.jpeg',
            desc: 'Pitch dynamic business models, unit economics, and go-to-market strategies to expert venture judges within 8 minutes.',
            date: 'Feb 7, 02:00 PM',
            day: '2',
            venue: 'LHL, IIT Bhubaneswar',
            prize: '₹10,000 + Goodies',
            team: 'Up to 3 Members',
            rulebookPage: 20,
            rules: [
                'Teams must not exceed 3 members; presentation time strictly capped under 8 minutes.',
                'The business model can represent an existing or hypothetical startup venture.',
                'Judged on market opportunity, revenue model, financial feasibility, and pitch clarity.',
                'Plagiarism or copied slide decks result in immediate team disqualification.'
            ]
        },

        {
            id: 'ent-4',
            verse: 'ent',
            verseName: 'ENT EVENT',
            name: 'Enigma',
            icon: '🧩',
            image: 'assets/Events_images/lastyear/Enigma_events.JPG',
            desc: 'High-pressure case competition challenging analytical duos to crack complex real-time business and industry scenarios.',
            date: 'Feb 7, 10:00 AM',
            day: '2',
            venue: 'Seminar Hall, IIT Bhubaneswar',
            prize: '₹10,000 + Goodies',
            team: 'Up to 2 Participants',
            rulebookPage: 22,
            rules: [
                'Two-round offline team competition with at most 2 participants per team.',
                'Round 1: Solve and present a real-time corporate business challenge (10:00 AM - 12:00 PM).',
                'Round 2: Advanced case study finals for qualifying teams (2:30 PM - 4:30 PM).',
                'Teams submit one consolidated case solution; external assistance or plagiarism is barred.'
            ]
        }
    ];


    /* =========================================================
       WHAT YOU LEARN
       ========================================================= */

    const learnById = {

        'tech-1': [
            'Design autonomous sensor-driven line tracking circuits and PID controllers.',
            'Optimize chassis weight, wheel grip, and high-speed directional agility.',
            'Troubleshoot hardware and sensor calibration under live competitive conditions.'
        ],

        'tech-2': [
            'Engineer responsive mechanical drive trains and high-torque kicker mechanisms.',
            'Execute fast tactical gameplay, zone defense, and ball redirection.',
            'Manage wireless frequencies, power draw, and real-time pit maintenance.'
        ],

        'tech-3': [
            'Build end-to-end machine learning pipelines from raw data under strict deadlines.',
            'Apply feature engineering, hyperparameter tuning, and ensemble modeling.',
            'Document methodology, metrics, and reproducible insights professionally.'
        ],

        'tech-4': [
            'Architect full-stack modern web solutions under tight competitive sprints.',
            'Implement responsive design, performant state management, and robust APIs.',
            'Present technical architecture, trade-offs, and product demos effectively.'
        ],

        'tech-5': [
            'Apply principles of aerodynamics, pressure dynamics, and center-of-gravity stabilization.',
            'Optimize fin geometry, nozzle mechanics, and water-to-air volume ratios.',
            'Iterate rapid fabrication techniques and testing in real-world launch fields.'
        ],

        'tech-6': [
            'Master high-speed manual remote maneuvering across rough terrains and tight corners.',
            'Build durable shock-absorbent suspension and high-rpm motor assemblies.',
            'Handle obstacle clearance strategy, recovery maneuvers, and lap time reduction.'
        ],

        'tech-7': [
            'Coordinate high-pressure squad communication, rotation timing, and resource economy.',
            'Master fast-twitch gunplay, cover deployment, and tactical zone positioning.',
            'Develop tournament meta strategies and opponent reading under elimination pressure.'
        ],

        'tech-8': [
            'Execute macro map rotations, vehicle control, and terrain scouting in competitive lobbies.',
            'Refine utility usage, smoke pathing, and crossfire synchronization.',
            'Analyze point margins and position play across multi-map tournament series.'
        ],

        'tech-9': [
            'Master tactical agent synergies, utility lineups, and site retake execution.',
            'Develop discipline in economy management, crosshair placement, and clutch plays.',
            'Communicate rapid callouts and coordinate multi-angle site pushes under pressure.'
        ],

        'tech-10': [
            'Calculate elixir trades, card cycle rotations, and counter-deck positioning.',
            'Manage split-second placement precision, lane pressure, and spell chip timing.',
            'Adapt deck archetypes (Beatdown, Control, Cycle, Siege) against diverse opponents.'
        ],

        'tech-11': [
            'Deepen cross-disciplinary knowledge in frontier science and technology.',
            'Develop rapid deduction, logical inference, and round strategy.',
            'Sharpen quick recall and precision under intense buzzer rounds.'
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

        'ent-1': [
            'Demonstrate customer acquisition, elevator pitches, and live product demos.',
            'Gather real-world feedback and validated user insights to refine product-market fit.',
            'Network directly with visiting angel investors, incubator leads, and venture mentors.'
        ],

        'ent-2': [
            'Transform theoretical academic research into functioning physical prototypes.',
            'Create clear graphical abstracts and executive technical presentations.',
            'Defend scientific methodology and commercial scalability in front of faculty panels.'
        ],

        'ent-3': [
            'Master market sizing (TAM/SAM/SOM), customer personas, and unit economics.',
            'Structure crisp high-impact slide decks suited for investor venture pitches.',
            'Handle rapid financial and operational stress-testing during judge Q&A.'
        ],

        'ent-4': [
            'Deconstruct ambiguous business problems into structured MECE framework trees.',
            'Perform rapid financial impact, risk assessment, and feasibility forecasting.',
            'Deliver structured executive proposals that convince senior management panels.'
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

        cachedUprightWrappers = [];
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
                        ((6 + i * 5) * 0.82).toFixed(2);

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


                let nodeTouchStartX = 0;
                let nodeTouchStartY = 0;
                let nodeTouchMoved = false;

                portal.addEventListener(
                    'touchstart',
                    event => {
                        isOrbitPaused = true;
                        nodeTouchMoved = false;
                        if (event.touches && event.touches[0]) {
                            nodeTouchStartX = event.touches[0].clientX;
                            nodeTouchStartY = event.touches[0].clientY;
                        }
                    },
                    { passive: true }
                );

                portal.addEventListener(
                    'touchmove',
                    event => {
                        if (event.touches && event.touches[0]) {
                            const dx = event.touches[0].clientX - nodeTouchStartX;
                            const dy = event.touches[0].clientY - nodeTouchStartY;
                            if (Math.hypot(dx, dy) > 8) {
                                nodeTouchMoved = true;
                            }
                        }
                    },
                    { passive: true }
                );

                portal.addEventListener(
                    'touchend',
                    event => {
                        if (!nodeTouchMoved && !isTouchDraggingMove) {
                            event.preventDefault();
                            event.stopPropagation();
                            activatePortalBranch(verse.key);
                        } else if (!isTouchDragging) {
                            isOrbitPaused = false;
                        }
                    }
                );

                portal.addEventListener(
                    'mouseenter',
                    () => {
                        isOrbitPaused = true;
                    }
                );


                portal.addEventListener(
                    'mouseleave',
                    () => {
                        if (!isTouchDragging) {
                            isOrbitPaused = false;
                        }
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

        cachedUprightWrappers = Array.from(
            portalOrbitWrapper.querySelectorAll('.portal-upright-wrapper')
        );
        updateOrbitTransform(orbitAngle);

    }


    /* =========================================================
       CARD SCROLL REVEAL (INSTANT & 60FPS)
       ========================================================= */

    function initCardObserver() {
        if (!verseEventList) {
            return;
        }

        const cards = verseEventList.querySelectorAll('.reference-event-card');
        if (!cards.length) {
            return;
        }

        cards.forEach(card => {
            card.classList.add('is-visible');
            card.classList.remove('is-revealing');
        });
    }


    /* =========================================================
       OPEN VERSE
       ========================================================= */

    let lastActivateTime = 0;

    function activatePortalBranch(
        verseKey
    ) {

        if (!isNetworkDeployed) {
            return;
        }

        const now = Date.now();
        if (now - lastActivateTime < 320) {
            return;
        }
        lastActivateTime = now;

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

        window.scrollTo({ top: 0, behavior: 'instant' });

        /*
         * Fast hardware-accelerated scroll reveal via IntersectionObserver.
         * Runs off the main thread with zero layout reflows during scroll.
         */
        requestAnimationFrame(() => {
            initCardObserver();
        });

        try {
            history.pushState({ view: 'verse', verse: verseKey }, '');
        } catch (e) {}

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
                        class="reference-event-card is-visible"
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
                                    onerror="this.onerror=null;this.src='assets/images/page5_gallery.jpg';"
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

    let savedCardsScrollY = 0;

    function openExplorer(
        event
    ) {

        if (!explorerView) {
            return;
        }

        savedCardsScrollY = window.scrollY || window.pageYOffset || 0;

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

        window.scrollTo({ top: 0, behavior: 'instant' });

        try {
            history.pushState({ view: 'explorer', eventId: event.id, verse: event.verse }, '');
        } catch (e) {}

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

        // Keep all loaded cards visible without collapsing or re-triggering entrance animations
        verseEventList?.querySelectorAll(
            '.reference-event-card'
        ).forEach(card => {
            card.classList.add('is-visible');
            card.classList.remove('is-revealing');
        });

        // Seamlessly restore scroll position without jumping
        if (savedCardsScrollY > 0) {
            window.scrollTo({ top: savedCardsScrollY, behavior: 'instant' });
        }
    }

    /* =========================================================
       DEPLOY NETWORK
       ========================================================= */

    let lastDeployToggleTime = 0;

    function deployNetwork() {

        if (!portalNetworkContainer) {
            return;
        }

        const now = Date.now();
        if (now - lastDeployToggleTime < 320) {
            return;
        }
        lastDeployToggleTime = now;

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

            eventsPortalHero?.classList.remove(
                'network-undeployed'
            );

            eventsPortalHero?.classList.add(
                'network-deployed'
            );

            isOrbitPaused = false;
            lastFrameTime = performance.now();

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

            eventsPortalHero?.classList.remove(
                'network-deployed'
            );

            eventsPortalHero?.classList.add(
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

        let coreTouchMoved = false;
        let coreStartX = 0;
        let coreStartY = 0;

        pravaahCore.addEventListener(
            'touchstart',
            event => {
                coreTouchMoved = false;
                if (event.touches && event.touches[0]) {
                    coreStartX = event.touches[0].clientX;
                    coreStartY = event.touches[0].clientY;
                }
            },
            { passive: true }
        );

        pravaahCore.addEventListener(
            'touchmove',
            event => {
                if (event.touches && event.touches[0]) {
                    if (Math.hypot(event.touches[0].clientX - coreStartX, event.touches[0].clientY - coreStartY) > 10) {
                        coreTouchMoved = true;
                    }
                }
            },
            { passive: true }
        );

        pravaahCore.addEventListener(
            'touchend',
            event => {
                if (!coreTouchMoved) {
                    event.preventDefault();
                    event.stopPropagation();
                    deployNetwork();
                }
            }
        );

        pravaahCore.addEventListener(
            'click',
            event => {

                event.stopPropagation();

                deployNetwork();

            }
        );

    }


    if (corePrompt) {

        let promptTouchMoved = false;
        let promptStartX = 0;
        let promptStartY = 0;

        corePrompt.addEventListener(
            'touchstart',
            event => {
                promptTouchMoved = false;
                if (event.touches && event.touches[0]) {
                    promptStartX = event.touches[0].clientX;
                    promptStartY = event.touches[0].clientY;
                }
            },
            { passive: true }
        );

        corePrompt.addEventListener(
            'touchmove',
            event => {
                if (event.touches && event.touches[0]) {
                    if (Math.hypot(event.touches[0].clientX - promptStartX, event.touches[0].clientY - promptStartY) > 10) {
                        promptTouchMoved = true;
                    }
                }
            },
            { passive: true }
        );

        corePrompt.addEventListener(
            'touchend',
            event => {
                if (!promptTouchMoved) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (!isNetworkDeployed) {
                        deployNetwork();
                    }
                }
            }
        );

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

                // Reset scroll position to top instantly before closing panel
                // This completely prevents viewport height clamping glitch on mobile
                window.scrollTo({ top: 0, behavior: 'instant' });

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

                isOrbitPaused =
                    false;
                lastFrameTime = performance.now();

            }
        );

    }

    /* Popstate history listener for seamless back button navigation on phone */
    window.addEventListener('popstate', event => {
        const state = event.state;
        if (!state) {
            if (activeEvent) {
                closeExplorerToCards();
            }
            if (activeVerse) {
                activeVerse = null;
                activeEvent = null;
                window.scrollTo({ top: 0, behavior: 'instant' });
                eventsPortalHero?.classList.remove('event-list-open', 'event-explore-open');
                verseEventListView?.classList.remove('visible');
                explorerView?.classList.remove('visible');
                verseEventListView?.setAttribute('aria-hidden', 'true');
                explorerView?.setAttribute('aria-hidden', 'true');
                document.querySelectorAll('.portal-node').forEach(node => {
                    node.classList.remove('active-portal', 'portal-dimmed');
                });
                animateCategoryHeading('MULTIVERSE EVENTS');
                isOrbitPaused = false;
                lastFrameTime = performance.now();
            }
        } else if (state.view === 'verse') {
            if (activeEvent) {
                closeExplorerToCards();
            }
        }
    });


    /* =========================================================
       ORBIT & TOUCH GESTURES
       ========================================================= */

    const TOUCH_ROTATION_SENSITIVITY = 1.35; // Responsive touch gesture rotation sensitivity
    let orbitMomentum = 0;
    let isTouchDragging = false;
    let isTouchDraggingMove = false;
    let touchStartAngle = 0;
    let touchStartOrbitAngle = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let lastMoveAngle = 0;
    let lastMoveTime = 0;
    let touchAngularVelocity = 0;
    let lastFrameTime = performance.now();
    let cachedUprightWrappers = [];

    const BASE_ORBIT_SPEED = 0.06; // Desktop rotation speed restored exactly as earlier
    const MOBILE_ORBIT_SPEED = 0.082; // Slightly increased rotation speed for mobile phones

    function updateOrbitTransform(angle) {
        if (!portalOrbitWrapper) {
            return;
        }

        portalOrbitWrapper.style.transform =
            `rotate(${angle}deg)`;

        if (!cachedUprightWrappers || cachedUprightWrappers.length === 0) {
            cachedUprightWrappers = Array.from(
                portalOrbitWrapper.querySelectorAll('.portal-upright-wrapper')
            );
        }

        const counterAngle = -angle;
        for (let i = 0; i < cachedUprightWrappers.length; i++) {
            cachedUprightWrappers[i].style.transform = `rotate(${counterAngle}deg)`;
        }
    }

    function getAngleFromCenter(clientX, clientY) {
        if (!portalNetworkContainer) {
            return 0;
        }
        const rect = portalNetworkContainer.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
    }

    if (portalNetworkContainer) {
        function handleOrbitTouchMove(event) {
            if (!isTouchDragging || !isNetworkDeployed) {
                return;
            }
            if (!event.touches || !event.touches[0]) {
                return;
            }

            const t = event.touches[0];
            const dist = Math.hypot(t.clientX - touchStartX, t.clientY - touchStartY);

            if (dist > 8) {
                isTouchDraggingMove = true;
            }

            if (isTouchDraggingMove) {
                const currAngle = getAngleFromCenter(t.clientX, t.clientY);
                let diffAngle = currAngle - touchStartAngle;

                while (diffAngle < -180) diffAngle += 360;
                while (diffAngle > 180) diffAngle -= 360;

                orbitAngle = (touchStartOrbitAngle + diffAngle * TOUCH_ROTATION_SENSITIVITY) % 360;
                if (orbitAngle < 0) orbitAngle += 360;

                updateOrbitTransform(orbitAngle);

                const now = performance.now();
                const dt = Math.max(1, now - lastMoveTime);
                let stepDelta = currAngle - lastMoveAngle;
                while (stepDelta < -180) stepDelta += 360;
                while (stepDelta > 180) stepDelta -= 360;

                touchAngularVelocity = (stepDelta / dt) * 16.67 * TOUCH_ROTATION_SENSITIVITY;
                lastMoveAngle = currAngle;
                lastMoveTime = now;

                if (event.cancelable) {
                    event.preventDefault();
                }
            }
        }

        const handleOrbitTouchEnd = () => {
            window.removeEventListener('touchmove', handleOrbitTouchMove);
            window.removeEventListener('touchend', handleOrbitTouchEnd);
            window.removeEventListener('touchcancel', handleOrbitTouchEnd);

            if (!isTouchDragging) {
                return;
            }
            isTouchDragging = false;

            if (isTouchDraggingMove) {
                if (Math.abs(touchAngularVelocity) > 0.08) {
                    orbitMomentum = Math.max(-4.5, Math.min(4.5, touchAngularVelocity));
                }
                isOrbitPaused = false;
            } else {
                isOrbitPaused = false;
            }

            lastFrameTime = performance.now();
            setTimeout(() => {
                isTouchDraggingMove = false;
            }, 60);
        };

        portalNetworkContainer.addEventListener(
            'touchstart',
            event => {
                if (!isNetworkDeployed) {
                    return;
                }
                if (event.target.closest('#pravaah-core, .core-deploy-prompt')) {
                    return;
                }
                if (event.touches && event.touches[0]) {
                    const t = event.touches[0];
                    touchStartX = t.clientX;
                    touchStartY = t.clientY;
                    isTouchDragging = true;
                    isTouchDraggingMove = false;
                    isOrbitPaused = true;
                    orbitMomentum = 0;
                    touchAngularVelocity = 0;

                    touchStartAngle = getAngleFromCenter(t.clientX, t.clientY);
                    touchStartOrbitAngle = orbitAngle;
                    lastMoveAngle = touchStartAngle;
                    lastMoveTime = performance.now();

                    // Only attach touchmove while actively dragging the orbit
                    window.addEventListener('touchmove', handleOrbitTouchMove, { passive: false });
                    window.addEventListener('touchend', handleOrbitTouchEnd, { passive: true });
                    window.addEventListener('touchcancel', handleOrbitTouchEnd, { passive: true });
                }
            },
            { passive: true }
        );
    }

    function animateOrbit(timestamp) {
        const now = timestamp || performance.now();
        const dt = Math.min((now - lastFrameTime) / 1000, 0.1);
        lastFrameTime = now;

        if (
            !isOrbitPaused &&
            isNetworkDeployed &&
            portalOrbitWrapper
        ) {
            if (!isTouchDragging) {
                if (Math.abs(orbitMomentum) > 0.005) {
                    orbitAngle = (orbitAngle + orbitMomentum * (dt * 60)) % 360;
                    orbitMomentum *= Math.pow(0.94, dt * 60);
                } else {
                    orbitMomentum = 0;
                    const isMobile = window.innerWidth <= 768;
                    const speed = isMobile ? MOBILE_ORBIT_SPEED : BASE_ORBIT_SPEED;
                    orbitAngle = (orbitAngle + speed * (dt * 60)) % 360;
                }

                if (orbitAngle < 0) orbitAngle += 360;

                updateOrbitTransform(orbitAngle);
            }

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
                if (window.innerWidth <= 768) {
                    return;
                }

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