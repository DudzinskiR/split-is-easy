import { CSSProperties } from "react";
import { Vector2 } from "src/utils/math";

export const getCornersStyles = (
  nodes: number,
  radius: number,
  height: number
) => {
  const positions = getCornerPoints2D(nodes, radius);
  const nodeHeight = getHeightNode(positions[0], positions[1]);
  const angle = getAngleDeg(positions[0], positions[1]);

  const styles: CSSProperties[] = [];

  for (let i = 0; i < nodes; i++) {
    styles.push({
      left: -positions[i].x,
      top: -positions[i].y,
      width: height,
      height: nodeHeight * 1.2,
      transformOrigin: "top",
      transform: `translateX(${-height / 2}px) rotateY(90deg) rotateX(${
        i * 2 * angle + 180 + angle
      }deg)`,
      background:
        "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(69,69,69,1) 10%, rgba(69,69,69,1) 90%, rgba(0,0,0,1) 100%)",
    });
  }

  return styles;
};

const calcPosX = (nodes: number, radius: number, i: number) => {
  return radius * Math.cos((Math.PI * i) / (2 * nodes));
};

const calcPosY = (nodes: number, radius: number, i: number) => {
  return radius * Math.sin((Math.PI * i) / (2 * nodes));
};

const getHeightNode = (a: Vector2, b: Vector2) => {
  return Math.hypot(b.x - a.x, b.y - a.y);
};

const getAngleDeg = (a: Vector2, b: Vector2) => {
  const angleRad = Math.atan2(b.x - a.x, b.y - a.y);
  const angleDeg = angleRad * (180 / Math.PI);

  return angleDeg;
};

const getCornerPoints2D = (nodes: number, radius: number) => {
  const points: Vector2[] = [];
  for (let i = 0; i < nodes; i++) {
    points.push(
      new Vector2(calcPosX(nodes, radius, i), calcPosY(nodes, radius, i))
    );
  }

  return points;
};
