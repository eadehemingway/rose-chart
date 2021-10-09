var angle_of_wedge = full_circle_in_radians / arcData.length;

var arc_data_with_start_and_end = arcData.map((val, i) => {
  var start_angle = i * angle_of_wedge;
  var end_angle = start_angle + angle_of_wedge;
  return {
    ...val,
    start_angle,
    end_angle,
  };
});
console.log("arc_data_with_start_and_end:", arc_data_with_start_and_end);
