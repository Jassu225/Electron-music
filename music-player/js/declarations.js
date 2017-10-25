const {ipcRenderer,remote} = require('electron');
const {app,dialog} = require('electron').remote;    //first usage in directory_selector.js
const {BrowserWindow} = require('electron').remote;
const fs = require('fs');               //first usage in directory_selector.js
const database = require('nedb');
const appdata = app.getPath("userData");
const url = require('url');

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

//Required databases for songs, albums, artists and playlists
var songsDB = new database({ filename: `${appdata}/UserData/db/songs.db`, autoload: true });
var albumsDB = new database({ filename: `${appdata}/UserData/db/albums.db`, autoload: true });
var artistsDB = new database({ filename: `${appdata}/UserData/db/artists.db`, autoload: true });
var playlistsDB = new database({ filename: `${appdata}/UserDataa/db/playlists.db`, autoload: true });

// Playlist variables
var temporaryPlaylist = new PlayList([],"temporary");
var activePlaylist = temporaryPlaylist;
var intermediatePlaylist = new PlayList([],"intermediate");
var savedPlaylists = [];    //FOr storing playlists fetched from database

//PLAYER VARIABLES
var volume = audio_player.volume;