function displayNetwork() 
{
    d3.json("data/graph.json", function(error,graph){
        if (error) return console.warn(error);

        var links = graph.links;

        links.forEach(function(d) {
            d.source = +d.source;
            d.target = +d.target;
        });

		var width = $(".network").width(),    // was 770 : Use the width setting from the element
            height = 600;

        var r = 8;
        var svg = d3.select(".network").append("svg")
            .attr("width", width)
            .attr("height", height);

        var tip = d3.tip()
            .attr('class', 'bio-tip')
            .direction('e')
            .offset([0,5])
            .html(function(d) {
                var html = "";
                html += "<h1>"+d.name+"</h1>";
                html += "<p>"+d.bio+"</p>";
                return html;
            });

        svg.call(tip);

        var force = d3.layout.force()
            .nodes(graph.nodes)
            .links(graph.links)
            .linkDistance(200)
            .friction(0)
            .size([width, height])
            .charge(-100)
            .distance(300)
            .on("tick", tick)
            .start();

        var link = svg.selectAll(".link")
            .data(graph.links)
         .enter().append("line")
            .attr("class", function(d) {
                if (d.type === "+") return "ally-link";
                else return "enemy-link";
            });

        var node = svg.selectAll(".node")
            .data(graph.nodes)
         .enter().append("g")
            .append("circle")
            .attr("class", "node")
            .attr("r", r)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .on('click', function(d) {
                _displayConnections(d.index);
                d3.event.stopPropagation();
            });

        var labels = svg.selectAll("g")
            .append("text")
            .attr("class","node-text")
            .attr("x", function(d) {return d.x-4;})
            .attr("y", function(d) {return d.y+4;})
            .text(function (d) {
                if (d.index === 39){ return "H";}
                else if (d.index === 45) { return "V";}
                else return "";
            });

        function tick() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("cx", function(d) { return d.x = Math.max(r+1, Math.min(width-r-1,d.x)); })
                .attr("cy", function(d) { return d.y = Math.max(r+1, Math.min(height-r-1,d.y)); });

            labels
                .attr("x", function(d) {return d.x-4})
                .attr("y", function(d) {return d.y+4})
                .text(function (d) {
                    if (d.index === 39){ return "H";}
                    else if (d.index === 45) { return "V";}
                    else return "";
                });
        }
    });
}

function _drawOpaqueEdges(triad)
{
    var edges = d3.select(".network")
        .selectAll("line");
    edges
        .transition()
        .style("opacity", function(d) {
            return d.triads.indexOf(triad) > -1 ? 1 : 0.05;
        });
}

function _restoreEdges()
{
    d3.select(".network").selectAll("line")
        .style("opacity", 1);
}

function _displayConnections(id)
{
    var edges = d3.select(".network")
        .selectAll("line");

    edges.transition()
        .style("opacity", function(d) {
            var source = d.source.index;
            var target = d.target.index;

            if (source === id || target === id) return 1;
            else return 0.05;
        });
}

function highlightDiameter()
{
    var edges = d3.select(".network")
        .selectAll("line");

    edges.transition()
        .style("opacity", function(d) {
            var source = d.source.index;
            var target = d.target.index;
            function isDiameterEdge(a,b) {
                if (source === a && target === b) { return true;}
                if (source === b && target === a) { return true;}
                return false;
            }
            if (isDiameterEdge(19,20)) return 1;
            else if (isDiameterEdge(20,21)) return 1;
            else if (isDiameterEdge(21,29)) return 1;
            else if (isDiameterEdge(29,30)) return 1;
            else {
                return 0.05;
            }
        });
}

function _displayHarryAndVoldemort()
{
    var edges = d3.select(".network")
        .selectAll("line");

    edges.transition()
        .style("opacity", function(d) {
            var source = d.source.index;
            var target = d.target.index;
            if (source === 39 || target === 39) return 1;
            if (source === 45 || target === 45) return 1;
            return 0.05;
        });
}
