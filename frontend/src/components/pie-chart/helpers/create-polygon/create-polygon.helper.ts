//----------------//
//  6 _______ 0   //
//    |     |     //
//  5 |     | 1   //
//    |_____|     //
//  4    3    2   //
//----------------//

import { toRadians } from "src/utils/helpers";

const pointsCoordinates = [
  "100% 0%",
  "100% 50%",
  "100% 100%",
  "50% 100%",
  "0% 100%",
  "0% 50%",
  "0% 0%",
];

const createPolygon = (angle: number) => {
  let polygonPath = "polygon(50% 50%, 50% 0%, ";
  const index = Math.floor(angle / 45);
  polygonPath += pointsCoordinates.slice(0, index).join(", ");

  if (index !== 0) polygonPath += ", ";

  const center = 50;

  polygonPath += `${
    center + Math.round(Math.sin(toRadians(angle)) * center)
  }% `;
  polygonPath += `${
    center - Math.round(Math.cos(toRadians(angle)) * center)
  }%)`;

  return polygonPath;
};

export default createPolygon;
