const wifi = require('node-wifi');  // Used to connect to a wifi network
var ssid_pattern = /fileShare-[0-9]*/;

// Initialize wifi module 
// Absolutely necessary even to set interface to null 
wifi.init({
    iface : null // network interface, choose a random wifi interface if set to null 
});

function scanAndConnectToWifi(){
    var receivers_list = document.getElementById("receivers-list");
    var hidden = false;
    // Scan networks 
    wifi.scan(function(err, networks) {
        if (err) {
            console.log(err);
        } else {
            // console.log(networks);
            for(var i = 0; i < networks.length; i++){
                var network_name = ssid_pattern.exec(networks[i].ssid);
                if(network_name){
                    if(!hidden){
                        document.getElementById("searching").classList.add("hide");
                        hidden = true;
                    }
                    receivers_list.innerHTML += `<div class="receiver font-roboto cursor-pointer">${networks[i].ssid}</div>`;
                    // connectToWifi(networks[i].ssid);
                }
            }
            if(!hidden)
                document.getElementById("searching").childNodes[0].innerHTML = 'No receivers found.<a style="border-bottom:2px solid rgb(171,171,171);" class="cursor-pointer" onclick="scanAgain()">Try again.</a>';
        }
    });
}

function scanAgain(){
    document.getElementById("searching").childNodes[0].innerHTML = "Searching for receivers";
    scanAndConnectToWifi();
}
function connectToWifi(ssid){
    // Connect to a network 
    wifi.connect({ ssid : ssid, password : "66ahhhs641jk"}, function(err) {
        if (err) {
            console.log(err);
        } else
            console.log('Connected');
    });
}

function disconnectFromWifi(){
    wifi.disconnect(function(err) {     // Doesn't work for windows
        if (err) {
            console.log(err);
        }
        console.log('Disconnected');
    });
}