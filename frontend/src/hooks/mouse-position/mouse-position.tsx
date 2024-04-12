import { useEffect, useRef, useState } from "react";
import { Vector2 } from "src/utils/math";

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<Vector2 | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      if (ref.current) {
        if (ref.current) {
          const boundingRect = ref.current.getBoundingClientRect();
          const x = event.clientX - boundingRect.left;
          const y = event.clientY - boundingRect.top;

          if (
            x >= 0 &&
            x <= boundingRect.width &&
            y >= 0 &&
            y <= boundingRect.height
          ) {
            setMousePosition(new Vector2(x, y));
          } else {
            setMousePosition(null);
          }
        }
      } else {
        setMousePosition(new Vector2(event.clientX, event.clientY));
      }
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return { mousePosition, ref };
};
