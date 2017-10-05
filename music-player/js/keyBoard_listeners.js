document.body.addEventListener("keypress",(event)=>{
    var key_code = event.which || event.keyCode;
    if(key_code == 32){
        if(audio_player.paused)
            audio_player.play();
        else
            audio_player.pause();
    }
});