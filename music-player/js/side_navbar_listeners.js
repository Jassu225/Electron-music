
// All div children of side-navbar are in odd indices because there  exists a text node b/w each child
// These text nodes are generated because of intendation.

// Adding Listener to "Home" tab in side-navbar
document.getElementById('side-navbar').childNodes[1].addEventListener("click", ()=>{
    if(view_port.active_main_section_division.id != 'songs-container'){
        view_port.active_main_section_division.classList.add('hide');
        view_port.active_main_section_division = document.getElementById('songs-container');
        view_port.active_main_section_division.classList.remove('hide');
    }
});

// Adding Listener to "Add Songs" tab in side-navbar
document.getElementById('side-navbar').childNodes[3].addEventListener("click", ()=>{
    if(view_port.active_main_section_division.id != 'add-songs'){
        view_port.active_main_section_division.classList.add('hide');
        view_port.active_main_section_division = document.getElementById('add-songs');
        document.getElementById("show-adding-songs").innerHTML = "";
        view_port.active_main_section_division.classList.remove('hide');
    }
});

// Adding Listener to "Settings" tab in side-navbar
document.getElementById('side-navbar').childNodes[7].addEventListener("click", openSettingsWindow);

// Adding Listener to "Feedback" tab in side-navbar
document.getElementById('side-navbar').childNodes[11].addEventListener("click", ()=>{
    if(view_port.active_main_section_division.id != 'feedback'){
        view_port.active_main_section_division.classList.add('hide');
        view_port.active_main_section_division = document.getElementById('feedback');
        view_port.active_main_section_division.classList.remove('hide');
        document.getElementById("feedback-field").value = "";
        document.getElementById("chars-left").innerHTML = "500 characters left.";
    }
});