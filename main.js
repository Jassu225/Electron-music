//Required modules
const { app, BrowserWindow, ipcMain, webContents} = require('electron');
const url = require('url');
const fs = require('fs');
const mm = require('musicmetadata');
const destroy = require('destroy');

//Variables 
const app_data_folder = app.getPath('userData');
let main_window;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// 

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin')
    app.quit();
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
  if (main_window === null)
    createWindow();
});

app.on('ready',createWindow);

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function createWindow(){
    // Initializing window with some properties
    main_window = new BrowserWindow({
        width: 800,
        height: 620,
        minWidth: 800,
        minHeight: 620,
        titleBarStyle: 'hidden',
        frame: true,
        transparent: false
    });

    // Hiding default menu bar
    main_window.setMenu(null);

    //Loading window with a page
    main_window.loadURL(url.format({
        pathname: `${__dirname}/music-player/index.html`,
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    main_window.webContents.openDevTools();

    // Emitted when the window is closed.
    main_window.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        main_window = null;
    });
}

// Asynchronous call lsteners
ipcMain.on('message-from-settings-window',(event,protocol,propertyValue) => {
    win.webContents.send(protocol, propertyValue);
});