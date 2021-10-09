const arc_data = [
  { label: "label", black_bit: 1, red_bit: 1, blue_bit: 2 },
  { label: "label", black_bit: 2, red_bit: 6, blue_bit: 28 },
  { label: "label", black_bit: 2, red_bit: 7, blue_bit: 11 },
  { label: "label", black_bit: 2, red_bit: 7.7, blue_bit: 23 },
  { label: "label", black_bit: 1, red_bit: 6, blue_bit: 12 },
  { label: "label", black_bit: 1, red_bit: 8, blue_bit: 28 },
  { label: "label", black_bit: 2, red_bit: 7, blue_bit: 24 },
  { label: "label", black_bit: 1, red_bit: 6, blue_bit: 13 },
  { label: "label", black_bit: 3, red_bit: 5, blue_bit: 8 },
  { label: "label", black_bit: 3, red_bit: 5, blue_bit: 19 },
  { label: "label", black_bit: 3, red_bit: 5, blue_bit: 10 },
  { label: "label", black_bit: 3, red_bit: 5, blue_bit: 3 },
];

const full_circle_in_radians = 6.283185307179586;
const angle_of_wedge = full_circle_in_radians / arc_data.length;

const all_values = [];
arc_data.forEach((d) => {
  all_values.push(d.black_bit, d.red_bit, d.blue_bit);
});

const domain = d3.extent(all_values);

const radiusScale = d3.scaleLinear().domain(domain).range([10, 200]);
const arc_data_with_start_and_end = arc_data.map((val, i) => {
  const startAngle = i * angle_of_wedge;
  const endAngle = startAngle + angle_of_wedge;
  return {
    ...val,
    startAngle,
    endAngle,
  };
});

const angleScale = d3
  .scaleLinear()
  .range([Math.PI, 3 * Math.PI])
  .domain([0, arc_data.length]);

const svg = d3
  .select("svg")
  .append("g")
  .attr("transform", "translate(300,300)")
  .attr("class", "whole-rose-chart");

// Create an arc generator with configuration
const get_arc_generator = (color) =>
  d3
    .arc()
    .innerRadius(0)
    .outerRadius(function (d, i) {
      return radiusScale(d[color]);
    });

const whole_chart_group = d3.select(".whole-rose-chart");

whole_chart_group
  .append("g")
  .attr("class", "blue-bits")
  .selectAll("path")
  .data(arc_data_with_start_and_end)
  .join("path")
  .attr("d", (d) => get_arc_generator("blue_bit")(d))
  .attr("fill", "rgb(198, 226, 255)")
  .attr("stroke-width", 1)
  .attr("stroke", "grey");

whole_chart_group
  .append("g")
  .attr("class", "red-bits")
  .selectAll("path")
  .data(arc_data_with_start_and_end)
  .join("path")
  .attr("d", (d) => get_arc_generator("red_bit")(d))
  .attr("fill", "rgb(252,112,147)")
  .attr("stroke-width", 1)
  .attr("stroke", "grey");

whole_chart_group
  .append("g")
  .attr("class", "black-bits")
  .selectAll("path")
  .data(arc_data_with_start_and_end)
  .join("path")
  .attr("d", (d) => get_arc_generator("black_bit")(d))
  .attr("fill", "rgb(50,50,50)")
  .attr("stroke-width", 1)
  .attr("stroke", "grey");
