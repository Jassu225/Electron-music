const {remote} = require('electron');
const {app,dialog} = require('electron').remote;    //first usage in directory_selector.js
const {BrowserWindow} = require('electron').remote;
const fs = require('fs');               //first usage in directory_selector.js
const database = require('nedb');
const sizeOf = require('image-size');
const appdata = app.getPath("userData");

//All changeable properties of view port
var view_port = {
    has_data: false,
    top_nav_height: "45px",  // Top navigation bar hight
    next_song: 0,             //Index of song to be loaded next
    next_album: 0,             //Index of song to be loaded next
    next_artist: 0,             //Index of song to be loaded next
    row_capacity: 4,                //no. of documents that can be fitted in a row
    active_main_section_division: document.getElementById("songs-container")     // Variable which contains object of currently visible "MAIN SECTION" element
};
// Used to fetch songs from directories
// Takes directory as input
const song_fetcher = require('./../modules/songs_fetcher.js');  // first usage in directory_selector.js
const meta_extractor = require('./../modules/songs_meta_data_extractor.js');

var fetched_songs_list = [];

// MAIN SONGS LIST
// CONTAINS META-DATA OF ALL SONGS
var complete_list = [];

// ALBUM LIST VARIABLES
var albums_list = [];
var index_album = 0;        // SPECIFIES NUMBER OF ALBUMS ADDED TO ALBUMS INNER CONTAINER

var artists_list = [];

// HTML ELEMENTS
var audio_player = document.getElementById("audio-player");
var play_pause = $("div#play_pause");
var albums_container = document.getElementById("albums-container");
var albums_inner_container = document.getElementById("albums-inner-container");
var albums = $('div.album');

//Required databases for songs, albums and artists
var songsDB = new database({
    filename: `${appdata}/UserData/db/songs.db`,
    autoload: true
});
var albumsDB = new database({
    filename: `${appdata}/UserData/db/albums.db`,
    autoload: true
});
var artistsDB = new database({
    filename: `${appdata}/UserData/db/artists.db`,
    autoload: true
});

songsDB.count({}, function (err, count) {
    // count equals to 4
    if(count == 0){
        document.getElementById("no-songs").classList.remove("hide");
        document.getElementById("inner-songs-container").classList.add("hide");
    }
});

// Fetching data from database and storing in respective arrays
songsDB.find({}, (err,docs)=>{
    if(docs){
        complete_list = Array.from(docs);
    }
});
albumsDB.find({}, (err,docs)=>{
    if(docs){
        albums_list = Array.from(docs);
        albums_inner_container.style.width = `${Math.ceil( albums_list.length / 2 ) * 200}px`;
        console.log(albums[0].childNodes[1].childNodes[1].childNodes[1]);
        for(var i = 0; i < albums_list.length && i < 42; i++){
            // console.log(albums_list[i].cover);
            // try{
            //     var dimensions = sizeOf(albums_list[i].cover);
            //     // console.log(dimensions);
            //     if(dimensions.width >= dimensions.height){
            //         albums[i].childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].classList.add("width-120");
            //         // albums[i].childNodes[1].childNodes[1].childNodes[1].classList.add("full-width");
            //     } else{
            //         albums[i].childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].classList.add("height-160");
            //         // albums[i].childNodes[1].childNodes[1].childNodes[1].classList.add("full-height");
            //     }
            // } catch(err){
            //     console.log(err.code);
            // }
            albums[i].childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].src = albums_list[i].cover;      //Image
            albums[i].childNodes[1].childNodes[1].childNodes[3].childNodes[1].innerHTML = albums_list[i]._id;
            albums[i].classList.remove("hide");
        }
        index_album = i;
    }
});
artistsDB.find({}, (err,docs)=>{
    if(docs){
        artists_list = Array.from(docs);
    }
});

// Settings for "image" class
// Makes height 100% if height > width
// Makes width 100% otherwise