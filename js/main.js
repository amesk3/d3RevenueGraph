/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 1 - Star Break Coffee
 */

var width = 600;
var height = 400;
var margin = { top: 10, right: 60, bottom: 100, left: 60 };

var g = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

g.append("text")
  .attr("class", "x axis-label")
  .attr("font-size", "20px")
  .attr("x", width / 2)
  .attr("y", height + 60)
  .attr("text-anchor", "middle")
  .text("Star Break Revenue from Jan to Jul");

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
    .range([height, 0]);

  var xAxisCall = d3.axisBottom(x);
  g.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisCall);

  var yAxisCall = d3.axisLeft(y).tickFormat(function(d) {
    return "$" + d;
  });
  g.append("g")
    .attr("class", "y-axis")
    .call(yAxisCall);

  var rects = g.selectAll("rect").data(data);

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
