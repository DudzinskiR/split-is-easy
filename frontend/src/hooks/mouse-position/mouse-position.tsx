import { useEffect, useState } from "react";
import { Vector2 } from "src/utils/math";

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<Vector2>(Vector2.zero);

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      setMousePosition(new Vector2(event.clientX, event.clientY));
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  });

  return mousePosition;
};
