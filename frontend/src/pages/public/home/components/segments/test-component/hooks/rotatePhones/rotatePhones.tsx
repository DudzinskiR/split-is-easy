import { useEffect, useRef, useState } from "react";
import { useAccelerometer, useMousePosition } from "src/hooks";
import { Vector2, Vector3 } from "src/utils/math";

export const useRotatePhones = () => {
  const [rotation, setRotation] = useState<Vector2>(Vector2.zero);
  const [temp, setTemp] = useState<Vector3 | null>(null);
  const phonesRef = useRef<HTMLDivElement>(null);
  const { mousePosition, ref: containerRef } = useMousePosition();
  const accelerometer = useAccelerometer();
  const threshold: number = 30;

  useEffect(() => {
    if (accelerometer && !temp) {
      setTemp(accelerometer);
      return;
    }

    console.log(accelerometer, temp);

    if (accelerometer && temp) {
      const newVector = new Vector3(temp);
      if (accelerometer.x > temp.x + threshold) {
        newVector.x = accelerometer.x - threshold;
      } else if (accelerometer.x < temp.x - threshold) {
        newVector.x = accelerometer.x + threshold;
      }

      if (accelerometer.y > temp.y + threshold) {
        newVector.y = accelerometer.y - threshold;
      } else if (accelerometer.y < temp.y - threshold) {
        newVector.y = accelerometer.y + threshold;
      }
      if (accelerometer.z > temp.z + threshold) {
        newVector.z = accelerometer.z - threshold;
      } else if (accelerometer.z < temp.z - threshold) {
        newVector.z = accelerometer.z + threshold;
      }

      setTemp(newVector);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accelerometer]);

  useEffect(() => {
    console.log(accelerometer, temp);
    if (!accelerometer || !temp) {
      return;
    }
    const b = new Vector3(accelerometer).subtract(temp);
    console.log(b);

    setRotation(new Vector2(-b.z / threshold, -b.y / threshold));
  }, [accelerometer, temp]);

  useEffect(() => {
    if (phonesRef.current === null) return;

    if (!mousePosition) {
      setRotation(Vector2.zero);
      return;
    }

    // const top = phonesRef.current.getBoundingClientRect().top;
    // const height = phonesRef.current.getBoundingClientRect().height;

    // const left = phonesRef.current.getBoundingClientRect().left;
    // const width = phonesRef.current.getBoundingClientRect().width;

    // const verticalCenter = top + height / 2;
    // const horizontalCenter = left + width / 2;

    // const b = new Vector3(accelerometer).subtract(temp);
    // setRotation(new Vector2())
    // setRotation(
    //   new Vector2(
    //     calcRotate(horizontalCenter - mousePosition.x, 1920),
    //     calcRotate(verticalCenter - mousePosition.y, 1000)
    //   )
    // );
  }, [mousePosition, phonesRef, accelerometer]);

  // const calcRotate = (x: number, z: number) => {
  //   const result = Math.atan(x / z) / (Math.PI / 2);
  //   return result;
  // };

  return { rotation, phonesRef, containerRef };
};
