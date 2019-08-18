/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 1 - Star Break Coffee
 */

var width = 600;
var height = 400;

var svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json("data/revenues.json").then(function(data) {
  console.log(data);

  data.forEach(d => {
    d.revenue = +d.revenue;
  });

  var x = d3
    .scaleBand()
    .domain(
      data.map(function(d) {
        return d.month;
      })
    )
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function(d) {
        return d.revenue;
      })
    ])
    .range([0, height]);

  var rects = svg.selectAll("rect").data(data);

  rects
    .enter()
    .append("rect")
    .attr("y", function(d) {
      return y(d.revenue);
    })
    .attr("x", function(d) {
      return x(d.month);
    })
    .attr("width", x.bandwidth)
    .attr("height", function(d) {
      return height - y(d.revenue);
    })
    .attr("fill", "grey");
});
