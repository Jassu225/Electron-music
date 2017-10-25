class PlayList{
    constructor(playList,key){
        this.playList = playList;
        this.index = 0;
        this.key = key;
    }
    addSong(src){      //pushes song to array
        this.playList.push(src);
    }
    addSource(src){     // Adding source to audio tag
        audio_player.childNodes[0].src = src;
    }
    loadAudio(){    // For loading song into audio tag
        audio_player.load();
    }
    previousSong(){
        this.index = (--this.index + this.playList.length) % this.playList.length;
        this.addSource(this.playList[ this.index ]);
        this.loadAudio();
    }
    nextSong(){
        this.index = (this.index + 1) % this.playList.length;
        this.addSource(this.playList[ this.index ]);
        this.loadAudio();
    }
    playNext(src){
        if(this.playList.length > 0){
            if(this.key == "temporary")
                this.playList.splice(this.index + 1, 0, src);
        } else{
            this.addSong(src);
            this.addSource(src);
            this.loadAudio();
        }
    }
    playNow(src){
        if(this.playList[this.index] != src){
            if(this.key == "temporary"){
                this.playList.splice(this.index, 0, src);
                this.addSource(src);
            }
        }
    }
    shuffleSongs(){
        
    }
}