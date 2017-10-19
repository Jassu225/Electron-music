const hotspot = require('node-hotspot');    // Module used for creating hotspot
var opts;
var system_ip;

function enableHotspot(){
    opts = {
        ssid: `fileShare-${new Date().getTime()}`, 
        password: '66ahhhs641jk',
        force: true // (optional)  if hosting a network already turn it off and run ours. 
        //adaptor: 'Ethernet' // (optional / false) name of adaptor to have ICS (Internet Connection Sharing) share internet from, passing false disables ICS all together - if non givin node-hotspot will attempt to find currently connected adaptor automatically 
    };
    
    hotspot.enable(opts)
    .then(function() {
        console.log('Hotspot Enabled');
    })
    .catch(function(e) {
        Console.log('Something went wrong; Perms?', e);
    })
    .then(hotspotStatus);
}
function disableHotspot(){
    hotspot.disable(opts)
    .then(function() {
        console.log('Hotspot disabled');
    })
    .catch(function(e) {
        Console.log('Something went wrong; Perms?', e);
    });
}
function hotspotStatus(){
    hotspot.stats(opts)
    .then(function(status) {    //status contains clients object and state
        system_ip =  status.connectedAdaptor.ip.substr(0, status.connectedAdaptor.ip.length - 2);
    });
}