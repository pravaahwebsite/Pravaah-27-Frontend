const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const srcVideo = 'C:/Users/sitar/.gemini/antigravity/brain/e1b67d5e-a22c-4e23-80d9-92b2805d795e/.user_uploaded/media_1793640936741_6fead306.mp4';
const destVideo = path.join(__dirname, 'uploaded_preview.mp4');
fs.copyFileSync(srcVideo, destVideo);

async function inspectVideo() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--window-size=600,800',
    'about:blank'
  ]);

  try {
    await new Promise(r => setTimeout(r, 1200));
    const targets = await new Promise((resolve, reject) => {
      http.get('http://localhost:9222/json', res => {
        let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d)));
      }).on('error', reject);
    });

    const pageTarget = targets.find(t => t.type === 'page');
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

    let id = 1;
    const callbacks = new Map();
    ws.onmessage = msg => {
      const data = JSON.parse(msg.data);
      if (data.id && callbacks.has(data.id)) {
        callbacks.get(data.id)(data);
        callbacks.delete(data.id);
      }
    };
    function send(m, p = {}) {
      return new Promise(r => {
        const reqId = id++; callbacks.set(reqId, r); ws.send(JSON.stringify({ id: reqId, method: m, params: p }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Page.navigate', { url: 'http://localhost:8080/scratch/uploaded_preview.mp4' });
    await new Promise(r => setTimeout(r, 1500));

    // Get video duration, width, height
    const meta = await send('Runtime.evaluate', {
      expression: `
        new Promise(resolve => {
          const v = document.querySelector('video');
          if (!v) return resolve({ error: 'no video' });
          resolve({
            duration: v.duration,
            videoWidth: v.videoWidth,
            videoHeight: v.videoHeight
          });
        })
      `,
      awaitPromise: true,
      returnByValue: true
    });
    console.log('Video Metadata:', meta.result.result.value);

    // Capture screenshot at 0.5s, 1.5s, 2.5s
    for (const time of [0.2, 1.0, 2.0, 3.0]) {
      await send('Runtime.evaluate', {
        expression: `
          new Promise(resolve => {
            const v = document.querySelector('video');
            v.currentTime = ${time};
            v.onseeked = () => resolve();
          })
        `,
        awaitPromise: true
      });
      await new Promise(r => setTimeout(r, 300));
      const ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`scratch/frame_${time}s.png`, Buffer.from(ss.result.data, 'base64'));
      console.log(`Saved frame_${time}s.png`);
    }

    ws.close();
  } finally {
    chrome.kill();
  }
}

inspectVideo().catch(console.error);
