const url = require('url');
const path = require('path');
const electron = require('electron');
const { app, BrowserWindow, ipcMain } = require('electron');
const initPython = require('./python');

let mainWindow

function createWindow () {

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
    });

    mainWindow = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        },
    });

    mainWindow.webContents.openDevTools()

    initPython(mainWindow);
    mainWindow.loadURL(startUrl);

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});


