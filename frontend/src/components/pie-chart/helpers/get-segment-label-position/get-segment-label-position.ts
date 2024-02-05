import { toRadians } from "src/utils/helpers";

export const getSegmentLabelPosition = (
  angle: number,
  size: number,
  scale: number = 1
) => {
  const cos = -Math.cos(toRadians(angle));
  const sin = Math.sin(toRadians(angle));

  const x = ((sin * size) / 2) * scale;
  const y = ((cos * size) / 2) * scale;
  return { x, y };
};
