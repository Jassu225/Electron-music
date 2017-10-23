// Changed settings from Settings Window
ipcRenderer.on('setting-change',(event,object)=>{
    $(`#${object.id}`).css(object.property, object.value);
    // console.log(object);
});

function restartPlayer(){
    ipcRenderer.send("restart-player");
}