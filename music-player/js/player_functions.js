var time_interval = null;
function playSong(){
    audio_player.load();
}

function incrementDuration(){
    document.getElementById("current-position").style.width = `${audio_player.currentTime / audio_player.duration * 100}%`;
    document.getElementById("current-time").innerHTML = getTime(audio_player.currentTime);
}

audio_player.addEventListener("loadedmetadata", ()=>{
    console.log("loaded");
    if(time_interval){
        clearInterval(time_interval);
        time_interval = null;
    }
    audio_player.play();
    time_interval = setInterval(incrementDuration, 1000);
    document.getElementById("end-time").innerHTML = getTime(audio_player.duration);
});
audio_player.addEventListener("ended",()=>{
    console.log("audio ended");
    setTimeout(clearTimeInterval,200);
});

function clearTimeInterval(){
    clearInterval(time_interval);
    time_interval = null;
}
function getTime(time){
    var min = Math.floor(time / 60);
    var sec = Math.floor(time % 60);
    var minutes,seconds;
    if(min < 10)
        minutes = `0${min}`;
    else
        minutes = `${min}`;
    
    if(sec < 10)
        seconds = `0${sec}`;
    else
        seconds = `${sec}`;

    return `${minutes}:${seconds}`;
}