import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { Phone } from "./Phone";
import { Environment } from "@react-three/drei";

interface PhoneCanvasProps {
  screenshotIndex: number;
}

export const PhoneCanvas = ({ screenshotIndex }: PhoneCanvasProps) => {
  const screenshot1 = useLoader(TextureLoader, "/screenshots/screenshot0.png");
  const screenshot2 = useLoader(TextureLoader, "/screenshots/screenshot1.png");
  const screenshot3 = useLoader(TextureLoader, "/screenshots/screenshot2.png");
  const screenshot4 = useLoader(TextureLoader, "/screenshots/screenshot3.png");
  const screenshot5 = useLoader(TextureLoader, "/screenshots/screenshot4.png");
  const screenshot6 = useLoader(TextureLoader, "/screenshots/screenshot5.png");
  return (
    <Canvas linear>
      <Phone
        index={screenshotIndex}
        screenshots={[
          screenshot1,
          screenshot2,
          screenshot3,
          screenshot4,
          screenshot5,
          screenshot6,
        ]}
      />
      <Environment preset="warehouse" />
    </Canvas>
  );
};
