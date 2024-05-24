import * as THREE from "three";
import { Text3D, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { GroupProps } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Plane_1: THREE.Mesh;
    Plane_2: THREE.Mesh;
    Plane_3: THREE.Mesh;
  };
  materials: {
    white: THREE.MeshStandardMaterial;
    side: THREE.MeshStandardMaterial;
    Border: THREE.MeshStandardMaterial;
  };
};

interface ChatModelProps extends GroupProps {
  screenshot?: THREE.Texture;
  text?: string;
  textPosition?: [number, number, number];
  textRotation?: [number, number, number];
  textScale?: [number, number, number];
}

export function ChatModel({
  text,
  textPosition,
  textRotation,
  textScale,
  ...props
}: ChatModelProps) {
  const { nodes, materials } = useGLTF("/models/chat.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group scale={[0.25, 0.5, 0.5]} rotation={[0, -Math.PI / 2, 0]}>
        <Text3D
          font={"/font/Roboto.json"}
          rotation={textRotation}
          position={textPosition}
          scale={textScale}
        >
          {text}
          <meshStandardMaterial attach="material" color="black" />
        </Text3D>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_1.geometry}
          material={materials.white}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_2.geometry}
          material={materials.side}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_3.geometry}
          material={materials.Border}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/chat.glb");
