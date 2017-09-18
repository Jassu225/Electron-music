//Server Implmentation
var http = require('http');
var url = require('url');
var fs = require('fs');

var io = require('socket.io');
var signals = document.getElementsByClassName('signal');
// var server = http.createServer();
// server.listen(port, ipAddress);
// var socket = io.listen(server);
// var host = "10.70.254.76";
// var port = 80;

// var http = require("http").createServer();
// var io = require("socket.io").listen(http);

// http.listen(port, host);
function createserver(){
    var server = http.createServer((request,response)=>{
        console.log('client requested');
        var pathname = url.parse(request.url).pathname;
        console.log(pathname);
        if(pathname == "/"){
            response.end(JSON.stringify(Song));
        }
        else{
            var index = Number(pathname.substr(5));
            fs.readFile(Song[index].value.location_inc_name,(error,data)=>{
                if (error) {
                    console.log(error);
                }else {	
                    // song_array["songs"][i].base64buffer = new Buffer(data).toString('base64');
                    response.end(JSON.stringify(new Buffer(data).toString('base64')));
                    response.on('finish',()=>{
                        console.log('sent song data');
                    });
                    // response.end();		
                }
            });
        }
        // info_server.close();
    });
    server.listen(1729,'127.0.0.1');
    var socket = io.listen(server);
    socket.sockets.on('connection', function (socket) {
        socket.emit("song-info",Song);
        // var response = "request received";
        socket.on("getSong", function(data,fn) {
            console.log(data);
            var index = data.index;
            fn({ msg : 'request received'});
            signals[index].innerHTML = "Sending";
            fs.readFile(Song[index].value.location_inc_name,(error,data)=>{
                if (error) {
                    console.log(error);
                }else {	
                    // song_array["songs"][i].base64buffer = new Buffer(data).toString('base64');
                    // response.end(JSON.stringify(new Buffer(data).toString('base64')));
                    // response.on('finish',()=>{
                    //     console.log('sent song data');
                    // });
                    // response.end();		
                    // fn({base64buffer: new Buffer(data).toString('base64')});
                    socket.emit("sending-song",{base64buffer: new Buffer(data).toString('base64')},(data)=>{
                        signals[index].innerHTML = "Sent";
                    });
                }
            });
        });
        socket.once('close-server',()=>{
            socket.disconnect();
            server.close();
        });
    });
    server.on('close',()=>{
        console.log('server closed');
    });
    // document.getElementById('msg-box').innerHTML = "Server Started";
    console.log('server Started');
    document.getElementById('dialog-panel').style.display = "none";
    document.getElementsByClassName('second-step')[0].style.display = "block";
}

// function createserver(){
//     var info_server = http.createServer((request,response)=>{
//         console.log('client requested');
//         var pathname = url.parse(request.url).pathname;
//         console.log(pathname);
//         response.end(JSON.stringify(Song));
//         info_server.close();
//     });
//     info_server.listen(1729,'127.0.0.1');
//     info_server.on('close',()=>{
//         console.log('info_server closed');
//     });
//     var song_server = http.createServer((request,response)=>{
//         console.log('client requested for song');
//         var pathname = url.parse(request.url).pathname;
//         console.log(pathname);
//         // fetchSong(Number(pathname.substr(5)));
//         var index = Number(pathname.substr(5));
//         fs.readFile(Song[index].value.location_inc_name,(error,data)=>{
//             if (error) {
//                     console.log(error);
//                 }else {	
//                     // song_array["songs"][i].base64buffer = new Buffer(data).toString('base64');
//                     response.end(JSON.stringify(new Buffer(data).toString('base64')));
//                     response.on('finish',()=>{
//                         console.log('sent song data');
//                     });
//                     // response.end();		
//                 }
//         });
//         // response.end(JSON.stringify(Song));
//     });
//     song_server.listen(1730,'127.0.0.1');
//     document.getElementById('msg-box').innerHTML = "Servers Started";
// }