var TRIAD_COUNTS = {
    "T3": 20,
    "T1": 30,
    "T2": 5,
    "T4": 100
}


/**
 * Draw equilateral triangles each size is 70px,
 * the triangles are separated by 40px;
 */
function displayTriads() 
{
    var width  = 770, height = 100;
    var svg = d3.select(".triads").append("svg")
        .attr("width", width)
        .attr("height", height);

    _displayT1(svg);
}

function _displayT1(svg) 
{
    var nodes = [
        {"cx": 185, "cy":80, "r": 8},
        {"cx": 220, "cy":19, "r": 8},
        {"cx": 255, "cy":80, "r": 8}
    ];

    var edges = [
        {"x1": 185, "y1":80, "x2":220, "y2":19},
        {"x1": 220, "y1":19, "x2":255, "y2":80},
        {"x1": 185, "y1":80, "x2":255, "y2":80}
    ];

    var labels = [
        {"x": 190, "y":49, "label": "+"},
        {"x": 215, "y":90, "label": "+"},
        {"x": 238, "y":49, "label": "+"},
        {"x": 212, "y":60, "label": TRIAD_COUNTS["T3"]}
    ];


    var g = svg.append("g")
        .attr("class", "T3");

    _drawTriad(g,nodes,edges,labels);

    g.on("mouseover", function() {_drawOpaqueEdges('T3')});
    g.on("mouseout", function() {_restoreEdges()});
}

function _drawTriad(g,nodes,edges,labels)
{
    g.selectAll("line")
        .data(edges)
         .enter()
         .append("line")
         .attr("class", "ally-link")
         .attr("x1", function(d) { return d.x1; })
         .attr("y1", function(d) { return d.y1; })
         .attr("x2", function(d) { return d.x2; })
         .attr("y2", function(d) { return d.y2; });

    g.selectAll("circle")
        .data(nodes)
         .enter()
         .append("circle")
         .attr("class", "node")
         .attr("cx", function (d) { return d.cx; })
         .attr("cy", function (d) { return d.cy; })
         .attr("r", function(d) { return d.r; });

    g.selectAll("text")
        .data(labels)
         .enter()
         .append("text")
         .attr("class", "label")
         .attr("x", function(d) { return d.x; })
         .attr("y", function(d) { return d.y; })
         .text(function(d) { return d.label; })
         .attr("font-size", "15px")
         .attr("fill", "white");

}
