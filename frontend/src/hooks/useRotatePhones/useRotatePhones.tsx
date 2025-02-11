import { useEffect, useRef, useState } from "react";
import { useMousePosition } from "../useMousePosition/useMousePosition";
import { Vector2 } from "src/utils/math/vector/Vector2";

export const useRotatePhones = () => {
  const [rotation, setRotation] = useState<Vector2>(Vector2.zero);
  const phonesRef = useRef<HTMLDivElement>(null);
  const { mousePosition, ref: containerRef } = useMousePosition();

  useEffect(() => {
    if (phonesRef.current === null) return;

    if (!mousePosition) {
      setRotation(Vector2.zero);
      return;
    }

    const top = phonesRef.current.getBoundingClientRect().top;
    const height = phonesRef.current.getBoundingClientRect().height;

    const left = phonesRef.current.getBoundingClientRect().left;
    const width = phonesRef.current.getBoundingClientRect().width;

    const verticalCenter = top + height / 2;
    const horizontalCenter = left + width / 2;

    setRotation(
      new Vector2(
        calcRotate(
          horizontalCenter - mousePosition.x,
          containerRef.current?.getBoundingClientRect().width || 1920
        ),
        calcRotate(
          verticalCenter - mousePosition.y,
          containerRef.current?.getBoundingClientRect().height || 1080
        )
      )
    );
  }, [containerRef, mousePosition, phonesRef]);

  const calcRotate = (x: number, z: number) => {
    const result = Math.atan(x / z) / (Math.PI / 2);
    return result;
  };

  return { rotation, phonesRef, containerRef };
};
