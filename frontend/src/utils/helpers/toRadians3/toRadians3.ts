export const toRadians3 = (
  x: number,
  y: number,
  z: number
): [number, number, number] => {
  return [(Math.PI * x) / 180, (Math.PI * y) / 180, (Math.PI * z) / 180];
};
