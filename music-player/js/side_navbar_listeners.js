
// All div children of side-navbar are in odd indices because there  exists a text node b/w each child
// These text nodes are generated because of intendation.

// Adding Listener to "Home" tab in side-navbar 
document.getElementById('side-navbar').childNodes[1].addEventListener("click", ()=>{
    if(active_main_section_division.id != 'songs-container'){
        active_main_section_division.classList.add('hide');
        active_main_section_division = document.getElementById('songs-container');
        active_main_section_division.classList.remove('hide');
    }
});

// Adding Listener to "Add Songs" tab in side-navbar 
document.getElementById('side-navbar').childNodes[3].addEventListener("click", ()=>{
    if(active_main_section_division.id != 'add-songs'){
        active_main_section_division.classList.add('hide');
        active_main_section_division = document.getElementById('add-songs');
        document.getElementById("show-adding-songs").innerHTML = "";
        active_main_section_division.classList.remove('hide');
    }
});