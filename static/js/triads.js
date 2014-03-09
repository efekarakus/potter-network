var TRIAD_COUNTS = {
    "T3": 449,
    "T1": 319,
    "T2": 50,
    "T0": 13
}


/**
 * Draw equilateral triangles each size is 70px,
 * the triangles are separated by 40px;
 */
function displayTriads() 
{
    var width  = 770, height = 130;
    var svg = d3.select(".triads").append("svg")
        .attr("width", width)
        .attr("height", height);

    var gT3 = _T3(svg);
    var gT1 = _T1(svg);
    var gT2 = _T2(svg);
    var gT0 = _T0(svg);


    d3.select("html").on("click", function() {
        _restoreTriads();
        _restoreEdges();
    });

}

function _T3(svg) 
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
        {"x": 190, "y":49, "label": "+", "style": "none"},
        {"x": 215, "y":90, "label": "+", "style": "none"},
        {"x": 238, "y":49, "label": "+", "style": "none"},
        {"x": 209, "y":60, "label": TRIAD_COUNTS["T3"], "style": "none"},
        {"x": 212, "y":110, "label": "T3", "style": "italic"}
    ];


    var g = svg.append("g")
        .attr("class", "T3");

    _drawTriad(g,nodes,edges,labels);

    g.on("click", function() {
        _drawCleanTriad('T3');
        _drawOpaqueTriads('T3');
        _drawOpaqueEdges('T3');
        d3.event.stopPropagation();
    });

    return g;
}

function _T1(svg)
{
    var nodes = [
        {"cx": 285, "cy":80, "r": 8},
        {"cx": 320, "cy":19, "r": 8},
        {"cx": 355, "cy":80, "r": 8}
    ];

    var edges = [
        {"x1": 285, "y1":80, "x2":320, "y2":19, "label": "-"},
        {"x1": 320, "y1":19, "x2":355, "y2":80, "label": "-"},
        {"x1": 285, "y1":80, "x2":355, "y2":80, "label": "+"}
    ];

    var labels = [
        {"x": 290, "y":49, "label": "-", "style": "none"},
        {"x": 315, "y":90, "label": "+", "style": "none"},
        {"x": 343, "y":49, "label": "-", "style": "none"},
        {"x": 309, "y":60, "label": TRIAD_COUNTS["T1"], "style": "none"},
        {"x": 312, "y":110, "label": "T1", "style": "italic"}
    ];

    var g = svg.append("g")
        .attr("class", "T1");

    _drawTriad(g,nodes,edges,labels);
    g.on("click", function() {
        _drawCleanTriad('T1');
        _drawOpaqueTriads('T1');
        _drawOpaqueEdges('T1');
        d3.event.stopPropagation();
    });
    return g;
}

function _T2(svg)
{
    var nodes = [
        {"cx": 385, "cy":80, "r": 8},
        {"cx": 420, "cy":19, "r": 8},
        {"cx": 455, "cy":80, "r": 8}
    ];

    var edges = [
        {"x1": 385, "y1":80, "x2":420, "y2":19, "label": "+"},
        {"x1": 420, "y1":19, "x2":455, "y2":80, "label": "+"},
        {"x1": 385, "y1":80, "x2":455, "y2":80, "label": "-"}
    ];

    var labels = [
        {"x": 390, "y":49, "label": "+", "style": "none"},
        {"x": 415, "y":90, "label": "-", "style": "none"},
        {"x": 438, "y":49, "label": "+", "style": "none"},
        {"x": 409, "y":60, "label": TRIAD_COUNTS["T2"], "style": "none"},
        {"x": 412, "y":110, "label": "T2", "style": "italic"}
    ];

    var g = svg.append("g")
        .attr("class", "T2");


    _drawTriad(g,nodes,edges,labels);
    g.on("click", function() {
        _drawCleanTriad('T2');
        _drawOpaqueTriads('T2');
        _drawOpaqueEdges('T2');
        d3.event.stopPropagation();
    });

}

function _T0(svg)
{
    var nodes = [
        {"cx": 485, "cy":80, "r": 8},
        {"cx": 520, "cy":19, "r": 8},
        {"cx": 555, "cy":80, "r": 8}
    ];

    var edges = [
        {"x1": 485, "y1":80, "x2":520, "y2":19, "label": "-"},
        {"x1": 520, "y1":19, "x2":555, "y2":80, "label": "-"},
        {"x1": 485, "y1":80, "x2":555, "y2":80, "label": "-"}
    ];

    var labels = [
        {"x": 490, "y":49, "label": "-", "style": "none"},
        {"x": 515, "y":90, "label": "-", "style": "none"},
        {"x": 543, "y":49, "label": "-", "style": "none"},
        {"x": 511, "y":60, "label": TRIAD_COUNTS["T0"], "style": "none"},
        {"x": 512, "y":110, "label": "T0", "style": "italic"}
    ];


    var g = svg.append("g")
        .attr("class", "T0");


    _drawTriad(g,nodes,edges,labels);
    g.on("click", function() {
        _drawCleanTriad('T0');
        _drawOpaqueTriads('T0');
        _drawOpaqueEdges('T0');
        d3.event.stopPropagation();
    });
}

function _drawTriad(g,nodes,edges,labels)
{
    g.selectAll("line")
        .data(edges)
         .enter()
         .append("line")
         .attr("class", function(d) { return d.label === "-" ? "enemy-link" : "ally-link";})
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
         .attr("font-style", function(d) { return (d.style === "none") ? "" : "italic";})
         .attr("fill", "white");

}

function _drawCleanTriad(triad)
{
    d3.selectAll('.triads')
        .select('.'+triad)
        .selectAll('line')
        .style('opacity', 1.0);
}

function _drawOpaqueTriads(triad)
{
    d3.select('.triads')
        .selectAll('g')
        .style('opacity', function (d) {
            var g = d3.select(this);
            if (g.attr('class') !== triad) {
                g.selectAll('line')
                    .transition()
                    .style('opacity', 0.2);
            }
            return 1.0;
        })
}

function _restoreTriads()
{
    d3.select('.triads')
        .selectAll('g')
        .selectAll('line')
        .style('opacity', 1.0);
}
