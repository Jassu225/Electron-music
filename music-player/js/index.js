const {remote} = require('electron');
const {dialog} = require('electron').remote;    //first usage in directory_selector.js
const {BrowserWindow} = require('electron').remote;
const fs = require('fs');               //first usage in directory_selector.js

// Used to fetch songs from directories
// Takes directory as input
const song_fetcher = require('./../modules/songs_fetcher.js');  // first usage in directory_selector.js
const meta_extractor = require('./../modules/songs_meta_data_extractor.js');
var fetched_songs_list = [];
// MAIN SONGS LIST
// CONTAINS META-DATA OF ALL SONGS
var complete_list = [];