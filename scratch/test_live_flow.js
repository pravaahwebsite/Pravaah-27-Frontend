const fs = require('fs');
const { spawn } = require('child_process');

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function testFlow(width, height, isMobile, prefix) {
    console.log(`Starting ${prefix} (${width}x${height})...`);
    const chromeProc = spawn(chromePath, [
        '--headless=new',
        '--remote-debugging-port=9225',
        '--autoplay-policy=no-user-gesture-required',
        `--window-size=${width},${height}`,
        'http://localhost:8080/?firsttime=true'
    ]);

    await new Promise(r => setTimeout(r, 1500));

    try {
        const listRes = await fetch('http://localhost:9225/json/list');
        const list = await listRes.json();
        const target = list.find(t => t.type === 'page');

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

        if (isMobile) {
            await send('Emulation.setDeviceMetricsOverride', {
                width: width,
                height: height,
                deviceScaleFactor: 2,
                mobile: true
            });
        }

        // Clear sessionStorage and reload
        await send('Runtime.evaluate', {
            expression: `
                sessionStorage.clear();
                window.location.href = 'http://localhost:8080/?firsttime=true';
            `
        });
        await new Promise(r => setTimeout(r, 1200));

        // 1. Splash Screen
        let shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(`scratch/${prefix}_1_splash.png`, Buffer.from(shot.data, 'base64'));
        console.log(`Saved ${prefix}_1_splash.png`);

        const navBefore = await send('Runtime.evaluate', {
            expression: `
                const topNav = document.getElementById('cosmic-nav-wheel');
                const botNav = document.getElementById('mobile-bottom-nav');
                ({
                    topNavDisplay: topNav ? window.getComputedStyle(topNav).display : null,
                    botNavDisplay: botNav ? window.getComputedStyle(botNav).display : null
                })
            `,
            returnByValue: true
        });
        console.log(`${prefix} Navs before enter:`, navBefore.result.value);

        // 2. Click portal entry trigger
        await send('Runtime.evaluate', {
            expression: `
                const btn = document.getElementById('portal-entry-trigger');
                if (btn) btn.click();
            `
        });

        // 3. Capture warp at 1.0s
        await new Promise(r => setTimeout(r, 1000));
        shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(`scratch/${prefix}_2_warp.png`, Buffer.from(shot.data, 'base64'));
        console.log(`Saved ${prefix}_2_warp.png`);

        // 4. Capture Logo at 3.6s
        await new Promise(r => setTimeout(r, 2600));
        shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(`scratch/${prefix}_3_logo.png`, Buffer.from(shot.data, 'base64'));
        console.log(`Saved ${prefix}_3_logo.png`);

        // 5. Wait for transition to home page (~2.0s more)
        await new Promise(r => setTimeout(r, 2000));
        shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(`scratch/${prefix}_4_homepage.png`, Buffer.from(shot.data, 'base64'));
        console.log(`Saved ${prefix}_4_homepage.png`);

        const navAfter = await send('Runtime.evaluate', {
            expression: `
                const topNav = document.getElementById('cosmic-nav-wheel');
                const botNav = document.getElementById('mobile-bottom-nav');
                ({
                    topNavDisplay: topNav ? window.getComputedStyle(topNav).display : null,
                    botNavDisplay: botNav ? window.getComputedStyle(botNav).display : null,
                    portalEntered: document.body.classList.contains('portal-entered')
                })
            `,
            returnByValue: true
        });
        console.log(`${prefix} Navs after enter:`, navAfter.result.value);

        ws.close();
    } catch (e) {
        console.error('Error:', e);
    } finally {
        chromeProc.kill();
    }
}

async function main() {
    await testFlow(1280, 800, false, 'desktop_live');
    await new Promise(r => setTimeout(r, 1000));
    await testFlow(390, 844, true, 'mobile_live');
    console.log('ALL FLOW TESTS COMPLETE!');
}

main();
