const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let splashWindow;
let isQuitting = false;

const URL_PRD = 'http://192.168.23.248:3030/';

function createSplash() {
    splashWindow = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        resizable: false,
        show: true,
        center: true
    });

    splashWindow.loadFile(path.join(__dirname, 'splash.html'));
}

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        resizable: false,
        fullscreenable: false,
        show: false,
        title: 'PRD - Programa de Requisição Digital',
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: false,
            allowRunningInsecureContent: true
        }
    });

    mainWindow.loadURL(URL_PRD);
    mainWindow.setMenuBarVisibility(false);

    mainWindow.webContents.on('did-finish-load', () => {
        if (splashWindow && !splashWindow.isDestroyed()) {
            splashWindow.close();
            splashWindow = null;
        }
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.show();
            mainWindow.focus();  // Corrige o problema de foco e digitação
        }
    });

    mainWindow.on('close', (e) => {
        if (!isQuitting) {
            e.preventDefault();
            mainWindow.hide();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createSplash();
    createMainWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});

function sairDoApp() {
    isQuitting = true;
    app.quit();
}

module.exports = { sairDoApp };
