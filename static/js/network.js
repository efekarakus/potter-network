function displayNetwork() 
{
d3.json("data/graph.json", function(error,graph){
    if (error) return console.warn(error);

    var links = graph.links;
    links.forEach(function(d) {
        d.source = +d.source;
        d.target = +d.target;
    });

	var width = 770,
		height = 500;
	var svg = d3.select(".network").append("svg")
		.attr("width", width)
		.attr("height", height);

    var tip = d3.tip()
        .attr('class', 'bio-tip')
        .direction('e')
        .offset([0,15])
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
		.size([width, height])
		.charge(-1000)
		.on("tick", tick)
		.start();

	var link = svg.selectAll(".link")
		.data(graph.links)
	 .enter().append("line")
		.attr("class", function(d) {
            console.log(d);
            if (d.type === "+") return "ally-link";
            else return "enemy-link";
        });

	var node = svg.selectAll(".node")
		.data(graph.nodes)
	 .enter().append("circle")
		.attr("class", "node")
		.attr("r", 8)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

	function tick() {
		link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		node.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
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
            return d.triads.indexOf(triad) > -1 ? 1 : 0.2;
        });
}

function _restoreEdges()
{
    d3.select(".network").selectAll("line")
        .style("opacity", 1);
}
