const mousetrap = require('mousetrap');     // For binding key listeners

mousetrap.bind(['space', 'media_play_pause'], function() {    // SPACEBAR      
    if(audio_player.paused)
        audio_player.play();
    else
        audio_player.pause();
    // return false to prevent default browser behavior
    // and stop event from bubbling
    return false;
},"keyup");
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
mousetrap.bind(['m', 'M'], function() {  // MUTE
    if(audio_player.volume == 0)
        audio_player.volume = volume;
    else
        audio_player.volume = 0;
    return false;
});
mousetrap.bind(['n', 'N', 'media_next'], ()=>{    //Next song
    activePlaylist.nextSong();
    return false;
});
mousetrap.bind(['p', 'P', 'media_previous'], ()=>{    //Previous Song
    activePlaylist.previousSong();
    return false;
});
mousetrap.bind(['l', 'L'], ()=>{    //Song loop
    if(audio_player.loop)
        audio_player.loop = false;
    else
        audio_player.loop = true;
    return false;
});