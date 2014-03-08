$(document).ready(function() {
    displayTriads();
    displayNetwork();

    d3.select('#diameter')
        .on("click", function(){ 
            highlightDiameter(); 
            d3.event.stopPropagation();
        });
});
