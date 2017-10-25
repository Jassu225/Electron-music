//Required modules
const { app, BrowserWindow, ipcMain, webContents} = require('electron');
const url = require('url');
const fs = require('fs');
const mm = require('musicmetadata');
const destroy = require('destroy');
const environment = require("./modules/environment.js");

//Variables 
const app_data_folder = app.getPath('userData');
//Creating required directories if not exists
fs.stat(`${app_data_folder}/UserData/db`,(err,stats)=>{
    if(err && err.code == "ENOENT"){
        environment.mkdir(`${app_data_folder}/UserData/db`, (output,err)=>{
            if(err)
                console.log(err);
            else
                console.log("directory successfully created");
        });
    } else
        console.log(stats);
});
fs.stat(`${app_data_folder}/UserData/song-images`,(err,stats)=>{
    if(err && err.code == "ENOENT"){
        environment.mkdir(`${app_data_folder}/UserData/song-images`, (output,err)=>{
            if(err)
                console.log(err);
            else
                console.log("directory successfully created");
        });
    } else
        console.log(stats);
});
// fs.stat(`${app_data_folder}/UserData/playlists`,(err,stats)=>{
//     if(err && err.code == "ENOENT"){
//         environment.mkdir(`${app_data_folder}/UserData/playlists`, (output,err)=>{
//             if(err)
//                 console.log(err);
//             else
//                 console.log("directory successfully created");
//         });
//     } else
//         console.log(stats);
// });
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

    main_window.once('ready-to-show', () => {
        // main_window.show();
    });
    // Emitted when the window is closed.
    main_window.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        main_window = null;
    });
}

// Asynchronous call listeners
ipcMain.on('message-from-settings-window',(event,protocol,object) => {
    main_window.webContents.send(protocol,object);
});
ipcMain.on('restart-player',(event) => {
    app.relaunch();
    app.exit();
});