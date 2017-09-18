var songList = [];
var handler = {

    freeSpace: function(){
        songList = [];
    },

    fetchSongsFromDirectories: function (dirList,callback) {

        for(var k = 0; k < dirList.length; k++){

            var files = fs.readdirSync(dirList[k]);

            for (var i = 0; i < files.length; i++) {
                var song_path = `${dirList[k]}/${files[i]}`;
                console.log(song_path);
                var stats = fs.statSync(song_path);
            
                if( stats.isDirectory() ){
                    dirList.push(song_path);
                } else if(stats.isFile() && song_path.substr(-4) ==='.mp3'){
                    var song = { 
                        src:song_path,
                        size_byte:Number(stats['size']),
                        name : files[i],
                        location: dirList[k],
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
                    songList.push(song);
                }
            }
            console.log(`Total songs found: ${songList.length}`);
        }
        console.log('\nlast\n\n');
        callback(songList);
    }
}

module.exports = handler;