import { useEffect, useState } from "react";
import { Vector3 } from "src/utils/math";

export const useAccelerometer = () => {
  const [accelerometerData, setAccelerometerData] = useState<Vector3 | null>(
    null
  );

  useEffect(() => {
    const handleMotion = (event: DeviceOrientationEvent) => {
      // const acceleration = event.accelerationIncludingGravity;
      // console.log(acceleration);
      if (event && event.alpha && event.beta && event.gamma) {
        setAccelerometerData(new Vector3(event.alpha, event.beta, event.gamma));
      } else {
        setAccelerometerData(Vector3.zero);
      }
    };

    window.addEventListener("deviceorientation", handleMotion);

    return () => {
      window.removeEventListener("deviceorientation", handleMotion);
    };
  }, []);

  return accelerometerData;
};
