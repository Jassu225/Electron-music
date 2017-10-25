
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
playlistsDB.find({}, (err,docs)=>{
    if(err)
        console.log(err);
    else if(docs){
        savedPlaylists = Array.from(docs);
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