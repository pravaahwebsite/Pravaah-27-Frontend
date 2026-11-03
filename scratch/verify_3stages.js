const fs = require('fs');
const { spawn } = require('child_process');

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function test3Stages(port, width, height, isMobile, prefix) {
    console.log(`\n======================================================`);
    console.log(`TESTING 3-STAGE SEQUENCE: ${prefix.toUpperCase()} (${width}x${height}, Mobile: ${isMobile})`);
    console.log(`======================================================`);

    const chromeProc = spawn(chromePath, [
        '--headless=new',
        `--remote-debugging-port=${port}`,
        `--window-size=${width},${height}`,
        '--disable-gpu',
        'http://localhost:8080/index.html?firsttime=true'
    ]);

    await new Promise(r => setTimeout(r, 2000));

    try {
        const listRes = await fetch(`http://localhost:${port}/json/list`);
        const list = await listRes.json();
        const target = list.find(t => t.type === 'page');

        if (!target) throw new Error('No page target found');

        const ws = new WebSocket(target.webSocketDebuggerUrl);
        await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

        let msgId = 1;
        function send(method, params = {}) {
            return new Promise((resolve) => {
                const id = msgId++;
                const handler = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.id === id) {
                        ws.removeEventListener('message', handler);
                        resolve(data.result);
                    }
                };
                ws.addEventListener('message', handler);
                ws.send(JSON.stringify({ id, method, params }));
            });
        }

        await send('Runtime.enable');
        await send('Page.enable');
        await send('DOM.enable');

        if (isMobile) {
            await send('Emulation.setDeviceMetricsOverride', {
                width: width,
                height: height,
                deviceScaleFactor: 2,
                mobile: true,
                hasTouch: true
            });
        }

        // ==========================================
        // STAGE 1: INTRO (Pravaah Animation on Black)
        // ==========================================
        console.log('\n--- Checking Stage 1: Intro on Black Background ---');
        const stage1State = await send('Runtime.evaluate', {
            expression: `({
                introDisplay: window.getComputedStyle(document.getElementById('pravaah-intro-screen')).display,
                introBg: window.getComputedStyle(document.getElementById('pravaah-intro-screen')).backgroundColor,
                canvasExists: !!document.getElementById('pravaah-glitch-canvas'),
                topNavDisplay: window.getComputedStyle(document.getElementById('cosmic-nav-wheel')).display,
                bottomNavDisplay: window.getComputedStyle(document.querySelector('.mobile-bottom-nav')).display
            })`,
            returnByValue: true
        });
        console.log('Stage 1 State:', stage1State.result.value);

        // Capture scan at 1.5s
        await new Promise(r => setTimeout(r, 1500));
        let shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(`scratch/${prefix}_stage1_intro_scan_1.5s.png`, Buffer.from(shot.data, 'base64'));
        console.log(`Saved scratch/${prefix}_stage1_intro_scan_1.5s.png`);

        // Capture reveal at 3.5s
        await new Promise(r => setTimeout(r, 2000));
        shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(`scratch/${prefix}_stage1_intro_reveal_3.5s.png`, Buffer.from(shot.data, 'base64'));
        console.log(`Saved scratch/${prefix}_stage1_intro_reveal_3.5s.png`);

        // ==========================================
        // STAGE 2: FIRST PAGE OF WEBSITE
        // ==========================================
        console.log('\n--- Transitioning to Stage 2: First Page of Website ---');
        await send('Runtime.evaluate', {
            expression: `document.getElementById('splash-skip-btn').click();`
        });
        await new Promise(r => setTimeout(r, 1200));

        const stage2State = await send('Runtime.evaluate', {
            expression: `({
                introDisplay: window.getComputedStyle(document.getElementById('pravaah-intro-screen')).display,
                splashDisplay: window.getComputedStyle(document.getElementById('splash-screen')).display,
                hasSeptagon: !!document.querySelector('.big-septagon-rotator'),
                hasCountdown: !!document.getElementById('multiverse-countdown'),
                hasHighlights: !!document.querySelector('.splash-highlights-panel'),
                topNavDisplay: window.getComputedStyle(document.getElementById('cosmic-nav-wheel')).display,
                bottomNavDisplay: window.getComputedStyle(document.querySelector('.mobile-bottom-nav')).display
            })`,
            returnByValue: true
        });
        console.log('Stage 2 State:', stage2State.result.value);

        shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(`scratch/${prefix}_stage2_firstpage.png`, Buffer.from(shot.data, 'base64'));
        console.log(`Saved scratch/${prefix}_stage2_firstpage.png`);

        // ==========================================
        // STAGE 3: HOME PAGE (Via Warp Tunnel)
        // ==========================================
        console.log('\n--- Transitioning to Stage 3: Home Page ---');
        await send('Runtime.evaluate', {
            expression: `document.getElementById('portal-entry-trigger').click();`
        });

        // 2s into warp
        await new Promise(r => setTimeout(r, 2000));
        shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(`scratch/${prefix}_stage3_warp.png`, Buffer.from(shot.data, 'base64'));
        console.log(`Saved scratch/${prefix}_stage3_warp.png`);

        // 3.8s into home page
        await new Promise(r => setTimeout(r, 3800));
        shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(`scratch/${prefix}_stage3_homepage.png`, Buffer.from(shot.data, 'base64'));
        console.log(`Saved scratch/${prefix}_stage3_homepage.png`);

        const stage3State = await send('Runtime.evaluate', {
            expression: `({
                bodyClasses: document.body.className,
                introDisplay: window.getComputedStyle(document.getElementById('pravaah-intro-screen')).display,
                splashDisplay: window.getComputedStyle(document.getElementById('splash-screen')).display,
                topNavDisplay: window.getComputedStyle(document.getElementById('cosmic-nav-wheel')).display,
                bottomNavDisplay: window.getComputedStyle(document.querySelector('.mobile-bottom-nav')).display
            })`,
            returnByValue: true
        });
        console.log('Stage 3 State:', stage3State.result.value);

        ws.close();
    } catch (e) {
        console.error('Error in test:', e);
    } finally {
        chromeProc.kill();
    }
}

async function main() {
    await test3Stages(9260, 1280, 800, false, 'desktop');
    await test3Stages(9261, 390, 844, true, 'mobile');
    console.log('\n--- ALL 3-STAGE TESTS COMPLETE ---');
}

main();
