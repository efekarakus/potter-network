function displayNetwork() {
	var graph = {
	  nodes: d3.range(13).map(Object),
	  links: [
	    {source:  0, target:  1, type: "ally"},
	    {source:  1, target:  2, type: "ally"},
	    {source:  2, target:  0, type: "enemy"},
	    {source:  1, target:  3, type: "ally"},
	    {source:  3, target:  2, type: "ally"},
	    {source:  3, target:  4, type: "enemy"},
	    {source:  4, target:  5, type: "enemy"},
	    {source:  5, target:  6, type: "enemy"},
	    {source:  5, target:  7, type: "ally"},
	    {source:  6, target:  7, type: "enemy"},
	    {source:  6, target:  8, type: "ally"},
	    {source:  7, target:  8, type: "ally"},
	    {source:  9, target:  4, type: "ally"},
	    {source:  9, target: 11, type: "ally"},
	    {source:  9, target: 10, type: "enemy"},
	    {source: 10, target: 11, type: "enemy"},
	    {source: 11, target: 12, type: "ally"},
	    {source: 12, target: 10, type: "ally"}
	  ]
	};

	var width = 970,
		height = 500;

	var svg = d3.select(".network").append("svg")
		.attr("width", width)
		.attr("weight", height);

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
            if (d.type === "ally") return "ally-link";
            else return "enemy-link";
        });

	var node = svg.selectAll(".node")
		.data(graph.nodes)
	 .enter().append("circle")
		.attr("class", "node")
		.attr("r", 8);

	function tick() {
		link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		node.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
	}
}
