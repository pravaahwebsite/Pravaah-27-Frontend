const { spawn } = require('child_process');

const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9250',
    '--window-size=1280,800',
    'http://localhost:8080/index.html?firsttime=true'
]);

setTimeout(async () => {
    try {
        const list = await (await fetch('http://localhost:9250/json/list')).json();
        const target = list.find(t => t.type === 'page');
        const ws = new WebSocket(target.webSocketDebuggerUrl);
        ws.onopen = () => {
            ws.send(JSON.stringify({
                id: 1,
                method: 'Runtime.evaluate',
                params: {
                    expression: `(() => {
                        const el = document.querySelector('.hud-panel-left');
                        const s = window.getComputedStyle(el);
                        return {
                            position: s.position,
                            left: s.left,
                            right: s.right,
                            top: s.top,
                            transform: s.transform,
                            display: s.display
                        };
                    })()`,
                    returnByValue: true
                }
            }));
        };
        ws.onmessage = (e) => {
            const raw = JSON.parse(e.data);
            console.log('COMPUTED:', raw.result.result.value);
            ws.close();
            chrome.kill();
            process.exit(0);
        };
    } catch (e) {
        console.error(e);
        chrome.kill();
        process.exit(1);
    }
}, 1500);
