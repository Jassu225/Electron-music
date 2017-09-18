
// MENU ICON CLICK LISTENER
// TOGGLES THE SIDE NAVIGATION BAR
var side_navbar_toggle = 1;
document.getElementById('menu-icon').addEventListener('click', ()=>{
    var x_values = ["calc(-1 * 100%)","0px"];
    const side_navbar = document.getElementById('side-navbar');
    side_navbar.style.transform = `translate(${x_values[side_navbar_toggle]}, 0px)`;
    if(side_navbar_toggle == 1){
        side_navbar_toggle = 0;
    } else
        side_navbar_toggle = 1;
});