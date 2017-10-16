// Scroll event for albums-container
var previously_removed_album_set = 0;
var next_album_set = 0;
var prev_album_set = 0;
document.getElementById("albums-container").addEventListener("scroll", (event)=>{
    var x = Math.floor( albums_container.scrollLeft / (1400 + 280) );      // 1400 = 7*album-width;
    if( x > previously_removed_album_set){        // scrolled right
        if(index_album < albums_list.length){
            for(var i = index_album,counter = 0; counter < 14; i++,counter++,index_album++){
                var index = counter + 14*next_album_set;
                if( i < albums_list.length){
                    albums[index].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].src = albums_list[i].cover;      //Image
                    albums[index].childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerHTML = albums_list[i]._id;
                }
                if(index_album % 2 == 0)
                    albums[index].style.transform = `translate3d(${i*120}px,0px,0px)`;
                else
                    albums[index].style.transform = `translate3d(${(i-1)*120}px,100%,0px)`;
            }
            if(counter){
                previously_removed_album_set = x;
                prev_album_set = next_album_set;
                next_album_set = (next_album_set + 1) % 3;
            }
        }
    } else if( x < previously_removed_album_set){ // scrolled left
        for(var i = index_album - 56,counter = 0; i < albums_list.length && counter < 14; i++,counter++,index_album--){
            var index = counter + 14*(prev_album_set);
            albums[index].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].src = albums_list[i].cover;      //Image
            albums[index].childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerHTML = albums_list[i]._id;
            if(index_album % 2 == 0)
                albums[index].style.transform = `translate3d(${i*120}px,0px,0px)`;
            else
                albums[index].style.transform = `translate3d(${(i-1)*120}px,100%,0px)`;
        }
        previously_removed_album_set = x;
        next_album_set = prev_album_set;
        prev_album_set = (3 + --prev_album_set) % 3;
    }
});

// Scroll event for artists-container
var previously_removed_artist_set = 0;
var next_artist_set = 0;
var prev_artist_set = 0;
document.getElementById("artists-container").addEventListener("scroll", (event)=>{
    var x = Math.floor( artists_container.scrollLeft / (1400 + 280) );      // 1400 = 7*album-width;
    if( x > previously_removed_artist_set){        // scrolled right
        if(index_artist < artists_list.length){
            for(var i = index_artist,counter = 0; counter < 14; i++,counter++,index_artist++){
                var index = counter + 14*next_artist_set;
                if( i < artists_list.length){
                    // artists[index].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].src = "./images/human.png";      //Image
                    artists[index].childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerHTML = artists_list[i]._id;
                }
                if(index_artist % 2 == 0)
                    artists[index].style.transform = `translate3d(${i*120}px,0px,0px)`;
                else
                    artists[index].style.transform = `translate3d(${(i-1)*120}px,100%,0px)`;
            }
            if(counter){
                previously_removed_artist_set = x;
                prev_artist_set = next_artist_set;
                next_artist_set = (next_artist_set + 1) % 3;
            }
        }
    } else if( x < previously_removed_artist_set){ // scrolled left
        for(var i = index_artist - 56,counter = 0; i < artists_list.length && counter < 14; i++,counter++,index_artist--){
            var index = counter + 14*(prev_artist_set);
            // artists[index].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].src = "./images/human.png";      //Image
            artists[index].childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerHTML = artists_list[i]._id;
            if(index_artist % 2 == 0)
                artists[index].style.transform = `translate3d(${i*120}px,0px,0px)`;
            else
                artists[index].style.transform = `translate3d(${(i-1)*120}px,100%,0px)`;
        }
        previously_removed_artist_set = x;
        next_artist_set = prev_artist_set;
        prev_artist_set = (3 + --prev_artist_set) % 3;
    }
});