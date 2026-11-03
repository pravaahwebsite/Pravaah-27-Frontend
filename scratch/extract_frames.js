const fs = require('fs');
const { spawn } = require('child_process');

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function main() {
    const chromeProc = spawn(chromePath, [
        '--headless=new',
        '--remote-debugging-port=9222',
        '--autoplay-policy=no-user-gesture-required',
        '--window-size=854,480',
        'http://localhost:8080/assets/videos/pravaah.mp4'
    ]);

    await new Promise(r => setTimeout(r, 1500));

    try {
        const listRes = await fetch('http://localhost:9222/json/list');
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

        const seekAndCapture = async (timeSec, filename) => {
            await send('Runtime.evaluate', {
                expression: `
                    new Promise(resolve => {
                        const v = document.querySelector('video');
                        v.currentTime = ${timeSec};
                        v.onseeked = () => resolve({ currentTime: v.currentTime });
                    })
                `,
                awaitPromise: true
            });
            await new Promise(r => setTimeout(r, 200));
            const shot = await send('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync(filename, Buffer.from(shot.data, 'base64'));
            console.log('Saved', filename);
        };

        await seekAndCapture(0.5, 'scratch/frame_0.5s.png');
        await seekAndCapture(1.5, 'scratch/frame_1.5s.png');
        await seekAndCapture(2.5, 'scratch/frame_2.5s.png');
        await seekAndCapture(4.0, 'scratch/frame_4.0s.png');
        await seekAndCapture(5.8, 'scratch/frame_5.8s.png');

        ws.close();
    } catch (e) {
        console.log('Error:', e.message);
    } finally {
        chromeProc.kill();
    }
}

main();
