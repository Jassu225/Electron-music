const mousetrap = require('mousetrap');     // For binding key listeners

mousetrap.bind('space', function() {    // SPACEBAR      
    if(audio_player.paused)
        audio_player.play();
    else
        audio_player.pause();
    // return false to prevent default browser behavior
    // and stop event from bubbling
    return false;
});
mousetrap.bind(['command+up', 'ctrl+up'], function() {  // VOLUME UP
    try{
        audio_player.volume += 0.1;
    } catch(e){
        // console.log(e.code);
    }
    return false;
});
mousetrap.bind(['command+down', 'ctrl+down'], function() {  // VOLUME DOWN
    try{
        audio_player.volume -= 0.1;
    } catch(e){
        // console.log(e.code);
    }
    return false;
});
mousetrap.bind('m', function() {  // MUTE
    audio_player.volume = 0;
    return false;
});