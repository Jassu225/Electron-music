//LLRP DEVICE SCANNER
var net = require('net'), Socket = net.Socket;
var port = 1729;        // port number used to transfer data

var checkPort = function(port, host, callback) {
    var socket = new Socket(), status = null;
    // Socket connection established, port is open
    socket.on('connect', function() {status = 'open';socket.end();});
    socket.setTimeout(1500);// If no response, assume port is not listening
    socket.on('timeout', function() {status = 'closed';socket.destroy();});
    socket.on('error', function(exception) {status = 'closed';});
    socket.on('close', function(exception) {callback(null, status,host,port);});
    socket.connect(port, host);
}

//scan over a range of IP addresses and execute a function each time the LLRP port is shown to be open.
function scanNetwork(){
    var LAN = system_ip.substr(0, system_ip.lastIndexOf("."));
    // console.log(LAN);
    for(var i = 1; i <= 255; i++){
        checkPort(port, LAN+'.'+i, function(error, status, host, port){
            if(status == "open"){
                console.log("Reader found: ", host, port, status);
            } else
                console.log("port closed");
        });
    }
}