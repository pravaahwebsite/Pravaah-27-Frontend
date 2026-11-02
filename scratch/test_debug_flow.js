const fs = require('fs');
const { spawn } = require('child_process');

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function testWithLogs() {
    const port = 9235;
    const chromeProc = spawn(chromePath, [
        '--headless=new',
        `--remote-debugging-port=${port}`,
        '--window-size=1280,800',
        'http://localhost:8080/index.html?firsttime=true'
    ]);

    await new Promise(r => setTimeout(r, 1800));

    try {
        const listRes = await fetch(`http://localhost:${port}/json/list`);
        const list = await listRes.json();
        const target = list.find(t => t.type === 'page');

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

        ws.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (data.method === 'Runtime.consoleAPICalled') {
                console.log('PAGE LOG:', data.params.type, data.params.args.map(a => a.value));
            }
            if (data.method === 'Runtime.exceptionThrown') {
                console.error('PAGE EXCEPTION:', data.params.exceptionDetails.text, data.params.exceptionDetails.exception);
            }
        });

        await send('Runtime.enable');
        await send('Page.enable');

        await new Promise(r => setTimeout(r, 1500));

        // Evaluate state
        const state1 = await send('Runtime.evaluate', {
            expression: `({
                portalHasEntered: typeof portalHasEntered !== 'undefined' ? portalHasEntered : 'unknown',
                canvasExists: !!document.getElementById('pravaah-glitch-canvas'),
                triggerExists: !!document.getElementById('portal-entry-trigger'),
                splashScreenClass: document.getElementById('splash-screen') ? document.getElementById('splash-screen').className : 'none'
            })`,
            returnByValue: true
        });
        console.log('Initial State:', state1.result.value);

        // Click portal entry trigger
        console.log('Triggering click...');
        const clickRes = await send('Runtime.evaluate', {
            expression: `
                const btn = document.getElementById('portal-entry-trigger');
                if (btn) {
                    btn.click();
                    'clicked';
                } else {
                    'not found';
                }
            `,
            returnByValue: true
        });
        console.log('Click result:', clickRes.result.value);

        // Check if warp started
        await new Promise(r => setTimeout(r, 1500));
        const warpState = await send('Runtime.evaluate', {
            expression: `({
                loaderDisplay: window.getComputedStyle(document.getElementById('loader-screen')).display,
                loaderClasses: document.getElementById('loader-screen').className
            })`,
            returnByValue: true
        });
        console.log('Warp State at 1.5s:', warpState.result.value);

        // Wait 5s for full transition
        await new Promise(r => setTimeout(r, 5000));
        const finalState = await send('Runtime.evaluate', {
            expression: `({
                bodyClasses: document.body.className,
                splashDisplay: window.getComputedStyle(document.getElementById('splash-screen')).display,
                navWheelDisplay: window.getComputedStyle(document.getElementById('cosmic-nav-wheel')).display
            })`,
            returnByValue: true
        });
        console.log('Final State:', finalState.result.value);

        ws.close();
    } catch (e) {
        console.error('Error:', e);
    } finally {
        chromeProc.kill();
    }
}

testWithLogs();
