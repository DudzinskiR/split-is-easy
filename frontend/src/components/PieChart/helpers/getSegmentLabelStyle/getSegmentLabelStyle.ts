import { CSSProperties } from "react";

export const getSegmentLabelStyle = (
  xPos: number,
  yPos: number,
  maxWidth: number
) => {
  const style: CSSProperties = {};
  style.maxWidth = maxWidth;
  if (xPos > 0) {
    style.left = `${xPos}px`;
    style.paddingLeft = "5px";
  } else {
    style.right = `${-xPos}px`;
    style.paddingRight = "5px";
  }

  style.bottom = `${-yPos}px`;

  return style;
};
