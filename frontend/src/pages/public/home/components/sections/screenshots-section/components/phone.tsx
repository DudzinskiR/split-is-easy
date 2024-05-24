import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { PhoneModel } from "src/assets/models";
import { toRadians3 } from "src/utils/helpers/to-radians3/to-radians3";
import { Vector3 } from "src/utils/math";
import { Group } from "three";
import { lerp } from "three/src/math/MathUtils.js";

let timeFromStart = 0;

interface PhoneProps {
  index: number;
  screenshots: THREE.Texture[];
}

export const Phone = ({ index, screenshots }: PhoneProps) => {
  const phone = useRef<Group>(null);
  const groupLocalRotation = useRef<Vector3>(
    new Vector3(...toRadians3(90, 90, 0))
  );
  const [screenToShow, setScreenToShow] = useState(0);

  useFrame((_, delta) => {
    timeFromStart += delta;

    groupLocalRotation.current.set(
      ...toRadians3(
        0 + Math.sin(timeFromStart * 1.2),
        0 + Math.cos(timeFromStart * 1.1) * 15 + 360 * index,
        0 + Math.sin(timeFromStart * 1.6)
      )
    );

    if (!phone.current) return;

    phone.current.rotation.set(
      lerp(phone.current.rotation.x, groupLocalRotation.current.x, 0.03),
      lerp(phone.current.rotation.y, groupLocalRotation.current.y, 0.03),
      lerp(phone.current.rotation.z, groupLocalRotation.current.z, 0.03)
    );

    phone.current.position.set(0, Math.sin(timeFromStart * 1.2) * 0.1 - 0.5, 0);

    setScreenToShow(calcScreenshotIndex());
  });

  const calcScreenshotIndex = () => {
    if (!phone.current) return 0;
    const index = Math.round(phone.current.rotation.y / Math.PI / 2);
    if (index < 0) {
      return screenshots.length - ((-index - 1) % screenshots.length) - 1;
    }
    return index % screenshots.length;
  };

  console.log();
  return (
    <group ref={phone}>
      <group rotation={[...toRadians3(90, 90, 0)]} scale={[0.7, 0.7, 0.7]}>
        <PhoneModel screenshot={screenshots[screenToShow]} />
      </group>
    </group>
  );
};