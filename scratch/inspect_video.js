const fs = require('fs');
const { spawn } = require('child_process');

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function main() {
    const chromeProc = spawn(chromePath, [
        '--headless=new',
        '--remote-debugging-port=9222',
        '--autoplay-policy=no-user-gesture-required',
        '--window-size=1280,800',
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

        const evalRes = await send('Runtime.evaluate', {
            expression: `
                const v = document.querySelector('video');
                ({
                    duration: v.duration,
                    audioTracks: v.audioTracks ? v.audioTracks.length : 'no-api',
                    webkitAudioDecodedByteCount: v.webkitAudioDecodedByteCount
                })
            `,
            returnByValue: true
        });

        console.log('Audio stats:', evalRes.result.value);

        ws.close();
    } catch (e) {
        console.log('Error:', e.message);
    } finally {
        chromeProc.kill();
    }
}

main();
