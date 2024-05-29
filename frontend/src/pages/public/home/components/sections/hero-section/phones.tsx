import { useRef } from "react";
import { Front1Model } from "src/assets/models/front1-model";
import { Front2Model } from "src/assets/models/front2-model";
import { PhoneModel } from "src/assets/models/phone-model";
import { lerp } from "src/utils/helpers/lerp/lerp";
import { toRadians } from "src/utils/helpers/to-radians/to-radians";
import { toRadians3 } from "src/utils/helpers/to-radians3/to-radians3";
import { Transform3D } from "src/utils/math/transform/transform-3d";
import { Vector2 } from "src/utils/math/vector/vector-2";
import { Vector3 } from "src/utils/math/vector/vector-3";
// import { Group } from "three";

import { useFrame } from "@react-three/fiber";
import { Group } from "three/src/Three.js";

// const Front1Model = lazy(() => import("src/assets/models/front1-model"));

const phoneA = new Transform3D(
  new Vector3(-1.8, 0, -0.5),
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
      lerp(
        groupPhones.current.rotation.x,
        groupLocalRotation.current.x * 1.2,
        0.05
      ),
      lerp(
        groupPhones.current.rotation.y,
        groupLocalRotation.current.y * 1.2,
        0.05
      ),
      lerp(groupPhones.current.rotation.z, groupLocalRotation.current.z, 0.05)
    );
  });

  return (
    <group ref={groupPhones} scale={[0.8, 0.8, 0.8]}>
      <PhoneModel
        position={phoneA.position.toArray()}
        rotation={phoneA.rotation.toArray()}
        screen={<Front1Model />}
      />
      <PhoneModel
        position={phoneB.position.toArray()}
        rotation={phoneB.rotation.toArray()}
        screen={<Front2Model />}
      />
    </group>
  );
};
