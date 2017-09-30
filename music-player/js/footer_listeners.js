var time_interval = null;

// Audio tag listeners
audio_player.addEventListener("loadedmetadata", ()=>{
    console.log("loaded");
    if(time_interval){
        clearInterval(time_interval);
        time_interval = null;
    }
    audio_player.play();
    time_interval = setInterval(incrementDuration, 1000);
    document.getElementById("end-time").innerHTML = getTime(audio_player.duration);
    document.getElementById("current-position").style.width = '0%';
});
audio_player.addEventListener("playing", ()=>{
    console.log("playing");
    play_pause.removeClass("play").addClass("pause");
    if(!time_interval){
        time_interval = setInterval(incrementDuration, 1000);
        document.getElementById("current-position").style.width = '0%';
    }
});
audio_player.addEventListener("pause", ()=>{
    console.log("paused");
    play_pause.removeClass("pause").addClass("play");
});
audio_player.addEventListener("ended",()=>{
    console.log("audio ended");
    play_pause.removeClass("pause").addClass("play");
    document.getElementById("end-time").innerHTML = getTime(audio_player.duration);
    clearTimeInterval();
});

// Seek-bar listeners
document.getElementById("seek-bar").addEventListener("click", (event)=>{

    var seek_bar = $("#seek-bar");
    var x = event.pageX - seek_bar.offset().left;
    if ( x < 0)
        x = 0;
    var percent =  x / seek_bar.width() * 100;
    if(percent > 100)
        percent = 100;
    audio_player.currentTime = percent / 100 * audio_player.duration;
    document.getElementById("current-position").style.width = `${percent}%`;
});

// play pause button listeners
play_pause.click(()=>{
    if(play_pause.hasClass("play"))
        audio_player.play();
    else
        audio_player.pause();
});
function playSong(){
    audio_player.load();
}

function incrementDuration(){
    document.getElementById("current-position").style.width = `${audio_player.currentTime / audio_player.duration * 100}%`;
    document.getElementById("current-time").innerHTML = getTime(audio_player.currentTime);
}

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