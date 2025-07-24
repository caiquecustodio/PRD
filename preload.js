const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('WEBSOCKET_URL', 'ws://192.168.23.248:3030');

window.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('btnVoltar')) {
        const btn = document.createElement('button');
        btn.id = 'btnVoltar';
        btn.innerText = 'Voltar';
        btn.style.position = 'fixed';
        btn.style.top = '10px';
        btn.style.left = '10px';
        btn.style.zIndex = 9999;
        btn.style.padding = '8px 12px';
        btn.style.backgroundColor = '#d9534f';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.borderRadius = '5px';
        btn.style.cursor = 'pointer';
        btn.onclick = () => window.history.back();
        document.body.appendChild(btn);
    }
});
