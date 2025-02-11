import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Phones } from "./Phones";
import { Vector2 } from "src/utils/math/vector/Vector2";

interface PhonesCanvasProps {
  rotation: Vector2;
}

export const PhonesCanvas = ({ rotation }: PhonesCanvasProps) => {
  return (
    <Canvas>
      <Phones rotation={rotation} />
      <Environment preset="warehouse" />
    </Canvas>
  );
};
