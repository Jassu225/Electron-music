const {remote} = require('electron');
const {app,dialog} = require('electron').remote;    //first usage in directory_selector.js
const {BrowserWindow} = require('electron').remote;
const fs = require('fs');               //first usage in directory_selector.js
const database = require('nedb');

// Used to fetch songs from directories
// Takes directory as input
const song_fetcher = require('./../modules/songs_fetcher.js');  // first usage in directory_selector.js
const meta_extractor = require('./../modules/songs_meta_data_extractor.js');
var fetched_songs_list = [];
// MAIN SONGS LIST
// CONTAINS META-DATA OF ALL SONGS
var complete_list = [];

// Top navigation bar hight
var top_nav_height = "45px";
// Variable which contains object of currently visible "MAIN SECTION" element 
var active_main_section_division = document.getElementById("songs-container");
var appdata = app.getPath("userData");
var songsDB = new database({
    filename: `${appdata}/UserData/db/songs.db`,
    autoload: true
});

songsDB.count({}, function (err, count) {
    // count equals to 4
    if(count == 0)
        document.getElementById("no-songs").classList.remove("hide");
});

window.addEventListener('resize',setContainersSize);

// Changing size of image containers
function setContainersSize(){
    var width = $("div#songs-container").width();

    if( width <= 800 && !$('div.album').hasClass("col-3")){
        removeColClasses($('div.album'));
        $('div.album').addClass("col-3");
    } else if( width > 800 && width <= 1000 && !$('div.album').hasClass("col-2_4")){
        removeColClasses($('div.album'));
        $('div.album').addClass("col-2_4");
    } else if( width > 1000 && width <= 1030 && !$('div.album').hasClass("col-2")){
        removeColClasses($('div.album'));
        $('div.album').addClass("col-2");
    } else if(width > 1030 && !$('div.album').hasClass("col-1_7")){
        removeColClasses($('div.album'));
        $('div.album').addClass("col-1_7");
    }
}

function removeColClasses(element){
    var col_classes = "col-1_7 col-2 col-2_4 col-3 col-4";
    element.removeClass(col_classes);
}

setContainersSize();
// Settings for "image" class
// Makes height 100% if height > width
// Makes width 100% otherwise