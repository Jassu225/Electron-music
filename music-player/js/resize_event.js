
window.addEventListener('resize',setContainersSize);

function setContainersSizeAfter520ms(){
    setTimeout(setContainersSize, 520);
}

// Changing size of image containers
function setContainersSize(){
    var width = $("div#songs-container").width();

    if(width <= 700){       // 3 containers per row

        if(!$('div.album').hasClass("col-4")){
            removeColClasses($('div.album'));
            $('div.album').addClass('col-4');
        }
        view_port.row_capacity = 3;

    } else if( width <= 900){       // 4 containers per row

        if(!$('div.album').hasClass("col-3")){
            removeColClasses($('div.album'));
            $('div.album').addClass("col-3");
        }
        view_port.row_capacity = 4;

    } else if( width <= 1100){      // 5 containers per row

        if(!$('div.album').hasClass("col-2_4")){
            removeColClasses($('div.album'));
            $('div.album').addClass("col-2_4");
        }
        view_port.row_capacity = 5;

    } else if( width <= 1200){      // 6 containers per row

        if(!$('div.album').hasClass("col-2")){
            removeColClasses($('div.album'));
            $('div.album').addClass("col-2");
        }
        view_port.row_capacity = 6;

    } else if(width > 1200){        // 7 containers per row

        if(!$('div.album').hasClass("col-1_7")){
            removeColClasses($('div.album'));
            $('div.album').addClass("col-1_7");
        }
        view_port.row_capacity = 7;

    }
}

function removeColClasses(element){
    var col_classes = "col-1_7 col-2 col-2_4 col-3 col-4";
    element.removeClass(col_classes);
}

// setContainersSize();