const arc_data = [
  { label: "January", black_bit: 1, red_bit: 1, blue_bit: 2 },
  { label: "February", black_bit: 2, red_bit: 6, blue_bit: 28 },
  { label: "March", black_bit: 2, red_bit: 7, blue_bit: 11 },
  { label: "April", black_bit: 2, red_bit: 7.7, blue_bit: 23 },
  { label: "May", black_bit: 1, red_bit: 6, blue_bit: 12 },
  { label: "June", black_bit: 1, red_bit: 8, blue_bit: 28 },
  { label: "July", black_bit: 2, red_bit: 7, blue_bit: 24 },
  { label: "August", black_bit: 1, red_bit: 6, blue_bit: 13 },
  { label: "September", black_bit: 3, red_bit: 5, blue_bit: 8 },
  { label: "October", black_bit: 3, red_bit: 5, blue_bit: 19 },
  { label: "November", black_bit: 3, red_bit: 5, blue_bit: 10 },
  { label: "December", black_bit: 3, red_bit: 5, blue_bit: 30 },
];

const full_circle_in_radians = 6.283185307179586;
const angle_of_wedge = full_circle_in_radians / arc_data.length;

const arc_data_with_start_and_end = arc_data.map((val, i) => {
  const startAngle = i * angle_of_wedge;
  const endAngle = startAngle + angle_of_wedge;
  return {
    ...val,
    startAngle,
    endAngle,
  };
});
