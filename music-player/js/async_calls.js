// Changed settings from Settings Window
ipcRenderer.on('setting-preview', (event,object)=>{
    switch(object.category){
        case "top-navbar": switch(object.property){
            case "text-color":  previewTextColor($("div#top-nav-menu"),object.value);break;
        };break;
    };
});
ipcRenderer.on('setting-change',(event,object)=>{
    switch(object.category){
        case "top-navbar": switch(object.property){
            case "text-color":  $("div#top-nav-menu").css("color",object.value);break;
        };break;
    };
});
function previewTextColor(element,value){
    var previous_value = element.css("color");
    console.log(previous_value);
    element.css("color",value);
    setTimeout( ()=>{ element.css("color", previous_value); }, 3000);
}