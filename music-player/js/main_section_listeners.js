
// Adding Listener to "album" class in albums-container in main-section 
$(".album").click((event)=>{
    console.log(event.currentTarget.childNodes[3].childNodes[1].innerHTML);
    albumsDB.findOne({ _id: event.currentTarget.childNodes[3].childNodes[1].innerHTML }, (err,doc)=>{
        console.log(doc);
    });
});

