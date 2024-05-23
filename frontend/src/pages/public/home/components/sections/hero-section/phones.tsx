import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { PhoneModel } from "src/assets/models";
import { lerp, toRadians } from "src/utils/helpers";
import { toRadians3 } from "src/utils/helpers/to-radians3/to-radians3";
import { Transform3D, Vector2, Vector3 } from "src/utils/math";
import { Group } from "three";

const phoneA = new Transform3D(
  new Vector3(-1.6, 0, -0.5),
  new Vector3(...toRadians3(-5, 100, 85))
);

const phoneB = new Transform3D(
  new Vector3(1.4, 0, -0.5),
  new Vector3(...toRadians3(-5, 60, 90))
);

let timeFromStart = 0;

interface PhonesProps {
  rotation: Vector2;
}

export const Phones = ({ rotation }: PhonesProps) => {
  const groupPhones = useRef<Group>(null);
  const groupLocalRotation = useRef<Vector3>(new Vector3());

  useFrame((_, delta) => {
    timeFromStart += delta;
    if (!groupPhones.current) return;
    if (rotation.x !== 0 && rotation.y !== 0) {
      groupLocalRotation.current.set(-rotation.y / 2, -rotation.x, 0);
    } else {
      groupLocalRotation.current.set(
        0,
        Math.sin(timeFromStart / 4) * 0.3 + toRadians(-5),
        0
      );
    }

    groupPhones.current.rotation.set(
      lerp(groupPhones.current.rotation.x, groupLocalRotation.current.x, 0.01),
      lerp(groupPhones.current.rotation.y, groupLocalRotation.current.y, 0.01),
      lerp(groupPhones.current.rotation.z, groupLocalRotation.current.z, 0.01)
    );
  });

  return (
    <group ref={groupPhones} scale={[0.7, 0.7, 0.7]}>
      <PhoneModel
        position={phoneA.position.toArray()}
        rotation={phoneA.rotation.toArray()}
      />
      <PhoneModel
        position={phoneB.position.toArray()}
        rotation={phoneB.rotation.toArray()}
      />
    </group>
  );
};
