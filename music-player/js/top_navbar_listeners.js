
// MENU ICON CLICK LISTENER
// TOGGLES THE SIDE NAVIGATION BAR
var side_navbar_toggle = 1;
var x_values = ["calc(-1 * 100%)","0px"];
var translate_x = ["0px", "calc(100% * 2/12)"];
document.getElementById('menu-icon').addEventListener('click', ()=>{
    const side_navbar = document.getElementById('side-navbar');
    side_navbar.style.transform = `translate(${x_values[side_navbar_toggle]}, 0px)`;
    // document.getElementById('inner-songs-container').classList.add();
    $('#main-section').toggleClass("col-12 col-10");
    // $('#main-section').css("transform", `translate( ${translate_x[side_navbar_toggle]}, ${top_nav_height})`);
    side_navbar_toggle = 1 - side_navbar_toggle;
});