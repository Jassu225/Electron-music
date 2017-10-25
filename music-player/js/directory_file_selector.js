var meta_extractor_caller_id;
var semaphore = 0;  // '0' IMPLIES FREE AND '1' IMPLIES BUSY
// SELECTION OF SONGS BY USING BUTTOND MAIN SECTION

document.getElementById('button-no-songs-add-folders').addEventListener("click",fetchSongsFromFolders);

document.getElementById('button-no-songs-add-songs').addEventListener("click",fetchSongs);

function fetchSongsFromFolders(){
    var path = dialog.showOpenDialog({
        properties: ['openDirectory', 'multiSelections']
    });
    if(path){
        // FETCHING SONGS FROM THE SELECTED DIRECTORY / DIRECTORIES
        song_fetcher.fetchSongsFromDirectories(path, (songs)=>{
            fetched_songs_list.push.apply(fetched_songs_list,songs);
            song_fetcher.freeSpace();
            // EXTRACTING META-DATA FROM FETCHED SONGS
            semaphore = 0;
            meta_extractor_caller_id = setInterval(call_meta_extractor, 25);
        });
    }
}

function fetchSongs(){
    var path = dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections']
    });
    // console.log(path);

    if(path){
        // FETCHING SONGS FROM THE SELECTED DIRECTORY / DIRECTORIES
        for(var i = 0; i < path.length; i++){
            path[i] = path[i].replace(/\\/g, '/');
            var index = path[i].lastIndexOf('/');
            var stats = fs.statSync(path[i]);
            var song = {
                src: path[i],
                size_byte: Number(stats['size']),
                name : path[i].slice(-1 * (path[i].length - index - 1)),
                location: path[i].slice( 0, index ),
                title : undefined,
                artist : undefined,
                album : undefined,
                year : undefined,
                track : undefined,
                genre : undefined,
                duration : undefined,
                cover : undefined,
                coverformat : undefined
            };
            fetched_songs_list.push(song);
        }
        // EXTRACTING META-DATA FROM FETCHED SONGS
        semaphore = 0;
        meta_extractor_caller_id = setInterval(call_meta_extractor, 25);
    }
}

// META-EXTRACTOR CALLER FUNCTION
function call_meta_extractor(){
    if(semaphore == 0){
        semaphore = 1;
        if(fetched_songs_list.length == 0 && meta_extractor_caller_id){
            clearInterval(meta_extractor_caller_id);
            meta_extractor_caller_id = undefined;
            document.getElementById('show-adding-songs').innerHTML = '<span onclick="restartPlayer()" style="border-bottom: 2px solid white;cursor: pointer;">Restart</span> the player for new songs to appear in list';
            return;
        }
        
        meta_extractor.extract_meta_data(fetched_songs_list.shift(), (song)=>{
            if(song){
                complete_list.push(song);
                song._id = song.src;
                var element = document.getElementById('show-adding-songs');
                element.classList.remove("font-size-30");
                element.innerHTML = `Adding ${song.src}`;
                insertIntoSongsDB(song);
                insertIntoAlbumsDB(song.album,song.src,song.cover);
                insertIntoArtistsDB(song.artist,song.src);
            }
            semaphore = 0;
        });
    }
}

function insertIntoSongsDB(song){
    songsDB.insert(song, (err,newDoc)=>{
        if(err)
            console.log(err);
        else{
            view_port.has_data = true;
        }
    });
}

function insertIntoAlbumsDB(album,path,cover){
    albumsDB.findOne({_id: album},(err,doc)=>{
        if(err)
            console.log(err);
        else if(doc){
            albumsDB.update({ _id: album }, { $push: { songs: path } }, {}, ()=>{

            });
        } else{
            albumsDB.insert({
                _id: album,
                cover: cover,
                songs: [path]
            },(err,newDoc)=>{
                if(err)
                    console.log(err);
                else{
                    console.log('album created successfully');
                }
            });
        }
    });
}

function insertIntoArtistsDB(artist,path){
    artistsDB.findOne({_id: artist},(err,doc)=>{
        if(err)
            console.log(err);
        else if(doc){
            artistsDB.update({ _id: artist }, { $push: { songs: path } }, {}, ()=>{
                
            });
        } else{
            artistsDB.insert({
                _id: artist,
                songs: [path]
            },(err,newDoc)=>{
                if(err)
                    console.log(err);
                else{
                    console.log('artist created successfully');
                }
            });
        }
    });
}