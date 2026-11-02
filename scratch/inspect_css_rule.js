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

        await send('DOM.enable');
        await send('CSS.enable');

        const doc = await send('DOM.getDocument');
        const node = await send('DOM.querySelector', { nodeId: doc.root.nodeId, selector: '.hud-panel-left' });
        const styles = await send('CSS.getMatchedStylesForNode', { nodeId: node.nodeId });

        console.log('MATCHED RULES FOR .hud-panel-left:');
        styles.matchedCSSRules.forEach(r => {
            const pos = r.rule.style.cssProperties.find(p => p.name === 'position');
            if (pos) {
                console.log(r.rule.selectorList.text, '=> position:', pos.value);
            }
        });

        ws.close();
        chrome.kill();
    } catch (e) {
        console.error(e);
        chrome.kill();
    }
}, 1500);
