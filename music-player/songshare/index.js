/* REQUIRED MODULES */
const {remote} = require('electron');
const {dialog} = require('electron').remote;
const {ipcRenderer} = require('electron');
const http = require('http');
const fs = require('fs');

/* HTML ELEMENTS */
const header = document.getElementById("header");
const buttons_container = document.getElementById("buttons-container");
const sender_container = document.getElementById("sender-container");
const receiver_container = document.getElementById("receiver-container");
const footer = document.getElementById("footer");

/* HEADER LISTENERS */
document.getElementById("file-adder").addEventListener("click",()=>{
    fetchFiles();       // In file_fetcher.js
});
/* SENDER CONTAINER */
function removeFile(element){
    element.parentElement.parentElement.removeChild(element.parentElement);
}
/* BUTTONS CONTAINER LISTENERS */
document.getElementById("sender").addEventListener("click", ()=>{
    buttons_container.classList.add("hide");
    header.classList.remove("hide");
    sender_container.classList.remove("hide");
    footer.classList.remove("hide");
});
/* FOOTER */
document.getElementById("send-btn").addEventListener("click", ()=>{
    if( sender_container.childNodes.length > 0){
        header.classList.add("hide");
        sender_container.classList.add("hide");
        receiver_container.classList.add("hide");
        footer.classList.add("hide");
        document.getElementById("receivers-list").classList.remove("hide");
        scanAndConnectToWifi();       //  Defined in wifi.js
    } else
        alert("No files to send");
});
