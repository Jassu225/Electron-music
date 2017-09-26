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
    capacity: 0,                //max. no. of documents that can be fitted on view port
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
var albums_list = [];
var artists_list = [];

// Audio player variables
var audio_player = document.getElementById("audio-player");

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
        var albums = $('.album');
        console.log(albums[0].childNodes[1].childNodes[1].childNodes[1]);
        for(var i = 0; i < albums_list.length && i < 28; i++){
            // console.log(albums_list[i].cover);
            try{
                var dimensions = sizeOf(albums_list[i].cover);
                // console.log(dimensions);
                if(dimensions.width >= dimensions.height){
                    albums[i].childNodes[1].childNodes[1].childNodes[1].classList.add("width-120");
                    // albums[i].childNodes[1].childNodes[1].childNodes[1].classList.add("full-width");
                } else{
                    albums[i].childNodes[1].childNodes[1].childNodes[1].classList.add("height-160");
                    // albums[i].childNodes[1].childNodes[1].childNodes[1].classList.add("full-height");
                }
            } catch(err){
                console.log(err.code);
            }
            albums[i].childNodes[1].childNodes[1].childNodes[1].src = albums_list[i].cover;      //Image
            albums[i].childNodes[3].childNodes[1].innerHTML = albums_list[i]._id;
            albums[i].classList.remove("hide");
        }
    }
});
artistsDB.find({}, (err,docs)=>{
    if(docs){
        artists_list = Array.from(docs);
    }
});

window.addEventListener('resize',setContainersSize);

function setContainersSizeAfter520ms(){
    setTimeout(setContainersSize, 520);
}
// Changing size of image containers
function setContainersSize(){
    var width = $("div#songs-container").width();

    if(width <= 700){

        if(!$('div.album').hasClass("col-4")){
            removeColClasses($('div.album'));
            $('div.album').addClass('col-4');
        }

    } else if( width <= 800){

        if(!$('div.album').hasClass("col-3")){
            removeColClasses($('div.album'));
            $('div.album').addClass("col-3");
        }
        view_port.capacity = 12;

    } else if( width <= 1000){

        if(!$('div.album').hasClass("col-2_4")){
            removeColClasses($('div.album'));
            $('div.album').addClass("col-2_4");
        }
        view_port.capacity = 15;

    } else if( width <= 1200){

        if(!$('div.album').hasClass("col-2")){
            removeColClasses($('div.album'));
            $('div.album').addClass("col-2");
        }
        view_port.capacity = 18;

    } else if(width > 1200){

        if(!$('div.album').hasClass("col-1_7")){
            removeColClasses($('div.album'));
            $('div.album').addClass("col-1_7");
        }
        view_port.capacity = 21;

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