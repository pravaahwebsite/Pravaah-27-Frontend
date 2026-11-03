const fs = require('fs');
const { spawn } = require('child_process');

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function main() {
    const chromeProc = spawn(chromePath, [
        '--headless=new',
        '--remote-debugging-port=9226',
        '--autoplay-policy=no-user-gesture-required',
        '--window-size=390,844',
        'http://localhost:8080/?firsttime=true'
    ]);

    await new Promise(r => setTimeout(r, 1500));

    try {
        const listRes = await fetch('http://localhost:9226/json/list');
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

        await send('Emulation.setDeviceMetricsOverride', {
            width: 390,
            height: 844,
            deviceScaleFactor: 2,
            mobile: true
        });

        await send('Runtime.evaluate', {
            expression: `
                sessionStorage.clear();
                window.location.href = 'http://localhost:8080/?firsttime=true';
            `
        });
        await new Promise(r => setTimeout(r, 1200));

        // Click enter
        await send('Runtime.evaluate', {
            expression: `document.getElementById('portal-entry-trigger').click();`
        });

        // Wait 3.8s to capture stable logo
        await new Promise(r => setTimeout(r, 3800));
        let shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('scratch/mobile_live_logo_3.8s.png', Buffer.from(shot.data, 'base64'));
        console.log('Saved mobile_live_logo_3.8s.png');

        ws.close();
    } catch (e) {
        console.error('Error:', e);
    } finally {
        chromeProc.kill();
    }
}

main();
