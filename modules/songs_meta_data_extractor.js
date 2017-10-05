const mm = require('musicmetadata');
const fs = require('fs');
const env = require('./environment.js');
const {remote} = require('electron');
const {app} = require('electron').remote;
const appdata = app.getPath('userData');
var metadata_extractor = {

    extract_meta_data: function (song,callback){

        var stream = fs.createReadStream(song['src']);
        var parser = mm(stream, function (err, metadata) {
            if (err){
                console.log('error in extracting meta-data');
                song['title'] = 'unknown';
                song['artist'] = 'unknown';
                song['album'] = 'unknown';
                song['year'] = 'unknown';
                song['track'] = 'unknown';
                song['genre'] = 'unknown';
                song['duration'] = 'unknown';
            } else {
                song['title'] = metadata['title'];
                song['artist'] = metadata['artist'].toString();
                song['album'] = metadata['album'];
                song['year'] = Number(metadata['year']);
                song['track'] = metadata['track'];
                song['genre'] = metadata['genre'].toString();
                song['duration'] = Number(metadata['duration']);
            }
            if (metadata.picture[0]) {    // If cover in id3 tag
                var drive = env.getDriveLetter(song['location']);
                var location_without_drive = song['location'].substring(3);
                var file_no_extension = song['name'].substring(0,song['name'].lastIndexOf('.'));
                var img_path = `${appdata}/UserData/song-images/${drive}/${location_without_drive}/${file_no_extension}.${metadata.picture[0].format}`;
                fs.writeFile(img_path,metadata.picture[0].data,(err)=>{
                    if(err && err.code == 'ENOENT'){
                        console.log(err);
                        env.mkdir(`${appdata}/UserData/song-images/${drive}/${location_without_drive}`,(output,err)=>{
                            if(err){
                                console.log(err);
                                return;
                            }
                            fs.writeFile(img_path,metadata.picture[0].data,(err)=>{
                                if(err)
                                    console.log(err);
                            });
                        });
                    }
                });
                song['cover'] = img_path;
                song['coverformat'] = metadata.picture[0].format;
                
            } else {
                song['cover'] = './images/song.png';
            }
        });
        
        stream.on('end', ()=>{
            stream.destroy();
        });
        
        stream.on('close',()=>{
            callback(song);
        });

        stream.on('error', ()=>{
            callback(null);
        });
    }
}
module.exports = metadata_extractor;