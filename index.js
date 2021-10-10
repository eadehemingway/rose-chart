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
  { label: "label", black_bit: 3, red_bit: 5, blue_bit: 30 },
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

const wedge_group = whole_chart_group
  .selectAll(".wedge-group")
  .data(arc_data_with_start_and_end)
  .enter()
  .append("g")
  .attr("class", "wedge-group");

wedge_group
  .append("path")
  .attr("class", "blue-bits")
  .attr("d", (d) => get_arc_generator("blue_bit")(d))
  .attr("fill", "rgb(198, 226, 255)")
  .attr("stroke-width", 1)
  .attr("stroke", "grey");
wedge_group
  .append("path")
  .attr("class", "red-bits")
  .attr("d", (d) => get_arc_generator("red_bit")(d))
  .attr("fill", "rgb(252,112,147)")
  .attr("stroke-width", 1)
  .attr("stroke", "grey");
let test;
wedge_group
  .append("path")
  .attr("class", "black-bits")
  .attr("d", (d) => {
    test = get_arc_generator("blue_bit")(d);
    return get_arc_generator("black_bit")(d);
  })
  .attr("fill", "rgb(50,50,50)")
  .attr("stroke-width", 1)
  .attr("stroke", "grey");

var textPath = svg
  .append("defs")
  .append("path")
  .attr("id", "textPath")
  .attr("d", test);

wedge_group
  .append("text")
  .append("textPath")
  .attr("xlink:href", "#textPath")
  .text((d) => d.label);

function getStartingPath() {
  return "M83,265L84,263.6666666666667C85,262.3333333333333,87,259.6666666666667,88.83333333333333,257.1666666666667C90.66666666666667,254.66666666666666,92.33333333333333,252.33333333333334,94.5,249.66666666666666C96.66666666666667,247,99.33333333333333,244,101.83333333333333,241C104.33333333333333,238,106.66666666666667,235,109.16666666666667,232.33333333333334C111.66666666666667,229.66666666666666,114.33333333333333,227.33333333333334,117.33333333333333,225.16666666666666C120.33333333333333,223,123.66666666666667,221,126.83333333333333,219.16666666666666C130,217.33333333333334,133,215.66666666666666,136,214C139,212.33333333333334,142,210.66666666666666,145.16666666666666,209.16666666666666C148.33333333333334,207.66666666666666,151.66666666666666,206.33333333333334,154.83333333333334,205.16666666666666C158,204,161,203,164.33333333333334,202.5C167.66666666666666,202,171.33333333333334,202,175.16666666666666,202C179,202,183,202,187,202C191,202,195,202,198.66666666666666,202.66666666666666C202.33333333333334,203.33333333333334,205.66666666666666,204.66666666666666,209,206.16666666666666C212.33333333333334,207.66666666666666,215.66666666666666,209.33333333333334,218.83333333333334,210.83333333333334C222,212.33333333333334,225,213.66666666666666,228,215.33333333333334C231,217,234,219,237.16666666666666,220.83333333333334C240.33333333333334,222.66666666666666,243.66666666666666,224.33333333333334,246.83333333333334,226.33333333333334C250,228.33333333333334,253,230.66666666666666,255.83333333333334,232.83333333333334C258.6666666666667,235,261.3333333333333,237,264.1666666666667,239.33333333333334C267,241.66666666666666,270,244.33333333333334,273,246.66666666666666C276,249,279,251,282,253C285,255,288,257,291,258.8333333333333C294,260.6666666666667,297,262.3333333333333,300.1666666666667,264C303.3333333333333,265.6666666666667,306.6666666666667,267.3333333333333,310.1666666666667,269C313.6666666666667,270.6666666666667,317.3333333333333,272.3333333333333,321.1666666666667,273.8333333333333C325,275.3333333333333,329,276.6666666666667,332.6666666666667,277.5C336.3333333333333,278.3333333333333,339.6666666666667,278.6666666666667,343.1666666666667,278.8333333333333C346.6666666666667,279,350.3333333333333,279,354.1666666666667,279C358,279,362,279,365.6666666666667,279C369.3333333333333,279,372.6666666666667,279,376,278.6666666666667C379.3333333333333,278.3333333333333,382.6666666666667,277.6666666666667,386,276.8333333333333C389.3333333333333,276,392.6666666666667,275,396.1666666666667,274C399.6666666666667,273,403.3333333333333,272,406.6666666666667,271C410,270,413,269,416.3333333333333,267.8333333333333C419.6666666666667,266.6666666666667,423.3333333333333,265.3333333333333,426.6666666666667,263.6666666666667C430,262,433,260,436.3333333333333,258.1666666666667C439.6666666666667,256.3333333333333,443.3333333333333,254.66666666666666,446.8333333333333,253C450.3333333333333,251.33333333333334,453.6666666666667,249.66666666666666,457.1666666666667,248C460.6666666666667,246.33333333333334,464.3333333333333,244.66666666666666,467.8333333333333,243C471.3333333333333,241.33333333333334,474.6666666666667,239.66666666666666,477.6666666666667,238.33333333333334C480.6666666666667,237,483.3333333333333,236,486.6666666666667,234.83333333333334C490,233.66666666666666,494,232.33333333333334,497.6666666666667,231.5C501.3333333333333,230.66666666666666,504.6666666666667,230.33333333333334,508,229.83333333333334C511.3333333333333,229.33333333333334,514.6666666666666,228.66666666666666,517.6666666666666,228.16666666666666C520.6666666666666,227.66666666666666,523.3333333333334,227.33333333333334,526.8333333333334,227C530.3333333333334,226.66666666666666,534.6666666666666,226.33333333333334,538.8333333333334,226.16666666666666C543,226,547,226,550.8333333333334,226.16666666666666C554.6666666666666,226.33333333333334,558.3333333333334,226.66666666666666,561.8333333333334,227.66666666666666C565.3333333333334,228.66666666666666,568.6666666666666,230.33333333333334,571.8333333333334,231.83333333333334C575,233.33333333333334,578,234.66666666666666,581,236.5C584,238.33333333333334,587,240.66666666666666,590,242.83333333333334C593,245,596,247,599,249C602,251,605,253,608,255.16666666666666C611,257.3333333333333,614,259.6666666666667,616.8333333333334,262C619.6666666666666,264.3333333333333,622.3333333333334,266.6666666666667,625.1666666666666,268.8333333333333C628,271,631,273,634.3333333333334,274.8333333333333C637.6666666666666,276.6666666666667,641.3333333333334,278.3333333333333,644.8333333333334,279.8333333333333C648.3333333333334,281.3333333333333,651.6666666666666,282.6666666666667,655,283.5C658.3333333333334,284.3333333333333,661.6666666666666,284.6666666666667,665.1666666666666,285C668.6666666666666,285.3333333333333,672.3333333333334,285.6666666666667,676,285.8333333333333C679.6666666666666,286,683.3333333333334,286,687,286C690.6666666666666,286,694.3333333333334,286,698,286.1666666666667C701.6666666666666,286.3333333333333,705.3333333333334,286.6666666666667,707.5,286.8333333333333C709.6666666666666,287,710.3333333333334,287,710.6666666666666,287L711,287";
}
wedge_group.exit().remove();
