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

