// Scroll event for albums-container
var previously_removed_set = 0;
var next_album_set = 0;
var prev_album_set = 0;
document.getElementById("albums-container").addEventListener("scroll", (event)=>{
    var x = Math.floor( albums_container.scrollLeft / 1400 );      // 1400 = 7*album-width;
    if( x > previously_removed_set){        // scrolled right
        if(index_album < albums_list.length){
            for(var i = index_album,counter = 0; counter < 14; i++,counter++,index_album++){
                var index = counter + 14*next_album_set;
                if( i < albums_list.length){
                    albums[index].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].src = albums_list[i].cover;      //Image
                    albums[index].childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerHTML = albums_list[i]._id;
                }
                if(index_album % 2 == 0)
                    albums[index].style.transform = `translate(${i*100}px,0px)`;
                else
                    albums[index].style.transform = `translate(${(i-1)*100}px,100%)`;
            }
            if(counter){
                previously_removed_set = x;
                prev_album_set = next_album_set;
                next_album_set = (next_album_set + 1) % 3;
            }
        }
    } else if( x < previously_removed_set){ // scrolled left
        for(var i = index_album - 56,counter = 0; i < albums_list.length && counter < 14; i++,counter++,index_album--){
            var index = counter + 14*(prev_album_set);
            albums[index].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].src = albums_list[i].cover;      //Image
            albums[index].childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerHTML = albums_list[i]._id;
            if(index_album % 2 == 0)
                albums[index].style.transform = `translate(${i*100}px,0px)`;
            else
                albums[index].style.transform = `translate(${(i-1)*100}px,100%)`;
        }
        previously_removed_set = x;
        next_album_set = prev_album_set;
        prev_album_set = (3 + --prev_album_set) % 3;
    }
});