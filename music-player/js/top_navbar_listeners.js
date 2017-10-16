
// MENU ICON CLICK LISTENER
// TOGGLES THE SIDE NAVIGATION BAR
let side_navbar_toggle = 1;
let x_values = ["calc(-1 * 100%)","0px"];
let translate_x = ["0px", "calc(100% * 2/12)"];
document.getElementById('menu-icon').addEventListener('click', ()=>{
    const side_navbar = document.getElementById('side-navbar');
    side_navbar.style.transform = `translate3d(${x_values[side_navbar_toggle]}, 0px,0px)`;
    $('#main-section').toggleClass("col-12 col-10");
    side_navbar_toggle = 1 - side_navbar_toggle;
    // setContainersSizeAfter520ms();
});

// Top navigation bar listeners
let top_navbar_children = document.getElementById("top-nav-menu").childNodes[1].childNodes;

top_navbar_children[1].addEventListener("click", (event)=>{      //Albums
    var element = event.currentTarget;
    if( !element.classList.contains("active-top-menu")){
        removeActiveElements();
        albums_container.classList.add("active-main-page");
        element.classList.add("active-top-menu");
    }
});
top_navbar_children[3].addEventListener("click", (event)=>{      //Artists
    var element = event.currentTarget;
    if( !element.classList.contains("active-top-menu")){
        removeActiveElements();
        artists_container.classList.add("active-main-page");
        element.classList.add("active-top-menu");
    }
});

function removeActiveElements(){
    $("div.active-top-menu").removeClass("active-top-menu");
    $("div.active-main-page").removeClass("active-main-page");
}