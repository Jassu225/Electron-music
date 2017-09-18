var meta_extractor_caller_id;
var semaphore = 0;  // '0' IMPLIES FREE AND '1' IMPLIES BUSY
// SELECTION OF SONGS BY USING BUTTOND MAIN SECTION

document.getElementById('button-no-songs-add-folders').addEventListener("click",fetchSongsFromFolders);

document.getElementById('button-no-songs-add-songs').addEventListener("click",fetchSongs);

function fetchSongsFromFolders(){
    var path = dialog.showOpenDialog({
        properties: ['openDirectory', 'multiSelections']
    });
    // console.log(path.length);
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
    console.log(path);

    if(path){
        // FETCHING SONGS FROM THE SELECTED DIRECTORY / DIRECTORIES
        for(var i = 0; i < path.length; i++){
            var i1 = path[i].lastIndexOf('/');
            var i2 = path[i].lastIndexOf('\\');
            var index = i1 > i2 ? i1 : i2 ;
            // console.log(path[i].slice( 0, index ) );
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
        // console.log(fetched_songs_list[meta_extractor_caller_count]);
        if(fetched_songs_list.length == 0 && meta_extractor_caller_id){
            clearInterval(meta_extractor_caller_id);
            meta_extractor_caller_id = undefined;
            return;
        }
        
        // showAddingSongsPage();
        
        meta_extractor.extract_meta_data(fetched_songs_list.shift(), (song)=>{
            complete_list.push(song);
            // console.log(song);
            semaphore = 0;
        });
    }
}