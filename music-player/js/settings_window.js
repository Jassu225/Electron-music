let settingsWindow = null;   // For createing and maintaining song-share window
console.log(__dirname);
function openSettingsWindow() {
    if (settingsWindow === null) {
        settingsWindow = new BrowserWindow({
            width: 600,
            height: 450,
            frame: true,
            titleBarStyle: 'default',
            resizable: true,
            show: true
        });

        settingsWindow.loadURL(url.format({
            pathname: `${__dirname}/settings.html`,
            protocol: 'file:',
            slashes: true
        }));

        settingsWindow.webContents.openDevTools();
        //settingsWindow.setMenu(null);

        // Emitted when the window is closed.
        settingsWindow.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            settingsWindow = null;
        });
    } else
        settingsWindow.focus();
}