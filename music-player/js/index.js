const {remote} = require('electron');
const {app,dialog} = require('electron').remote;    //first usage in directory_selector.js
const {BrowserWindow} = require('electron').remote;
const fs = require('fs');               //first usage in directory_selector.js
const database = require('nedb');
// const sizeOf = require('image-size');
const appdata = app.getPath("userData");
const url = require('url');
// const {exec} = require('child_process');

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

// ARTIST LIST VARIABLES
var artists_list = [];
var index_artist = 0;

// HTML ELEMENTS
var audio_player = document.getElementById("audio-player");
var play_pause = $("div#play_pause");
var albums_container = document.getElementById("albums-container");
var albums_inner_container = document.getElementById("albums-inner-container");
var albums;
var selected_album_cover = document.getElementById("selected-album-cover");
var albums_page = document.getElementById("album-page");
var songs_in_album_page = document.getElementById("songs-in-album-container");

var artists_container = document.getElementById("artists-container");
var artists_inner_container = document.getElementById("artists-inner-container");
var artists;
var selected_artist_cover = document.getElementById("selected-artist-cover");
var artists_page = document.getElementById("artist-page");
var songs_in_artist_page = document.getElementById("songs-in-artist-container");

//Required databases for songs, albums and artists
var songsDB = new database({ filename: `${appdata}/UserData/db/songs.db`, autoload: true });
var albumsDB = new database({ filename: `${appdata}/UserData/db/albums.db`, autoload: true });
var artistsDB = new database({ filename: `${appdata}/UserData/db/artists.db`, autoload: true });

songsDB.count({}, function (err, count) {
    if(count == 0){
        document.getElementById("no-songs").classList.remove("hide");
        document.getElementById("inner-songs-container").classList.add("hide");
    }
});
// Fetching data from database and storing in respective arrays
songsDB.find({}, (err,docs)=>{
    if(docs)
        complete_list = Array.from(docs);
});
albumsDB.find({}, (err,docs)=>{
    if(docs){       //Fetching data operation is slower than addAlbumContainers() operation
        albums_list = Array.from(docs);
        updateAlbumsUI();
    }
});
artistsDB.find({}, (err,docs)=>{
    if(docs){
        artists_list = Array.from(docs);
        updateArtistsUI();
    }
});

// Adding elements to songs inner container
addAlbumContainers();
addArtistContainers();

function addAlbumContainers(){
    var album;
    for(var i = 0; i < 42; i++){
        album = "";
        if( i % 2 == 0)
            album = `<div class="album inline center-text position-absolute hide" style="transform:translate3d(${i*120}px,0px,0px);" album=""><div class="table full-width full-height"><div class="full-width table-cell vertically-middle"><div class="image-container table center background-black"><div class="table-cell vertically-middle center"><img class="image" src="" data-src=""/></div></div><div class="album-description table full-width height-40"><p class="width-200 line-height-40 no-margin white-space-nowrap overflow-hidden text-overflow-ellipsis"></p></div></div></div></div>`;
        else
            album = `<div class="album inline center-text position-absolute hide" style="transform:translate3d(${(i-1)*120}px,100%,0px);" album=""><div class="table full-width full-height"><div class="full-width table-cell vertically-middle"><div class="image-container table center background-black"><div class="table-cell vertically-middle center"><img class="image" src="" data-src=""/></div></div><div class="album-description table full-width height-40"><p class="width-200 line-height-40 no-margin white-space-nowrap overflow-hidden text-overflow-ellipsis"></p></div></div></div></div>`;
        albums_inner_container.innerHTML += album;
    }
    albums = document.getElementsByClassName("album");
    addAlbumListeners();
}

function updateAlbumsUI(){
    albums_inner_container.style.width = `${Math.ceil( albums_list.length / 2 ) * 240}px`;
    console.log(albums[0]);
    for(var i = 0; i < albums_list.length && i < 42; i++){
        albums[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].src = albums_list[i].cover;      //Image
        albums[i].childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerHTML = albums_list[i]._id;
        albums[i].classList.remove("hide");
    }
    index_album = i;
}

function addArtistContainers(){
    var artist;
    for(var i = 0; i < 42; i++){
        artist = "";
        if( i % 2 == 0)
            artist = `<div class="artist inline center-text position-absolute hide" style="transform:translate3d(${i*120}px,0px,0px);" artist=""><div class="table full-width full-height"><div class="table-cell vertically-middle"><div class="image-container table center background-black"><div class="table-cell vertically-middle center"><div class="image center"><div id="artist-head"></div><div id="artist-body"></div></div></div></div><div class="artist-description table full-width height-40"><p class="width-200 no-margin line-height-40 white-space-nowrap overflow-hidden text-overflow-ellipsis"></p></div></div></div></div>`;
        else
            artist = `<div class="artist inline center-text position-absolute hide" style="transform:translate3d(${(i-1)*120}px,100%,0px);" artist=""><div class="table full-width full-height"><div class="table-cell vertically-middle"><div class="image-container table center background-black"><div class="table-cell vertically-middle center"><div class="image center"><div id="artist-head"></div><div id="artist-body"></div></div></div></div><div class="artist-description table full-width height-40"><p class="width-200 no-marginline-height-40 white-space-nowrap overflow-hidden text-overflow-ellipsis"></p></div></div></div></div>`;
        artists_inner_container.innerHTML += artist;
    }
    artists = document.getElementsByClassName("artist");
    addArtistListeners();
}

function updateArtistsUI(){
    artists_inner_container.style.width = `${Math.ceil( artists_list.length / 2 ) * 240}px`;
    console.log(artists[0]);
    for(var i = 0; i < artists_list.length && i < 42; i++){
        // artists[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].src = "./images/human.png";      //Image
        artists[i].childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerHTML = artists_list[i]._id;
        artists[i].classList.remove("hide");
    }
    index_artist = i;
}