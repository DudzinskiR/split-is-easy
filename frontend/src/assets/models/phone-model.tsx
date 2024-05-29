// import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { GroupProps } from "@react-three/fiber";
import { ReactNode, useEffect } from "react";
import {
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  SRGBColorSpace,
  Texture,
} from "three";

type GLTFResult = GLTF & {
  nodes: {
    Cube: Mesh;
    Cube_1: Mesh;
    Cube_2: Mesh;
    Cube_3: Mesh;
    Cube_4: Mesh;
    Cube_5: Mesh;
    Cube_6: Mesh;
    Cube_7: Mesh;
    Cube_8: Mesh;
    Cube_9: Mesh;
  };
  materials: {
    PhoneBody: MeshStandardMaterial;
    Glass: MeshPhysicalMaterial;
    MetalMaterial: MeshStandardMaterial;
    Black: MeshStandardMaterial;
    ScreenFrame: MeshStandardMaterial;
    TextMetal: MeshStandardMaterial;
    ["Matrix.001"]: MeshStandardMaterial;
    FrameMetal: MeshStandardMaterial;
    MatFrame: MeshStandardMaterial;
    ["Screen.001"]: MeshStandardMaterial;
  };
};

interface PhoneModelProps extends GroupProps {
  screenshot?: Texture;
  screen?: ReactNode;
}

export function PhoneModel({ screenshot, screen, ...props }: PhoneModelProps) {
  const { nodes, materials } = useGLTF("/models/untitled.glb") as GLTFResult;

  useEffect(() => {
    if (!screenshot) return;

    screenshot.flipY = false;
    screenshot.colorSpace = SRGBColorSpace;
  }, [screenshot]);

  return (
    <group {...props} dispose={null}>
      {screen}
      <group rotation={[0, 0, 0]} scale={[1.837, 5, 1.773]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.PhoneBody}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={materials.Glass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_2.geometry}
          material={materials.MetalMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_3.geometry}
          material={materials.Black}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_4.geometry}
          material={materials.ScreenFrame}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_5.geometry}
          material={materials.TextMetal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_6.geometry}
          material={materials["Matrix.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_7.geometry}
          material={materials.FrameMetal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_8.geometry}
          material={materials.MatFrame}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_9.geometry}
          material={materials["Screen.001"]}
        >
          <meshPhongMaterial
            emissive={0xffffff}
            emissiveMap={screenshot}
            emissiveIntensity={1}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/models/untitled.glb");
