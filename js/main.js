/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 1 - Star Break Coffee
 */

var svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", "400")
  .attr("height", "400");

d3.json("data/revenues.json").then(function(data) {
  data.forEach(d => {
    d.revenue = +d.revenue;
  });

  var y = d3
    .scaleLiner()
    .domain([0, 800])
    .range([0, 400]);

  var rects = svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect");
});
