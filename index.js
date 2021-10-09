var arcData = [
  { amount: 7 },
  { amount: 8 },
  { amount: 9 },
  { amount: 10 },
  { amount: 11 },
  { amount: 12 },
  { amount: 13 },
  { amount: 14 },
  { amount: 15 },
];

var full_circle_in_radians = 6.283185307179586;
var angle_of_wedge = full_circle_in_radians / arcData.length;

var all_amounts = arcData.map((d) => d.amount);
var radiusScale = d3.scaleLinear().domain(all_amounts).range([50, 70]);
var arc_data_with_start_and_end = arcData.map((val, i) => {
  var startAngle = i * angle_of_wedge;
  var endAngle = startAngle + angle_of_wedge;
  return {
    radius: radiusScale(val.amount),
    startAngle,
    endAngle,
  };
});

var angleScale = d3
  .scaleLinear()
  .range([Math.PI, 3 * Math.PI])
  .domain([0, arcData.length]);

var svg = d3.select("svg").append("g").attr("transform", "translate(300,300)");

// Create an arc generator with configuration
var arcGenerator = d3
  .arc()
  .innerRadius(0)
  .outerRadius(function (d, i) {
    return d.radius;
  }); // needs to be dynamic

// Create a path element and set its d attribute
d3.select("g")
  .selectAll("path")
  .data(arc_data_with_start_and_end)
  .join("path")
  .attr("d", arcGenerator)
  .attr("fill", "orange")
  .attr("stroke-width", 1)
  .attr("stroke", "black");
