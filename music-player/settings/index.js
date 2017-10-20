var {ipcRenderer} = require('electron');
const {remote} = require('electron');
const {BrowserWindow} = require('electron').remote;

// Asynchronous calls to main-process i.e. main.js
function settingPreview(category,property,value){
    var object = {
        category: category,
        property: property,
        value: value
    };
    ipcRenderer.send('message-from-settings-window','setting-preview',object);
}

function changeSetting(category,property,value){
    var object = {
        category: category,
        property: property,
        value: value
    };
    ipcRenderer.send('message-from-settings-window','setting-change',object);
}