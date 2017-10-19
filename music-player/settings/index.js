var {ipcRenderer} = require('electron');
const {remote} = require('electron');
const {BrowserWindow} = require('electron').remote;

//  CHANGING MUSIC PLAYER WINDOW BORDER COLOR
function changeWindowBorderColor(bordercolor){
    ipcRenderer.send('message-from-settings-window','change-window-border',bordercolor);
    // console.log('color sent');
}
function linearGradient(colorpercent){
    ipcRenderer.send('message-from-settings-window','change-window-border-gradient',bordercolor);
}
function showItem(category,itemid){
    var item = document.getElementById(itemid);
    
    if(item.style.display == 'block'){
        item.style.display = 'none';
        category.childNodes[0].childNodes[0].style.transform = "rotateZ(0deg)";
    }
    else{
        item.style.display = 'block';
        category.childNodes[0].childNodes[0].style.transform = "rotateZ(45deg)";
    }
}