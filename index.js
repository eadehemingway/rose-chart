const all_values = [];
arc_data.forEach((d) => {
  all_values.push(d.black_bit, d.red_bit, d.blue_bit);
});
const domain = d3.extent(all_values);

const radiusScale = d3.scaleLinear().domain(domain).range([10, 200]);

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
const get_arc_generator = (color, padding = 0) =>
  d3
    .arc()
    .innerRadius(0)
    .outerRadius(function (d, i) {
      return radiusScale(d[color]) + padding;
    });

const whole_chart_group = d3.select(".whole-rose-chart");

const wedge_group = whole_chart_group
  .selectAll(".wedge-group")
  .data(arc_data_with_start_and_end)
  .enter()
  .append("g")
  .attr("class", "wedge-group");

function drawChunk(chunk_name, color) {
  wedge_group
    .append("path")
    .attr("class", chunk_name)
    .attr("d", (d) => get_arc_generator(chunk_name)(d))
    .attr("fill", color)
    .attr("stroke-width", 1)
    .attr("stroke", "grey");
}
drawChunk("blue_bit", "lightsteelblue");
drawChunk("red_bit", "coral");
drawChunk("black_bit", "rgb(50,50,50)");

var textPath = svg
  .append("defs")
  .selectAll("path")
  .data(arc_data_with_start_and_end)
  .enter()
  .append("path")
  .attr("id", (d, i) => `text-path-${i}`)
  .attr("d", (d) => get_arc_generator("blue_bit", 10)(d)); // dynamic

wedge_group
  .append("text")
  .append("textPath")
  .attr("xlink:href", (d, i) => `#text-path-${i}`) //dynamic
  .text((d) => d.label);

wedge_group.exit().remove();
