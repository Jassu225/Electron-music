var shell = require("shelljs");
var {ipcRenderer} = require('electron');
var http = require('http');
var fs = require('fs');
var counter= 0;
var timeInterval;
var Song = [];
var num_of_songs = 0;
var ip='';
//Server Side
var NumberOfBufferedSongs = 0;
var areSongsBuffered = false;
//Client Side
var NumberOfReceivedSongs = 0;
var TotalSongs = 0;
var file_array;
function init(){
    ipcRenderer.send('add-li');
    var buttons = document.getElementsByClassName('sr-buttons');
    buttons[0].style.display = "none";
    buttons[1].style.display = "none";
}
function server(){
    // ipcRenderer.send('send-song-info');
}
function client(){
    settimer();
}
function senderPanel(){
    init();
    document.getElementById('sender').style.display = "block";
    document.getElementById('btns').style.display = "table";
    document.getElementById('send-btn').style.display = "inline-block";
}
function receiverPanel(){
    init();
    document.getElementById('receiver').style.display = "block";
    client();
}
function send(){
    var second = document.getElementsByClassName('second-step');
    second[0].style.display = "none";
    // second[1].style.display = "none";
    second[2].style.display = "none";
    document.getElementById('dialog-panel').style.display = "table";
    initializeServer();
}
function settimer(){
   timeInterval = setInterval(show,1000);
}
function show(){
    var test="";
			shell.exec('netstat -a -n -t | grep [0-9]*.[0-9]*.[0-9]*.[0-9]*:1729', {silent:true}, function(code, stdout, stderr) {
  			counter++;
            if(counter == 10)
                clearInterval(timeInterval);
            console.log('Exit code:', code);
  			console.log('Program output:', stdout);
			var pattern = /[0-9]*.[0-9]*.[0-9]*.[0-9]*:1729/;
            test = pattern.exec(stdout);
            if(test!= ""){
                console.log(test);
                clearInterval(timeInterval);
                var pattern1 = /[0-9]*.[0-9]*.[0-9]*.[0-9]*/;
                var test1 = pattern1.exec(test);
                ip= test1[0];
                createClient();
            }

            if(counter == 10 && test == "")
                alert('Receiver not found');
			});
}
function songObj(){
    var song = {
        name : undefined,
        size : undefined,
        base64buffer : undefined
    }
    return song;
}
var song_array = {
            number_of_songs: 0,
            songs : []
};
function songStats(i){
    fs.stat(Song[NumberOfBufferedSongs+i].value.location_inc_name, function(err, stats) {
            if (err) {
                throw err;
            }
            song_array["songs"].push(songObj());
            console.log("i "+i);
            song_array["songs"][i].name = String(Song[NumberOfBufferedSongs+i].value.name);
            song_array["songs"][i].size = Number(stats.size);
            fs.readFile(Song[NumberOfBufferedSongs+i].value.location_inc_name, function (err, data) {
                if (err) {
                    console.log(err);
                    // HTTP Status: 404 : NOT FOUND
                    // Content Type: text/plain
                    //response.writeHead(404, {'Content-Type': 'text/html'});
                }else {	
                    //Page found	  
                    // HTTP Status: 200 : OK
                    // Content Type: text/plain
                    //response.writeHead(200, {'Content-Type': 'audio/mpeg'});	
                    // Write the content of the file to response body
                    // response.write(JSON.stringify(neededstats));
                    // response.end();
                    // response.write(new Buffer(data).toString('base64'));
                    song_array["songs"][i].base64buffer = new Buffer(data).toString('base64');
                    // response.write(JSON.stringify(song_array));
                    // response.end();		
                }
                console.log(NumberOfBufferedSongs+i);
                if( (NumberOfBufferedSongs+i) == num_of_songs-1 || i == 4){
                    if(NumberOfBufferedSongs == 0)
                        createserver();
                    if( (NumberOfBufferedSongs+i)!=num_of_songs-1 && i==4)
                        NumberOfBufferedSongs += 5;
                    else if((NumberOfBufferedSongs+i)!=num_of_songs-1)
                        NumberOfBufferedSongs += (i+1);
                    areSongsBuffered = true;
                } else
                    songStats(i+1);
                // Send the response body 
                // response.end();
            });
            // response.write(JSON.stringify(neededstats));
            // response.end();
         });
}
function initializeServer(){
        song_array.number_of_songs = num_of_songs;
        console.log(Song);
       songStats(0);
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function createserver1(){
    var http = require('http');
    var url = require('url');
    // Create a server
    var server = http.createServer( function (request, response) {  
        // Parse the request containing file name
        console.log('client requested');
        var pathname = url.parse(request.url).pathname;
        console.log(pathname);
        while(!areSongsBuffered);
        response.write(JSON.stringify(song_array), ()=>{
            response.end();
        });
        response.on('finish', ()=>{
            areSongsBuffered = false;
            song_array.songs = [];
            console.log("NumberOfBufferedSongs "+NumberOfBufferedSongs);
            if(NumberOfBufferedSongs != num_of_songs)
               songStats(0);
            console.log('finished'+song_array.songs.length);
        });
        // server.close();
    });
    server.listen(1729, '127.0.0.1');
    // Console will print the message
    document.getElementById('msg-box').innerHTML = "Server Started";
    console.log('Server running at http://127.0.0.1:8081/');
}
function createClient1(){
    console.log('client called');
    console.log(ip);
    var options;
    // Options to be used by request 
    options = {
        host: ip,
        port: '1729',
        path: ""
    };
    // Make a request to the server
    var req = http.request(options, callback);
    req.on('error', (err)=>{
        console.log('error occured');
    });
    // req.on('response', ()=>{
    //     console.log('response event');
    // });
    req.end();
}
// Callback function is used to deal with response
function callback(response){
        // Continuously update stream with data
        // response.write();
        console.log('server responded');
        var filedata = '';
        response.on('data', function(data) {
            filedata += data;
        });
        response.on('end', function() {
            // Data received completely.
            //console.log(filedata);
            file_array = JSON.parse(filedata);
            if(TotalSongs == 0)
                TotalSongs = file_array.number_of_songs;
            else{
                console.log(file_array);
            }
            // fileName = file_array.name; 
            // var options = {
            //     host: ip,
            //     port: '1729',
            //     path: '/song'
            // };
            // var request = http.request(options, recvSong);
            // request.end();
            for(var i=NumberOfReceivedSongs,j=0;(i<TotalSongs) && (j<5);i++,j++){
                writeToHD(j);
            }
        });
}
function writeToHD(j){
    var buffer = new Buffer(file_array["songs"][j].base64buffer, 'base64');
    console.log(file_array["songs"][j].name);
    fs.writeFile(file_array["songs"][j].name, buffer , (err) => {
        if (err) throw err;
        else
            console.log('yay!');
        NumberOfReceivedSongs++;
        if(NumberOfReceivedSongs == TotalSongs){

        } else if((NumberOfReceivedSongs != TotalSongs) && (j==4)){
            file_array = null;
            createClient();
        }
    });
}