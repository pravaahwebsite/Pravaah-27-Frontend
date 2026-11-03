const fs = require('fs');
const { spawn } = require('child_process');

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function runTest(port, width, height, isMobile, prefix) {
    console.log(`\n======================================================`);
    console.log(`Starting ${prefix.toUpperCase()} Test (${width}x${height}, Mobile: ${isMobile})`);
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

        if (!target) {
            throw new Error('No page target found on CDP port ' + port);
        }

        const ws = new WebSocket(target.webSocketDebuggerUrl);
        await new Promise((resolve, reject) => {
            ws.onopen = resolve;
            ws.onerror = reject;
        });

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

        // 1. Check Pre-Enter Navigation & Splash screen
        const preState = await send('Runtime.evaluate', {
            expression: `({
                splashDisplay: window.getComputedStyle(document.getElementById('splash-screen')).display,
                hasCanvas: !!document.getElementById('pravaah-glitch-canvas'),
                hasCountdown: !!document.getElementById('multiverse-countdown'),
                navWheelDisplay: window.getComputedStyle(document.getElementById('cosmic-nav-wheel')).display,
                mobileNavDisplay: window.getComputedStyle(document.querySelector('.mobile-bottom-nav')).display
            })`,
            returnByValue: true
        });
        console.log('Pre-Enter State:', preState.result.value);

        // 2. Capture screenshot at 1.5s (Active laser scan sweep)
        await new Promise(r => setTimeout(r, 1500));
        let shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(`scratch/${prefix}_1_scan_1.5s.png`, Buffer.from(shot.data, 'base64'));
        console.log(`Saved scratch/${prefix}_1_scan_1.5s.png`);

        // 3. Capture screenshot at 3.8s (Revealed 3D Gold Logo & Floor Reflection & Countdown)
        await new Promise(r => setTimeout(r, 2300));
        shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(`scratch/${prefix}_2_reveal_3.8s.png`, Buffer.from(shot.data, 'base64'));
        console.log(`Saved scratch/${prefix}_2_reveal_3.8s.png`);

        // 4. Click "#portal-entry-trigger" ("EXPLORE MULTIVERSE")
        console.log('Clicking #portal-entry-trigger...');
        await send('Runtime.evaluate', {
            expression: `document.getElementById('portal-entry-trigger').click();`
        });

        // 5. Capture screenshot during warp tunnel (2.0s in)
        await new Promise(r => setTimeout(r, 2000));
        shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(`scratch/${prefix}_3_portal_warp.png`, Buffer.from(shot.data, 'base64'));
        console.log(`Saved scratch/${prefix}_3_portal_warp.png`);

        // 6. Wait for portal warp tunnel to complete and dissolve into home page (3.5s more)
        await new Promise(r => setTimeout(r, 3800));
        shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(`scratch/${prefix}_4_homepage_entered.png`, Buffer.from(shot.data, 'base64'));
        console.log(`Saved scratch/${prefix}_4_homepage_entered.png`);

        // 7. Check Post-Enter State
        const postState = await send('Runtime.evaluate', {
            expression: `({
                splashDisplay: window.getComputedStyle(document.getElementById('splash-screen')).display,
                bodyEntered: document.body.classList.contains('portal-entered'),
                navWheelDisplay: window.getComputedStyle(document.getElementById('cosmic-nav-wheel')).display,
                mobileNavDisplay: window.getComputedStyle(document.querySelector('.mobile-bottom-nav')).display
            })`,
            returnByValue: true
        });
        console.log('Post-Enter State:', postState.result.value);

        ws.close();
    } catch (err) {
        console.error(`Error in ${prefix} test:`, err);
    } finally {
        chromeProc.kill();
    }
}

async function main() {
    await runTest(9240, 1280, 800, false, 'desktop');
    await runTest(9241, 390, 844, true, 'mobile');
    console.log('\n--- VERIFICATION SUITE FINISHED ---');
}

main();
