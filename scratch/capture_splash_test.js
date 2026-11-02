const fs = require('fs');
const { spawn } = require('child_process');

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function test(width, height, isMobile, prefix) {
    const chromeProc = spawn(chromePath, [
        '--headless=new',
        '--remote-debugging-port=9228',
        `--window-size=${width},${height}`,
        'http://localhost:8080/scratch/test_pravaah_animation_splash.html'
    ]);

    await new Promise(r => setTimeout(r, 1500));

    try {
        const listRes = await fetch('http://localhost:9228/json/list');
        const list = await listRes.json();
        const target = list.find(t => t.type === 'page');

        const ws = new WebSocket(target.webSocketDebuggerUrl);
        await new Promise(r => ws.onopen = r);

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

        // Wait 1.5s for scan sweep
        await new Promise(r => setTimeout(r, 1500));
        let shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(`scratch/${prefix}_scan_1.5s.png`, Buffer.from(shot.data, 'base64'));
        console.log(`Saved ${prefix}_scan_1.5s.png`);

        // Wait 2.0s more for full reveal
        await new Promise(r => setTimeout(r, 2000));
        shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(`scratch/${prefix}_reveal_3.5s.png`, Buffer.from(shot.data, 'base64'));
        console.log(`Saved ${prefix}_reveal_3.5s.png`);

        ws.close();
    } catch (e) {
        console.error('Error:', e);
    } finally {
        chromeProc.kill();
    }
}

async function main() {
    console.log('Testing Desktop...');
    await test(1280, 800, false, 'desktop_splash');
    await new Promise(r => setTimeout(r, 1000));
    console.log('Testing Mobile...');
    await test(390, 844, true, 'mobile_splash');
    console.log('Done captures!');
}

main();
