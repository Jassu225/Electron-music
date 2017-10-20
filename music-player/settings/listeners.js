// Category-containers listeners
// Heading Listeners
$("p.heading").click((event)=>{
    var element = $(event.currentTarget.nextSibling.nextSibling);
    element.toggleClass("hide");
});

// Sub-heading listeners
$("p.sub-heading").click((event)=>{
    var element = $(event.currentTarget.nextSibling.nextSibling);
    element.toggleClass("hide");
});
// To change a setting permannently
$("span.set").click((event)=>{
    var element = event.currentTarget.previousSibling.previousSibling;
    var category = element.getAttribute("category");
    var property = element.getAttribute("property");
    var value = element.value;
    changeSetting(category,property,value);
});

// Input change listeners
$("input").change((event)=>{
   var element = event.currentTarget;
   var category = element.getAttribute("category");
   var property = element.getAttribute("property");
   var value = element.value;
   settingPreview(category,property,value);
});