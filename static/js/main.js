$(document).ready(function() {
    displayTriads();
    displayNetwork();

    setTimeout(function() {
        _displayHarryAndVoldemort();
    }, 1000);

    d3.select('#diameter')
        .on("click", function(){ 
            highlightDiameter(); 
            d3.event.stopPropagation();
        });
});
