/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 1 - Star Break Coffee
 */

var margin = { top: 10, right: 60, bottom: 100, left: 60 };
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var flag = true;

var t = d3.transition().duration(750);

var g = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var xAxisGroup = g
  .append("g")
  .attr("class", "x axis")
  .attr("transform", `translate( 0,${height})`);

var yAxisGroup = g.append("g").attr("class", "y axis");

//X Scale
var x = d3
  .scaleBand()
  .range([0, width])
  .paddingInner(0.3)
  .paddingOuter(0.3);

//Y Scale
var y = d3.scaleLinear().range([height, 0]);

//X label
g.append("text")
  .attr("class", "x axis-label")
  .attr("font-size", "20px")
  .attr("x", width / 2)
  .attr("y", height + 60)
  .attr("text-anchor", "middle")
  .text("Month");

//Y label
var yLabel = g
  .append("text")
  .attr("y", -50)
  .attr("x", -(height / 2))
  .attr("font-size", "20x")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Revenue");

d3.json("data/revenues.json").then(function(data) {
  console.log(data);

  //clean data
  data.forEach(d => {
    d.revenue = +d.revenue;
    d.profit = +d.profit;
  });

  d3.interval(function() {
    update(data);
    flag = !flag;
  }, 1000);
});

//run the vis for the first time
update(data);

//update!
function update(data) {
  var value = flag ? "revenue" : "profit";
  x.domain(
    data.map(function(d) {
      return d.month;
    })
  );
  y.domain([
    0,
    d3.max(data, function(d) {
      return d[value];
    })
  ]);
  //X Axis
  var xAxisCall = d3.axisBottom(x);
  xAxisGroup.transition(t).call(xAxisCall);

  //Y Axis
  var yAxisCall = d3.axisLeft(y).tickFormat(function(d) {
    return "$" + d;
  });
  yAxisGroup.transition(t).call(yAxisCall);

  //JOIN new data with old elements
  var rects = g.selectAll("rect").data(data);

  //EXIT old elements not present in new data
  rects
    .exit()
    .attr("fill", "red")
    .transition(t)
    .attr("Y", y(0))
    .attr("height", 0)
    .remove();

  //ENTER new elements present in new data
  rects
    .enter()
    .append("rect")

    .attr("x", function(d) {
      return x(d.month);
    })
    .attr("width", x.bandwidth)

    .attr("fill", "grey")
    .attr("y", y(0))
    .attr("height", 0)
    .merge(rects)
    .transition(t)
    .attr("y", function(d) {
      return y(d[value]);
    })
    .attr("height", function(d) {
      return height - y(d[value]);
    })
    .attr("x", function(d) {
      return x(d.month);
    })
    .attr("width", x.bandwidth);

  var label = flag ? "Revenue" : "Profit";
  yLabel.text(label);
}
