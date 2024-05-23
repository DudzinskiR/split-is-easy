import { useEffect, useRef, useState } from "react";
import { Vector2 } from "src/utils/math";

export const useElementPosition = () => {
  const [position, setPosition] = useState<Vector2>(Vector2.zero);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const updatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setPosition(
          new Vector2(rect.left + window.scrollX, rect.top + window.scrollY)
        );
      }
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [ref]);

  return { ref, position };
};
