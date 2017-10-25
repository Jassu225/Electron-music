var addList = null;
function showModal(list){
    document.getElementById("modal").classList.remove("hide");
    addList = list;
}
function savePlaylist(){
    var name = document.getElementById("playlistName").innerHTML;
    if(name.length < 0){
        document.getElementById("modal-error").innerHTML = "Name cannot be blank";
        return;
    }
    if(name.length < 8){
        document.getElementById("modal-error").innerHTML = "Name should have atleast 8 characters";
    }
    playlistsDB.findOne({_id: name}, (err,doc)=>{
        if(err)
            console.log(err);
        else if(doc){
            document.getElementById("modal-error").innerHTML = "A playlist with givwn name already exists";
            return;
        } else{
            var playlist = {
                _id: name,
                songs: Array.from(addList)
            };
            playlistsDB.insert(playlist, (err,newDoc)=>{
                if(err)
                    console.log(err);
                else
                    alert("Playlist created successfully");
            });
            document.getElementById("modal").classList.add("hide");
        }
    });
}
document.getElementById("close-modal").addEventListener("click", ()=>{
    document.getElementById("modal").classList.add("hide");
});