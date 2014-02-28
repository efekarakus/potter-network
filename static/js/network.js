function displayNetwork() {
	var graph = {
	  nodes: [
        {name: "Harry Potter", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
        {name: "Lord Voldemort", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
        {name: "Ron Weasley", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
        {name: "Hermione Granger", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
        {name: "Sirius Black", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
        {name: "Cho Chang", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
        {name: "Vincent Crabbe", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
        {name: "Fleur Delacour", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
        {name: "Albus Dumbledore", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
        {name: "Argus Filch", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
        {name: "Igor Karkaroff", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
        {name: "Rubeus Hagrid", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
        {name: "Bellatrix Lestrange", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
      ],
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

    var tip = d3.tip()
        .attr('class', 'bio-tip')
        .direction('e')
        .offset([0,10])
        .html(function(d) {
            var html = "";
            html += "<h1>"+d.name+"</h1>";
            html += "<p>"+d.bio+"</p>";
            return html;
        });

	var svg = d3.select(".network").append("svg")
		.attr("width", width)
		.attr("weight", height);

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
            if (d.type === "ally") return "ally-link";
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
}
