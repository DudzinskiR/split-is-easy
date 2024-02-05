const segmentPositiveColor = [
  "bg-gradient-to-b from-lime-500 to-green-600",
  "bg-gradient-to-b from-sky-500 to-indigo-600",
  "bg-gradient-to-b from-yellow-300 to-yellow-400",
  "bg-gradient-to-b from-orange-400 to-orange-500",
  "bg-gradient-to-b from-indigo-500 to-indigo-600",
];

const segmentNegativeColor = [
  "bg-gradient-to-b from-red-600 to-red-600",
  "bg-gradient-to-b from-orange-400 to-orange-500",
  "bg-gradient-to-b from-yellow-300 to-yellow-400",
  "bg-gradient-to-b from-blue-500 to-blue-500",
  "bg-gradient-to-b from-indigo-600 to-indigo-700",
];

export const getSegmentColor = (index: number, sum: number) => {
  if (sum >= 0) {
    return segmentPositiveColor[index % segmentPositiveColor.length];
  } else {
    return segmentNegativeColor[index % segmentNegativeColor.length];
  }
};
