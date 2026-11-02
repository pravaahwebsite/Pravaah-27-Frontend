const fs = require('fs');
const { spawn } = require('child_process');

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function testViewport(width, height, isMobile, prefix) {
    const chromeProc = spawn(chromePath, [
        '--headless=new',
        '--remote-debugging-port=9223',
        '--autoplay-policy=no-user-gesture-required',
        `--window-size=${width},${height}`,
        'http://localhost:8080/scratch/test_portal.html'
    ]);

    await new Promise(r => setTimeout(r, 1500));

    try {
        const listRes = await fetch('http://localhost:9223/json/list');
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

        // Wait for specific timestamps from start
        const captureAt = async (delayMs, name) => {
            await new Promise(r => setTimeout(r, delayMs));
            const shot = await send('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync(`scratch/${prefix}_${name}.png`, Buffer.from(shot.data, 'base64'));
            console.log(`Saved scratch/${prefix}_${name}.png`);
        };

        // Reload so timing starts at 0
        await send('Page.reload');
        await captureAt(900, '0.9s_warp');
        await captureAt(1500, '2.4s_breakout');
        await captureAt(1200, '3.6s_logo');
        await captureAt(1000, '4.6s_stable');

        ws.close();
    } catch (e) {
        console.error('Error:', e);
    } finally {
        chromeProc.kill();
    }
}

async function main() {
    console.log('Testing Desktop 1280x800...');
    await testViewport(1280, 800, false, 'desktop');
    await new Promise(r => setTimeout(r, 1000));
    console.log('Testing Mobile 390x844...');
    await testViewport(390, 844, true, 'mobile');
    console.log('Done captures!');
}

main();
