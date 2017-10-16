/* REQUIRED MODULES */
const {ipcRenderer} = require('electron');
const http = require('http');
const fs = require('fs');

/* HTML ELEMENTS */
const buttons_container = document.getElementById("buttons-container");
const sender_container = document.getElementById("sender-container");
const footer = document.getElementById("footer");

/* BUTTONS CONTAINER LISTENERS */
document.getElementById("sender").addEventListener("click", ()=>{
    buttons_container.classList.add("hide");
    sender_container.classList.remove("hide");
    footer.classList.remove("hide");
});
