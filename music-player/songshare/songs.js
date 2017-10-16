ipcRenderer.on('recv-song-info', (event, song) => {
    var i,j;
    for(i=0;i<num_of_songs;i++){
        if(Song[i].key == song.key){
            ipcRenderer.send('duplicate-song-entry-in-sharing-window');
            break;
        }
    }
    if(i==num_of_songs){
        for(j=0;j<num_of_songs;j++){
            if(Song[j].value.name == song.value.name){
                ipcRenderer.send('duplicate-song-entry-in-hard-disk');
                break;
            }
        }
        if(j == num_of_songs){
            Song.push(song);
            num_of_songs++;
            document.getElementById('sender').innerHTML += `<div class="song"><div class="song-wrapper">${song.value.name}</div><div class="signal"></div></div>`;
        }
    }
});