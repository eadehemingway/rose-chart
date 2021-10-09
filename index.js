var arcData = [
  { startAngle: 0, endAngle: 0.2, radius: 1.5 },
  { startAngle: 0.2, endAngle: 0.4, radius: 6 },
  { startAngle: 0.4, endAngle: 0.6, radius: 10 },
  { startAngle: 0.6, endAngle: 0.8, radius: 4 },
  { startAngle: 0.8, endAngle: 1, radius: 3 },
];

var full_circle_in_radians = 6.283185307179586;
console.log("full_circle_in_radians:", full_circle_in_radians);

var angle_of_wedge = full_circle_in_radians / arcData.length;

var angleScale = d3
  .scaleLinear()
  .range([Math.PI, 3 * Math.PI])
  .domain([0, arcData.length]);

var all_radius = arcData.map((d) => d.radius);
var radiusScale = d3.scaleLinear().domain(all_radius).range([10, 100]);

var svg = d3.select("svg").append("g").attr("transform", "translate(300,300)");

// Create an arc generator with configuration
var arcGenerator = d3
  .arc()
  .innerRadius(0)
  .outerRadius(function (d, i) {
    return radiusScale(d.radius);
  }); // needs to be dynamic

// Create a path element and set its d attribute
d3.select("g")
  .selectAll("path")
  .data(arcData)
  .join("path")
  .attr("d", arcGenerator)
  .attr("fill", "orange")
  .attr("stroke-width", 1)
  .attr("stroke", "black");
