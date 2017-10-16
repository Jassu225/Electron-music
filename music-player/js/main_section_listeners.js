
// Adding Listener to "album" class in albums-container in main-section
function addAlbumListeners(){
    $("div.album").click((event)=>{
        // $("div#albums-container").removeClass("active-main-page");
        albums_container.classList.remove("active-main-page");
        // $("div#album-page").addClass("active-main-page");
        albums_page.classList.add("active-main-page");
        albumsDB.findOne({ _id: event.currentTarget.childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerHTML }, (err,doc)=>{
            if(doc){
                selected_album_cover.src = event.currentTarget.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].src;
                var parent = document.getElementById("songs-in-album-container");
                var children = "";
                for(var i = 0; i < doc.songs.length; i++){
                    var i1 = doc.songs[i].lastIndexOf('/');
                    var i2 = doc.songs[i].lastIndexOf('\\');
                    var index = i1 > i2 ? i1 : i2 ;
                    children += `<div class="songs-in-album padding-10 cursor-pointer" src="${doc.songs[i]}">${doc.songs[i].substring(index+1)}</div>`;
                }
                parent.innerHTML = children;
                children = null;
                addListenersToSongsInAlbum();
            }
            if(err)
                console.log(err);
        });
    });
}

// Adding Listeners to "artist" class in artists-container in main-section
function addArtistListeners(){
    $("div.artist").click((event)=>{
        // $("div#artists-container").removeClass("active-main-page");
        artists_container.classList.remove("active-main-page");
        // $("div#artist-page").addClass("active-main-page");
        artists_page.classList.add("active-main-page")
        artistsDB.findOne({ _id: event.currentTarget.childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerHTML }, (err,doc)=>{
            if(doc){
                // selected_artist_cover.src = event.currentTarget.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].src;
                var parent = document.getElementById("songs-in-artist-container");
                var children = "";
                for(var i = 0; i < doc.songs.length; i++){
                    var i1 = doc.songs[i].lastIndexOf('/');
                    var i2 = doc.songs[i].lastIndexOf('\\');
                    var index = i1 > i2 ? i1 : i2 ;
                    children += `<div class="songs-in-artist padding-10 cursor-pointer" src="${doc.songs[i]}">${doc.songs[i].substring(index+1)}</div>`;
                }
                parent.innerHTML = children;
                children = null;
                addListenersToSongsInArtist();
            }
            if(err)
                console.log(err);
        });
    });
}

// Inner songs container listeners
// Album page listeners
$("div#backToAlbum").click(()=>{
    $("div#album-page").removeClass("active-main-page");
    $("div#albums-container").addClass("active-main-page");
    songs_in_album_page.innerHTML = "";
});
function addListenersToSongsInAlbum(){
    $("div.songs-in-album").click( event=>{
        console.log(event.currentTarget.getAttribute("src"));
        audio_player.childNodes[0].src = event.currentTarget.getAttribute("src");
        playSong();
    });
}
// Artist page listeners
$("div#backToArtist").click(()=>{
    $("div#artist-page").removeClass("active-main-page");
    $("div#artists-container").addClass("active-main-page");
    songs_in_artist_page.innerHTML = "";
});
function addListenersToSongsInArtist(){
    $("div.songs-in-artist").click( event=>{
        console.log(event.currentTarget.getAttribute("src"));
        audio_player.childNodes[0].src = event.currentTarget.getAttribute("src");
        playSong();
    });
}


