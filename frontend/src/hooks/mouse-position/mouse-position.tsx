import { useEffect, useState } from "react";
import { Vector2 } from "src/types";

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<Vector2>({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  });

  return mousePosition;
};
