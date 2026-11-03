# Enhanced index.html generation with authentic mosaic downsampling, chromatic split, and URL parameters
$goldB64 = [System.IO.File]::ReadAllText("c:\Users\Administrator\Documents\pravaah animation\pravaah_gold.png.b64")
$edgesB64 = [System.IO.File]::ReadAllText("c:\Users\Administrator\Documents\pravaah animation\pravaah_edges.png.b64")
$cyan2dB64 = [System.IO.File]::ReadAllText("c:\Users\Administrator\Documents\pravaah animation\pravaah_2d_cyan.png.b64")
$gold2dB64 = [System.IO.File]::ReadAllText("c:\Users\Administrator\Documents\pravaah animation\pravaah_2d_gold.png.b64")

$template = @'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>PRAVAAH '27 | Official Logo Hologram Glitch Animation</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-dark: #050814;
            --bg-deep: #02040a;
            --tech-cyan: #00f2fe;
            --tech-blue: #007cf0;
            --gold-main: #ffd700;
            --gold-accent: #f59e0b;
            --cult-pink: #ff007f;
            --cult-purple: #9d4edd;
            --text-main: #ffffff;
            --text-muted: #8892b0;
            --glass-bg: rgba(6, 12, 28, 0.7);
            --glass-border: rgba(0, 242, 254, 0.22);
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            user-select: none;
            -webkit-user-select: none;
        }

        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: var(--bg-deep);
            color: var(--text-main);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        #stage-container {
            position: relative;
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            background: #030611;
        }

        /* Diagonal Tech Grid Studio Background matching reference */
        .tech-bg {
            position: absolute;
            inset: 0;
            background: 
                radial-gradient(ellipse 65% 45% at 50% 38%, rgba(0, 140, 255, 0.18) 0%, rgba(4, 9, 24, 0.88) 60%, #02040a 100%),
                repeating-linear-gradient(
                    -45deg,
                    rgba(0, 242, 254, 0.025) 0px,
                    rgba(0, 242, 254, 0.025) 2px,
                    transparent 2px,
                    transparent 14px
                );
            pointer-events: none;
            z-index: 1;
        }

        /* Vignette overlay */
        .vignette {
            position: absolute;
            inset: 0;
            box-shadow: inset 0 0 130px rgba(0, 0, 0, 0.85), inset 0 0 45px rgba(0, 242, 254, 0.06);
            pointer-events: none;
            z-index: 2;
        }

        /* Canvas */
        #glitchCanvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 3;
            display: block;
            cursor: grab;
        }

        #glitchCanvas:active {
            cursor: grabbing;
        }

        /* Top Header / Branding Bar */
        .fest-header {
            position: absolute;
            top: 24px;
            left: 32px;
            right: 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 10;
            pointer-events: none;
        }

        .fest-badge {
            display: flex;
            align-items: center;
            gap: 12px;
            pointer-events: auto;
        }

        .fest-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.25rem;
            font-weight: 900;
            letter-spacing: 3px;
            background: linear-gradient(135deg, #ffffff 0%, var(--gold-main) 50%, var(--tech-cyan) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 20px rgba(0, 242, 254, 0.35);
            text-transform: uppercase;
        }

        .fest-theme-tag {
            font-family: 'Orbitron', sans-serif;
            font-size: 0.65rem;
            font-weight: 700;
            letter-spacing: 2px;
            padding: 4px 10px;
            border-radius: 20px;
            background: rgba(0, 242, 254, 0.1);
            border: 1px solid rgba(0, 242, 254, 0.35);
            color: var(--tech-cyan);
            text-shadow: 0 0 10px rgba(0, 242, 254, 0.5);
        }

        /* Palette Recommendation Banner */
        .palette-banner {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(14, 8, 28, 0.88);
            border: 1px solid rgba(255, 215, 0, 0.38);
            padding: 8px 18px;
            border-radius: 30px;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            pointer-events: auto;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 215, 0, 0.15);
        }

        .palette-icon {
            color: var(--gold-main);
            font-size: 0.95rem;
        }

        .palette-text {
            font-size: 0.75rem;
            color: #e2e8f0;
        }

        .palette-text strong {
            color: var(--gold-main);
            font-family: 'Orbitron', sans-serif;
            font-size: 0.72rem;
            letter-spacing: 1px;
        }

        /* Floating Cyber Dock Controls */
        .controls-dock {
            position: absolute;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 18px;
            background: rgba(6, 12, 28, 0.78);
            border: 1px solid rgba(0, 242, 254, 0.32);
            border-radius: 40px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.65), 0 0 20px rgba(0, 242, 254, 0.15);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            z-index: 10;
            transition: all 0.3s ease;
        }

        .controls-dock:hover {
            border-color: rgba(0, 242, 254, 0.55);
            box-shadow: 0 10px 35px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 242, 254, 0.3);
        }

        .btn-dock {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #fff;
            padding: 8px 14px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.25s ease;
            outline: none;
        }

        .btn-dock:hover {
            background: rgba(0, 242, 254, 0.18);
            border-color: var(--tech-cyan);
            color: var(--tech-cyan);
            box-shadow: 0 0 15px rgba(0, 242, 254, 0.35);
            transform: translateY(-2px);
        }

        .btn-dock.active {
            background: linear-gradient(135deg, rgba(0, 242, 254, 0.25), rgba(0, 124, 240, 0.25));
            border-color: var(--tech-cyan);
            color: #fff;
            box-shadow: 0 0 15px rgba(0, 242, 254, 0.4);
        }

        .btn-dock.primary-replay {
            background: linear-gradient(135deg, var(--tech-cyan), var(--tech-blue));
            color: #030713;
            font-weight: 700;
            border: none;
            box-shadow: 0 0 20px rgba(0, 242, 254, 0.5);
        }

        .btn-dock.primary-replay:hover {
            background: linear-gradient(135deg, #ffffff, var(--tech-cyan));
            color: #000;
            box-shadow: 0 0 25px rgba(0, 242, 254, 0.8);
            transform: translateY(-2px) scale(1.02);
        }

        .btn-icon {
            width: 16px;
            height: 16px;
            fill: currentColor;
        }

        .divider {
            width: 1px;
            height: 22px;
            background: rgba(255, 255, 255, 0.15);
        }

        /* Logo Selector Segment */
        .segmented-group {
            display: flex;
            background: rgba(0, 0, 0, 0.45);
            border-radius: 20px;
            padding: 3px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .seg-btn {
            background: transparent;
            border: none;
            color: var(--text-muted);
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 0.75rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.25s ease;
        }

        .seg-btn:hover {
            color: #fff;
        }

        .seg-btn.active {
            background: linear-gradient(135deg, var(--gold-main), var(--gold-accent));
            color: #050814;
            box-shadow: 0 0 12px rgba(255, 215, 0, 0.45);
        }

        .seg-btn.active.cyan-mode {
            background: linear-gradient(135deg, var(--tech-cyan), var(--tech-blue));
            color: #050814;
            box-shadow: 0 0 12px rgba(0, 242, 254, 0.45);
        }

        .hint-toast {
            position: absolute;
            bottom: 84px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.72rem;
            letter-spacing: 1.5px;
            color: rgba(255, 255, 255, 0.45);
            text-transform: uppercase;
            font-family: 'Orbitron', sans-serif;
            pointer-events: none;
            z-index: 10;
            animation: fadeInOut 4s infinite ease-in-out;
        }

        @keyframes fadeInOut {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
        }

        @media (max-width: 900px) {
            .fest-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
                top: 16px;
                left: 16px;
                right: 16px;
            }
            .controls-dock {
                width: 94%;
                flex-wrap: wrap;
                justify-content: center;
                bottom: 16px;
                padding: 10px 12px;
                border-radius: 20px;
            }
            .hint-toast {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div id="stage-container">
        <div class="tech-bg"></div>
        <div class="vignette"></div>

        <div class="fest-header">
            <div class="fest-badge">
                <span class="fest-title">PRAVAAH '27</span>
                <span class="fest-theme-tag">KAIROS</span>
            </div>

            <div class="palette-banner">
                <span class="palette-icon">&#9733;</span>
                <div class="palette-text">
                    Best Suited for Fest Palette: <strong>3D Metallic Gold Edition</strong>
                </div>
            </div>
        </div>

        <canvas id="glitchCanvas"></canvas>

        <div class="hint-toast">Drag to tilt in 3D &bull; Click to Re-trigger Scan</div>

        <div class="controls-dock">
            <button class="btn-dock primary-replay" id="btnReplay" title="Replay Animation">
                <svg class="btn-icon" viewBox="0 0 24 24">
                    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6 0 2.97-2.17 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93 0-4.42-3.58-8-8-8zm-6 8c0-1.65.67-3.15 1.76-4.24L6.34 7.34C4.9 8.79 4 10.79 4 13c0 4.08 3.05 7.44 7 7.93v-2.02c-2.83-.48-5-2.94-5-5.91z"/>
                </svg>
                <span>REVEAL</span>
            </button>

            <button class="btn-dock" id="btnPlayPause" title="Play / Pause">
                <svg class="btn-icon" id="playPauseIcon" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
                <span id="playPauseText">PAUSE</span>
            </button>

            <button class="btn-dock active" id="btnLoop" title="Loop Animation">
                <svg class="btn-icon" viewBox="0 0 24 24">
                    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
                </svg>
                <span>LOOP</span>
            </button>

            <div class="divider"></div>

            <div class="segmented-group">
                <button class="seg-btn active" id="logoGold" title="3D Metallic Gold (Recommended for Fest Dark Theme)">
                    3D Gold (Rec.)
                </button>
                <button class="seg-btn" id="logoCyan" title="2D Cyber Cyan Neon Edition">
                    Cyber Cyan
                </button>
                <button class="seg-btn" id="logo2DGold" title="2D Golden Vector Edition">
                    2D Gold
                </button>
            </div>

            <div class="divider"></div>

            <button class="btn-dock" id="btnAudio" title="Toggle Sci-Fi Glitch Audio">
                <svg class="btn-icon" id="audioIcon" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
                <span id="audioText">SOUND ON</span>
            </button>

            <button class="btn-dock" id="btnFullscreen" title="Fullscreen Mode">
                <svg class="btn-icon" viewBox="0 0 24 24">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
            </button>
        </div>
    </div>

    <!-- Embedded Assets -->
    <script>
        const ASSETS = {
            gold: "data:image/png;base64,__GOLD_B64__",
            edges: "data:image/png;base64,__EDGES_B64__",
            cyan2d: "data:image/png;base64,__CYAN2D_B64__",
            gold2d: "data:image/png;base64,__GOLD2D_B64__"
        };
    </script>

    <script>
        // --- Web Audio Synthesizer ---
        class CyberAudio {
            constructor() {
                this.ctx = null;
                this.enabled = true;
                this.masterGain = null;
            }

            init() {
                if (this.ctx) {
                    if (this.ctx.state === 'suspended') this.ctx.resume();
                    return;
                }
                try {
                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                    this.ctx = new AudioContext();
                    this.masterGain = this.ctx.createGain();
                    this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
                    this.masterGain.connect(this.ctx.destination);
                } catch(e) {}
            }

            toggle() {
                this.enabled = !this.enabled;
                if (this.masterGain && this.ctx) {
                    this.masterGain.gain.setValueAtTime(this.enabled ? 0.35 : 0, this.ctx.currentTime);
                }
                return this.enabled;
            }

            playGlitchCrunch() {
                if (!this.enabled || !this.ctx) return;
                try {
                    const now = this.ctx.currentTime;
                    const bufferSize = Math.floor(this.ctx.sampleRate * 0.07);
                    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
                    const data = buffer.getChannelData(0);
                    for (let i = 0; i < bufferSize; i++) {
                        data[i] = (Math.random() * 2 - 1) * 0.35;
                    }
                    const noise = this.ctx.createBufferSource();
                    noise.buffer = buffer;

                    const filter = this.ctx.createBiquadFilter();
                    filter.type = 'bandpass';
                    filter.frequency.setValueAtTime(1400 + Math.random() * 2200, now);
                    filter.Q.setValueAtTime(3.5, now);

                    const gain = this.ctx.createGain();
                    gain.gain.setValueAtTime(0.2, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

                    noise.connect(filter);
                    filter.connect(gain);
                    gain.connect(this.masterGain);
                    noise.start(now);
                } catch(e) {}
            }

            playScanLaser(progress) {
                if (!this.enabled || !this.ctx) return;
                if (Math.random() > 0.4) return;
                try {
                    const now = this.ctx.currentTime;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();

                    osc.type = 'sawtooth';
                    const startFreq = 260 + progress * 550;
                    osc.frequency.setValueAtTime(startFreq, now);
                    osc.frequency.exponentialRampToValueAtTime(startFreq * 1.5, now + 0.05);

                    gain.gain.setValueAtTime(0.06, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

                    osc.connect(gain);
                    gain.connect(this.masterGain);
                    osc.start(now);
                    osc.stop(now + 0.05);
                } catch(e) {}
            }

            playImpactBoom() {
                if (!this.enabled || !this.ctx) return;
                try {
                    const now = this.ctx.currentTime;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();

                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(130, now);
                    osc.frequency.exponentialRampToValueAtTime(32, now + 0.8);

                    gain.gain.setValueAtTime(0.48, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

                    osc.connect(gain);
                    gain.connect(this.masterGain);
                    osc.start(now);
                    osc.stop(now + 0.8);

                    this.playChime();
                } catch(e) {}
            }

            playChime() {
                if (!this.enabled || !this.ctx) return;
                try {
                    const now = this.ctx.currentTime;
                    [880, 1320, 1760].forEach((freq, idx) => {
                        const osc = this.ctx.createOscillator();
                        const gain = this.ctx.createGain();
                        osc.type = 'triangle';
                        osc.frequency.setValueAtTime(freq, now + idx * 0.035);
                        gain.gain.setValueAtTime(0.1 / (idx + 1), now + idx * 0.035);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55 + idx * 0.04);

                        osc.connect(gain);
                        gain.connect(this.masterGain);
                        osc.start(now + idx * 0.035);
                        osc.stop(now + 0.6 + idx * 0.04);
                    });
                } catch(e) {}
            }
        }

        const audio = new CyberAudio();

        // --- Canvas Setup ---
        const canvas = document.getElementById('glitchCanvas');
        const ctx = canvas.getContext('2d');

        const urlParams = new URLSearchParams(window.location.search);

        const state = {
            currentLogo: urlParams.get('logo') || 'gold',
            isPlaying: !urlParams.has('t'),
            isLooping: true,
            time: urlParams.has('t') ? parseFloat(urlParams.get('t')) : 0,
            duration: 4.8,
            scanStart: 0.3,
            scanEnd: 2.1,
            sheenStart: 2.15,
            sheenEnd: 2.95,
            speed: 1.0,
            hasPlayedBoom: false,
            targetTiltX: 0,
            targetTiltY: 0,
            currentTiltX: 0,
            currentTiltY: 0,
            particles: [],
            images: {},
            imagesLoaded: false
        };

        function loadImages(callback) {
            let loaded = 0;
            const keys = Object.keys(ASSETS);
            keys.forEach(k => {
                const img = new Image();
                img.onload = () => {
                    loaded++;
                    state.images[k] = img;
                    if (loaded === keys.length) {
                        state.imagesLoaded = true;
                        callback();
                    }
                };
                img.src = ASSETS[k];
            });
        }

        class SparkParticle {
            constructor(x, y, vx, vy, size, color, life) {
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.size = size;
                this.color = color;
                this.life = life;
                this.maxLife = life;
                this.alpha = 1;
            }

            update(dt) {
                this.x += this.vx * dt * 60;
                this.y += this.vy * dt * 60;
                this.vy += 0.02;
                this.life -= dt;
                this.alpha = Math.max(0, this.life / this.maxLife);
            }

            draw(targetCtx) {
                if (this.alpha <= 0) return;
                targetCtx.save();
                targetCtx.globalAlpha = this.alpha;
                targetCtx.fillStyle = this.color;
                targetCtx.shadowColor = this.color;
                targetCtx.shadowBlur = 8;
                targetCtx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
                targetCtx.restore();
            }
        }

        function spawnScanSparks(x, y, count, color) {
            for (let i = 0; i < count; i++) {
                const angle = (Math.random() * Math.PI) + Math.PI;
                const speed = 0.8 + Math.random() * 3.5;
                const vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 2;
                const vy = Math.sin(angle) * speed * 0.8;
                const size = 1.5 + Math.random() * 3.5;
                const life = 0.4 + Math.random() * 0.6;
                state.particles.push(new SparkParticle(x + (Math.random() - 0.5) * 40, y, vx, vy, size, color, life));
            }
            if (state.particles.length > 250) {
                state.particles.splice(0, state.particles.length - 250);
            }
        }

        const ambientDust = [];
        for (let i = 0; i < 45; i++) {
            ambientDust.push({
                x: Math.random(),
                y: Math.random(),
                vx: (Math.random() - 0.5) * 0.0003,
                vy: -0.0002 - Math.random() * 0.0004,
                size: 1 + Math.random() * 2.2,
                alpha: 0.15 + Math.random() * 0.45,
                hue: Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(255, 215, 0, '
            });
        }

        let dpr = 1;
        let viewW = 0;
        let viewH = 0;

        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            viewW = window.innerWidth;
            viewH = window.innerHeight;
            canvas.width = viewW * dpr;
            canvas.height = viewH * dpr;
            ctx.scale(dpr, dpr);
        }

        window.addEventListener('resize', resize);
        resize();

        window.addEventListener('mousemove', (e) => {
            const nx = (e.clientX / viewW) * 2 - 1;
            const ny = (e.clientY / viewH) * 2 - 1;
            state.targetTiltX = nx * 8;
            state.targetTiltY = -ny * 6;
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const t = e.touches[0];
                const nx = (t.clientX / viewW) * 2 - 1;
                const ny = (t.clientY / viewH) * 2 - 1;
                state.targetTiltX = nx * 8;
                state.targetTiltY = -ny * 6;
            }
        }, { passive: true });

        const offCanvas = document.createElement('canvas');
        const offCtx = offCanvas.getContext('2d');

        const mosaicCanvas = document.createElement('canvas');
        const mosaicCtx = mosaicCanvas.getContext('2d');

        let lastFrameTime = performance.now();

        function render(now) {
            requestAnimationFrame(render);

            const dt = Math.min((now - lastFrameTime) / 1000, 0.1);
            lastFrameTime = now;

            if (state.isPlaying) {
                state.time += dt * state.speed;
                if (state.time >= state.duration) {
                    if (state.isLooping) {
                        state.time = 0;
                        state.hasPlayedBoom = false;
                    } else {
                        state.time = state.duration;
                        state.isPlaying = false;
                        updatePlayPauseUI();
                    }
                }
            }

            state.currentTiltX += (state.targetTiltX - state.currentTiltX) * 0.08;
            state.currentTiltY += (state.targetTiltY - state.currentTiltY) * 0.08;

            ctx.clearRect(0, 0, viewW, viewH);

            if (!state.imagesLoaded) return;

            const activeImg = state.images[state.currentLogo] || state.images.gold;
            const edgeImg = state.images.edges;

            const maxLogoW = Math.min(viewW * 0.72, 490);
            const scale = maxLogoW / activeImg.width;
            const logoW = activeImg.width * scale;
            const logoH = activeImg.height * scale;

            const logoCenterX = viewW / 2 + state.currentTiltX * 1.5;
            const floatOffset = Math.sin(state.time * 2.2) * 4;
            const logoCenterY = (viewH * 0.38) + floatOffset + state.currentTiltY * 1.2;

            const logoX = logoCenterX - logoW / 2;
            const logoY = logoCenterY - logoH / 2;

            const horizonY = viewH * 0.63;

            const radialGlow = ctx.createRadialGradient(logoCenterX, logoCenterY, 20, logoCenterX, logoCenterY, logoW * 0.85);
            let glowAlpha = 0.22;
            if (state.time > state.scanStart && state.time < state.scanEnd) {
                glowAlpha = 0.36 + Math.sin(state.time * 25) * 0.1;
            } else if (state.time >= state.sheenStart && state.time <= state.sheenEnd) {
                glowAlpha = 0.48;
            }
            radialGlow.addColorStop(0, `rgba(0, 242, 254, ${glowAlpha})`);
            radialGlow.addColorStop(0.5, `rgba(0, 120, 255, ${glowAlpha * 0.4})`);
            radialGlow.addColorStop(1, 'rgba(3, 6, 17, 0)');

            ctx.fillStyle = radialGlow;
            ctx.beginPath();
            ctx.arc(logoCenterX, logoCenterY, logoW * 0.9, 0, Math.PI * 2);
            ctx.fill();

            ambientDust.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.y < 0) p.y = 1;
                if (p.x < 0) p.x = 1;
                if (p.x > 1) p.x = 0;

                ctx.fillStyle = p.hue + p.alpha + ')';
                ctx.beginPath();
                ctx.arc(p.x * viewW, p.y * viewH, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            offCanvas.width = activeImg.width;
            offCanvas.height = activeImg.height;
            offCtx.clearRect(0, 0, offCanvas.width, offCanvas.height);

            const natW = activeImg.width;
            const natH = activeImg.height;

            let scanProgress = 0;
            if (state.time < state.scanStart) {
                scanProgress = 0;
            } else if (state.time >= state.scanEnd) {
                scanProgress = 1;
            } else {
                const norm = (state.time - state.scanStart) / (state.scanEnd - state.scanStart);
                scanProgress = norm < 0.5 ? 4 * norm * norm * norm : 1 - Math.pow(-2 * norm + 2, 3) / 2;
                audio.playScanLaser(scanProgress);
                if (Math.random() < 0.28) audio.playGlitchCrunch();
            }

            if (state.time >= state.scanEnd && !state.hasPlayedBoom) {
                audio.playImpactBoom();
                state.hasPlayedBoom = true;
            }

            const scanCurrentY = scanProgress * natH;
            const scanBandHeight = 65;

            // A. Cyan Holographic Wireframe
            if (scanProgress < 1.0) {
                offCtx.save();
                const edgeFlicker = 0.35 + Math.sin(state.time * 30 + Math.random()) * 0.15;
                offCtx.globalAlpha = edgeFlicker;
                offCtx.drawImage(edgeImg, 0, 0);
                offCtx.restore();
            }

            // B. Fully Revealed Logo above scanline
            if (scanCurrentY > 0) {
                const revealTopH = Math.max(0, scanCurrentY - scanBandHeight * 0.5);
                if (revealTopH > 0) {
                    offCtx.save();
                    offCtx.beginPath();
                    offCtx.rect(0, 0, natW, revealTopH);
                    offCtx.clip();
                    offCtx.drawImage(activeImg, 0, 0);
                    offCtx.restore();
                }
            }

            // C. Active Glitch Scan Band
            if (scanProgress > 0 && scanProgress < 1.0) {
                const bandTop = Math.max(0, scanCurrentY - scanBandHeight);
                const bandBottom = Math.min(natH, scanCurrentY + scanBandHeight * 0.45);
                const bandH = bandBottom - bandTop;

                if (bandH > 0) {
                    offCtx.save();
                    offCtx.beginPath();
                    offCtx.rect(0, bandTop, natW, bandH);
                    offCtx.clip();

                    const blockSize = 14;
                    const downW = Math.max(1, Math.floor(natW / blockSize));
                    const downH = Math.max(1, Math.floor(bandH / blockSize));

                    mosaicCanvas.width = downW;
                    mosaicCanvas.height = downH;
                    mosaicCtx.imageSmoothingEnabled = false;
                    mosaicCtx.drawImage(activeImg, 0, bandTop, natW, bandH, 0, 0, downW, downH);

                    const chromOffset = Math.round(5 + Math.random() * 8);

                    // Red channel shifted
                    offCtx.save();
                    offCtx.globalAlpha = 0.7;
                    offCtx.imageSmoothingEnabled = false;
                    offCtx.drawImage(mosaicCanvas, 0, 0, downW, downH, -chromOffset, bandTop, natW, bandH);
                    offCtx.restore();

                    // Cyan channel shifted
                    offCtx.save();
                    offCtx.globalAlpha = 0.7;
                    offCtx.imageSmoothingEnabled = false;
                    offCtx.drawImage(mosaicCanvas, 0, 0, downW, downH, chromOffset, bandTop, natW, bandH);
                    offCtx.restore();

                    // Center mosaic
                    offCtx.imageSmoothingEnabled = false;
                    offCtx.drawImage(mosaicCanvas, 0, 0, downW, downH, 0, bandTop, natW, bandH);
                    offCtx.imageSmoothingEnabled = true;

                    // Neon Blocks
                    const cols = downW;
                    const rows = downH;

                    for (let r = 0; r < rows; r++) {
                        const by = bandTop + r * blockSize;
                        for (let c = 0; c < cols; c++) {
                            const bx = c * blockSize;
                            const rand = Math.random();

                            if (rand < 0.35) {
                                const isCyan = Math.random() < 0.65;
                                const isGold = !isCyan && (Math.random() < 0.65);

                                offCtx.save();
                                const jx = bx + (Math.random() - 0.5) * 6;
                                const jy = by + (Math.random() - 0.5) * 3;

                                if (isCyan) {
                                    offCtx.fillStyle = '#00f2fe';
                                    offCtx.shadowColor = '#00f2fe';
                                    offCtx.shadowBlur = 10;
                                    offCtx.globalAlpha = 0.85 + Math.random() * 0.15;
                                } else if (isGold) {
                                    offCtx.fillStyle = '#ffd700';
                                    offCtx.shadowColor = '#ffd700';
                                    offCtx.shadowBlur = 10;
                                    offCtx.globalAlpha = 0.85;
                                } else {
                                    offCtx.fillStyle = '#ffffff';
                                    offCtx.shadowColor = '#ffffff';
                                    offCtx.shadowBlur = 14;
                                    offCtx.globalAlpha = 0.95;
                                }

                                offCtx.fillRect(jx, jy, blockSize - 1, blockSize - 1);
                                offCtx.restore();

                                if (Math.random() < 0.09) {
                                    const screenPx = logoX + (bx / natW) * logoW;
                                    const screenPy = logoY + (by / natH) * logoH;
                                    spawnScanSparks(screenPx, screenPy, 1, isCyan ? '#00f2fe' : '#ffd700');
                                }
                            } else if (rand < 0.52) {
                                offCtx.strokeStyle = 'rgba(0, 242, 254, 0.6)';
                                offCtx.lineWidth = 1;
                                offCtx.strokeRect(bx, by, blockSize - 1, blockSize - 1);
                            }
                        }
                    }

                    // Slice glitch
                    if (Math.random() < 0.45) {
                        const sliceY = bandTop + Math.random() * bandH;
                        const sliceH = 4 + Math.random() * 10;
                        const sliceShift = (Math.random() - 0.5) * 22;
                        offCtx.drawImage(activeImg, 0, sliceY, natW, sliceH, sliceShift, sliceY, natW, sliceH);
                    }

                    offCtx.restore();

                    // Laser line
                    offCtx.save();
                    const laserGrad = offCtx.createLinearGradient(0, scanCurrentY - 6, 0, scanCurrentY + 6);
                    laserGrad.addColorStop(0, 'rgba(0, 242, 254, 0)');
                    laserGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
                    laserGrad.addColorStop(1, 'rgba(0, 242, 254, 0)');

                    offCtx.fillStyle = laserGrad;
                    offCtx.fillRect(0, scanCurrentY - 4, natW, 8);
                    offCtx.restore();
                }
            }

            // D. Specular Sheen Sweep
            if (state.time >= state.sheenStart && state.time <= state.sheenEnd) {
                const sheenNorm = (state.time - state.sheenStart) / (state.sheenEnd - state.sheenStart);
                const sheenX = -natW * 0.4 + sheenNorm * (natW * 1.8);
                const sheenWidth = 140;

                offCtx.save();
                offCtx.globalCompositeOperation = 'source-atop';

                const sheenGrad = offCtx.createLinearGradient(sheenX - sheenWidth, 0, sheenX + sheenWidth, natH);
                sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
                sheenGrad.addColorStop(0.4, 'rgba(0, 242, 254, 0.4)');
                sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
                sheenGrad.addColorStop(0.6, 'rgba(255, 215, 0, 0.5)');
                sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

                offCtx.fillStyle = sheenGrad;
                offCtx.fillRect(0, 0, natW, natH);
                offCtx.restore();
            }

            // Primary Logo
            ctx.save();
            ctx.translate(logoCenterX, logoCenterY);
            ctx.transform(
                1, state.currentTiltY * 0.005,
                state.currentTiltX * 0.005, 1,
                0, 0
            );
            ctx.translate(-logoCenterX, -logoCenterY);

            ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
            ctx.shadowBlur = 30;
            ctx.shadowOffsetY = 15;

            ctx.drawImage(offCanvas, logoX, logoY, logoW, logoH);
            ctx.restore();

            // Sparks
            for (let i = state.particles.length - 1; i >= 0; i--) {
                const p = state.particles[i];
                p.update(dt);
                if (p.alpha <= 0) {
                    state.particles.splice(i, 1);
                } else {
                    p.draw(ctx);
                }
            }

            // Reflection
            renderWetFloorReflection(logoX, logoY, logoW, logoH, horizonY);
        }

        function renderWetFloorReflection(logoX, logoY, logoW, logoH, horizonY) {
            ctx.save();

            ctx.beginPath();
            ctx.rect(0, horizonY - 10, viewW, viewH - horizonY + 10);
            ctx.clip();

            const reflH = logoH * 0.68;
            const reflY = horizonY + 22;

            const slices = 48;
            const sliceH = reflH / slices;

            for (let i = 0; i < slices; i++) {
                const norm = i / slices;
                const sy = (1 - norm) * offCanvas.height;
                const sSliceH = (1 / slices) * offCanvas.height;

                const dy = reflY + i * sliceH;

                const wave1 = Math.sin(norm * 18 + state.time * 4.5) * 6;
                const wave2 = Math.cos(norm * 32 - state.time * 6.0) * 3.5;
                const rippleX = (wave1 + wave2) * (1 - norm * 0.35);

                const perskW = logoW * (1 + norm * 0.22);
                const perskX = (viewW / 2) - (perskW / 2) + rippleX;

                const rippleAlpha = (1.0 - Math.pow(norm, 0.95)) * 0.42;

                if (rippleAlpha > 0.01) {
                    ctx.save();
                    ctx.globalAlpha = rippleAlpha;
                    ctx.drawImage(
                        offCanvas,
                        0, sy, offCanvas.width, sSliceH,
                        perskX, dy, perskW, sliceH + 1.2
                    );
                    ctx.restore();
                }
            }

            const floorGrad = ctx.createLinearGradient(0, horizonY, 0, viewH);
            floorGrad.addColorStop(0, 'rgba(3, 6, 17, 0.45)');
            floorGrad.addColorStop(0.3, 'rgba(2, 4, 10, 0.6)');
            floorGrad.addColorStop(1, 'rgba(1, 2, 6, 0.92)');

            ctx.fillStyle = floorGrad;
            ctx.fillRect(0, horizonY, viewW, viewH - horizonY);

            const specGlow = ctx.createRadialGradient(viewW / 2, horizonY + 50, 10, viewW / 2, horizonY + 120, logoW * 0.6);
            let specAlpha = 0.18;
            if (state.time > state.scanStart && state.time < state.scanEnd) {
                specAlpha = 0.32 + Math.sin(state.time * 30) * 0.08;
            } else if (state.time >= state.sheenStart && state.time <= state.sheenEnd) {
                specAlpha = 0.42;
            }
            specGlow.addColorStop(0, `rgba(0, 242, 254, ${specAlpha})`);
            specGlow.addColorStop(0.4, `rgba(0, 120, 255, ${specAlpha * 0.35})`);
            specGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = specGlow;
            ctx.fillRect(0, horizonY, viewW, viewH - horizonY);

            ctx.restore();
        }

        const btnReplay = document.getElementById('btnReplay');
        const btnPlayPause = document.getElementById('btnPlayPause');
        const btnLoop = document.getElementById('btnLoop');
        const playPauseText = document.getElementById('playPauseText');
        const playPauseIcon = document.getElementById('playPauseIcon');
        const btnAudio = document.getElementById('btnAudio');
        const audioText = document.getElementById('audioText');
        const btnFullscreen = document.getElementById('btnFullscreen');

        const logoGold = document.getElementById('logoGold');
        const logoCyan = document.getElementById('logoCyan');
        const logo2DGold = document.getElementById('logo2DGold');

        function triggerReplay() {
            audio.init();
            state.time = 0;
            state.isPlaying = true;
            state.hasPlayedBoom = false;
            updatePlayPauseUI();
        }

        btnReplay.addEventListener('click', triggerReplay);
        canvas.addEventListener('click', () => {
            audio.init();
            triggerReplay();
        });

        function updatePlayPauseUI() {
            if (state.isPlaying) {
                playPauseText.textContent = 'PAUSE';
                playPauseIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
            } else {
                playPauseText.textContent = 'PLAY';
                playPauseIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
            }
        }

        btnPlayPause.addEventListener('click', () => {
            audio.init();
            state.isPlaying = !state.isPlaying;
            updatePlayPauseUI();
        });

        btnLoop.addEventListener('click', () => {
            state.isLooping = !state.isLooping;
            btnLoop.classList.toggle('active', state.isLooping);
        });

        btnAudio.addEventListener('click', () => {
            audio.init();
            const enabled = audio.toggle();
            audioText.textContent = enabled ? 'SOUND ON' : 'MUTED';
            btnAudio.classList.toggle('active', enabled);
        });

        btnFullscreen.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
            } else {
                document.exitFullscreen().catch(() => {});
            }
        });

        function selectLogo(type, activeBtn) {
            state.currentLogo = type;
            [logoGold, logoCyan, logo2DGold].forEach(b => b.classList.remove('active', 'cyan-mode'));
            activeBtn.classList.add('active');
            if (type === 'cyan2d') activeBtn.classList.add('cyan-mode');
            triggerReplay();
        }

        logoGold.addEventListener('click', () => selectLogo('gold', logoGold));
        logoCyan.addEventListener('click', () => selectLogo('cyan2d', logoCyan));
        logo2DGold.addEventListener('click', () => selectLogo('gold2d', logo2DGold));

        loadImages(() => {
            requestAnimationFrame((t) => {
                lastFrameTime = t;
                render(t);
            });
        });

        window.addEventListener('click', () => {
            audio.init();
        }, { once: true });
    </script>
</body>
</html>
'@

$html = $template.Replace("__GOLD_B64__", $goldB64)
$html = $html.Replace("__EDGES_B64__", $edgesB64)
$html = $html.Replace("__CYAN2D_B64__", $cyan2dB64)
$html = $html.Replace("__GOLD2D_B64__", $gold2dB64)

[System.IO.File]::WriteAllText("c:\Users\Administrator\Documents\pravaah animation\index.html", $html)
Write-Output "Regenerated index.html with enhanced mosaic & URL param support. Length: $($html.Length)"
