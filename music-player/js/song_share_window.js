let songSharingWindow = null;   // For createing and maintaining song-share window
console.log(__dirname);
function openSongSharingWindow() {
    if (songSharingWindow === null) {
        songSharingWindow = new BrowserWindow({
            width: 600,
            height: 450,
            frame: true,
            titleBarStyle: 'default',
            resizable: true,
            show: true
        });

        songSharingWindow.loadURL(url.format({
            pathname: `${__dirname}/songshare/index.html`,
            protocol: 'file:',
            slashes: true
        }));

        songSharingWindow.webContents.openDevTools();
        //settingsWindow.setMenu(null);

        // Emitted when the window is closed.
        songSharingWindow.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            songSharingWindow = null;
        });
    } else
        songSharingWindow.focus();
}