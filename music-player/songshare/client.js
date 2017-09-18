//Client Implementation
var recvdSongsInfo = undefined;
// var totalSongs = 0;
var NumberOfReceivedSongs =0;
var io_client = require('socket.io-client');
var socket;
// socket.on('connect', function(){});
// socket.on('event', function(data){});
// socket.on('disconnect', function(){});

function createClient(){
    socket = io_client('http://' + ip + ':' + '1729');
    socket.once('song-info',songInformation);
    // var request = http.get({ host : ip, port : '1729',path:"/"}, (response)=>{
    //     console.log('server sent song info');
    //     var chunk = '';
    //     response.on('data',(data)=>{
    //         chunk += data;
    //     });
    //     response.on('end',()=>{
    //         recvdSongsInfo = JSON.parse(chunk);
    //         console.log(recvdSongsInfo);
    //         requestSong(0);
    //     });
    // });
}
function songInformation(song_info) {
        // console.log(song_info);
        recvdSongsInfo = song_info;
        console.log(recvdSongsInfo.length);
        for(var i=0;i<recvdSongsInfo.length;i++){
            document.getElementById('receiver').innerHTML += `<div class="song"><div class="song-wrapper">${recvdSongsInfo[i].value.name}</div><div class="signal"></div></div>`;
        }
        // console.log(recvdSongsInfo[1].value.name);
        requestSong(0);
        // socket.removeListener('song-info',songInformation);
}
var recvngSongIndex = 0;
function requestSong(i){
    console.log('requesting song');
    recvngSongIndex =i;
    socket.emit("getSong",{index : i} ,function(data) {
        signals[i].innerHTML = "Receiving";
        
    //   console.log(data);
    });
    socket.once('sending-song',writeSong);
}
function writeSong(data,fn){
        fn({msg : 'receiving song'});
        var buffer = new Buffer(data.base64buffer, 'base64');
        fs.writeFile(recvdSongsInfo[recvngSongIndex].value.name, buffer , (err) => {
                if (err) throw err;
                else{
                    console.log('yay!');
                    signals[recvngSongIndex].innerHTML = "Received";
                }
                NumberOfReceivedSongs++;
                if(NumberOfReceivedSongs == recvdSongsInfo.length){
                    socket.emit('close-server');
                } else if(NumberOfReceivedSongs != recvdSongsInfo.length){
                    // file_array = null;
                    // createClient();
                    // socket.removeListener('sending-song',writeSong(data,fn));
                    requestSong(recvngSongIndex+1);
                }
        });
}

   // var request = http.get({ host : ip, port : '1730',path:'/song'+i}, (response)=>{
    //     console.log('server sending song info');
    //     var chunk = '';
    //     response.on('data',(data)=>{
    //         chunk += data;
    //     });
    //     response.on('end',()=>{
    //         // console.log(chunk);
    //         var buffer = new Buffer(chunk, 'base64');
    //         // recvdSongsInfo = JSON.parse(chunk);
    //         // console.log(recvdSongsInfo);
    //         console.log(recvdSongsInfo[i].value.name);
    //         fs.writeFile(recvdSongsInfo[i].value.name, buffer , (err) => {
    //             if (err) throw err;
    //             else
    //                 console.log('yay!');
    //             NumberOfReceivedSongs++;
    //             if(NumberOfReceivedSongs == recvdSongsInfo.length){

    //             } else if(NumberOfReceivedSongs != recvdSongsInfo.length){
    //                 // file_array = null;
    //                 // createClient();
    //                 requestSong(i+1);
    //             }
    //         });
    //         // requestSong(0);
    //     });
    // });
// function createClient(){
//     var request = http.get({ host : ip, port : '1729',path:"/"}, (response)=>{
//         console.log('server sent song info');
//         var chunk = '';
//         response.on('data',(data)=>{
//             chunk += data;
//         });
//         response.on('end',()=>{
//             recvdSongsInfo = JSON.parse(chunk);
//             console.log(recvdSongsInfo);
//             requestSong(0);
//         });
//     });
// }
// function requestSong(i){
//     console.log('requesting song');
//     var request = http.get({ host : ip, port : '1730',path:'/song'+i}, (response)=>{
//         console.log('server sending song info');
//         var chunk = '';
//         response.on('data',(data)=>{
//             chunk += data;
//         });
//         response.on('end',()=>{
//             // console.log(chunk);
//             var buffer = new Buffer(chunk, 'base64');
//             // recvdSongsInfo = JSON.parse(chunk);
//             // console.log(recvdSongsInfo);
//             console.log(recvdSongsInfo[i].value.name);
//             fs.writeFile(recvdSongsInfo[i].value.name, buffer , (err) => {
//                 if (err) throw err;
//                 else
//                     console.log('yay!');
//                 NumberOfReceivedSongs++;
//                 if(NumberOfReceivedSongs == recvdSongsInfo.length){

//                 } else if(NumberOfReceivedSongs != recvdSongsInfo.length){
//                     // file_array = null;
//                     // createClient();
//                     requestSong(i+1);
//                 }
//             });
//             // requestSong(0);
//         });
//     });
// }